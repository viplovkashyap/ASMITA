import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirestoreDb, isFirebaseConfigured } from '../lib/firebase';
import {
  RegistrationInput,
  RegistrationResult,
  FormValidationErrors,
} from '../types';

// Client-side submission cooldown tracker
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN_MS = 2500;

/**
 * Validates registration input fields client-side.
 */
export const validateRegistrationInput = (
  input: RegistrationInput
): { isValid: boolean; errors: FormValidationErrors } => {
  const errors: FormValidationErrors = {};

  // 1. Full Name
  const trimmedName = input.name.trim();
  if (!trimmedName) {
    errors.name = 'Full name is required';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name cannot exceed 80 characters';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
    errors.name = 'Please enter a valid name using letters and spaces';
  }

  // 2. Department
  const trimmedDept = input.department.trim();
  if (!trimmedDept) {
    errors.department = 'College / Department is required';
  } else if (trimmedDept.length > 100) {
    errors.department = 'Department name is too long';
  }

  // 3. Year
  if (!input.year) {
    errors.year = 'Please select your current year';
  }

  // 4. Branch
  if (!input.branch) {
    errors.branch = 'Please select your branch';
  }

  // 5. Email
  const trimmedEmail = input.email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Email address is required';
  } else if (trimmedEmail.length > 254) {
    errors.email = 'Email exceeds maximum length';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  // 6. Phone
  const rawPhone = input.phone.replace(/[\s\-()]/g, '');
  // Standard Indian 10-digit mobile check (optionally starting with +91 or 0)
  const phonePattern = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  if (!rawPhone) {
    errors.phone = 'Phone number is required';
  } else if (!phonePattern.test(rawPhone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number';
  }

  // 7. Participation Type
  if (!input.participationType) {
    errors.participationType = 'Please select your participation type';
  }

  // 8. Additional Message (optional)
  if (input.message && input.message.length > 300) {
    errors.message = 'Message must be 300 characters or fewer';
  }

  // 9. Consent
  if (!input.consent) {
    errors.consent = 'You must agree to participate in ASMITA to register';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Normalizes phone number to clean 10-digit representation.
 */
export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length > 10 && (digits.startsWith('91') || digits.startsWith('0'))) {
    return digits.slice(-10);
  }
  return digits.slice(-10);
};

/**
 * Generates a privacy-conscious deterministic document identifier
 * using SHA-256 of the normalized email and phone.
 */
const generateDeterministicId = async (email: string, phone: string): Promise<string> => {
  const text = `${email.toLowerCase().trim()}_${phone.trim()}`;
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      return `reg_${hashHex.substring(0, 32)}`;
    }
  } catch {
    // Fallback if subtle crypto is unavailable
  }

  // Simple deterministic hash fallback
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `reg_${Math.abs(hash).toString(16).padStart(12, '0')}`;
};

/**
 * Submits a new registration document to Firestore with duplicate detection
 * and safe mapped error handling.
 */
export const registerParticipant = async (
  input: RegistrationInput
): Promise<RegistrationResult> => {
  // Cooldown abuse protection
  const now = Date.now();
  if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
    return {
      success: false,
      error: 'Please wait a moment before trying again.',
      code: 'VALIDATION_FAILED',
    };
  }

  // Client validation
  const { isValid, errors } = validateRegistrationInput(input);
  if (!isValid) {
    const firstError = Object.values(errors)[0] || 'Please complete all required fields correctly.';
    return {
      success: false,
      error: firstError,
      code: 'VALIDATION_FAILED',
    };
  }

  // Check Firebase initialization
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Registration service is currently unavailable. Firebase environment configuration is required.',
      code: 'UNAVAILABLE',
    };
  }

  const db = getFirestoreDb();
  if (!db) {
    return {
      success: false,
      error: 'Registration service is currently unavailable. Please try again shortly.',
      code: 'UNAVAILABLE',
    };
  }

  lastSubmissionTime = now;

  try {
    const normalizedEmail = input.email.trim().toLowerCase();
    const normalizedPhoneNumber = normalizePhone(input.phone);
    const docId = await generateDeterministicId(normalizedEmail, normalizedPhoneNumber);

    const docRef = doc(db, 'registrations', docId);

    // Duplicate registration check:
    // Read deterministic doc id to see if student already registered
    try {
      const existingDoc = await getDoc(docRef);
      if (existingDoc && existingDoc.exists()) {
        return {
          success: false,
          error: 'An existing registration was found for these details.',
          code: 'DUPLICATE',
        };
      }
    } catch {
      // If read is blocked by security rules (public read: false), proceed directly to write.
      // Firestore security rules will safely handle insertion.
    }

    // Prepare document data with serverTimestamp
    const registrationData = {
      name: input.name.trim(),
      department: input.department.trim(),
      year: input.year,
      branch: input.branch,
      email: normalizedEmail,
      phone: normalizedPhoneNumber,
      participationType: input.participationType,
      message: (input.message || '').trim().slice(0, 300),
      consent: true,
      createdAt: serverTimestamp(),
    };

    await setDoc(docRef, registrationData);

    return {
      success: true,
      registrationId: 'CONFIRMED',
    };
  } catch (err: unknown) {
    console.error('Registration failed:', err);

    const errorMessage = err instanceof Error ? err.message : String(err);

    if (errorMessage.includes('permission-denied') || errorMessage.includes('PERMISSION_DENIED')) {
      return {
        success: false,
        error: "We couldn't complete your registration right now. Please try again.",
        code: 'PERMISSION_DENIED',
      };
    }

    if (
      errorMessage.includes('unavailable') ||
      errorMessage.includes('network') ||
      errorMessage.includes('failed-precondition') ||
      !navigator.onLine
    ) {
      return {
        success: false,
        error: 'Unable to connect right now. Please check your internet connection and try again.',
        code: 'NETWORK_ERROR',
      };
    }

    return {
      success: false,
      error: 'Something went wrong while registering. Please try again.',
      code: 'UNKNOWN',
    };
  }
};
