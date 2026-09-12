import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  RegistrationInput,
  FormValidationErrors,
  ParticipationType,
  CollegeYear,
  CollegeBranch,
} from '../types';
import {
  registerParticipant,
  validateRegistrationInput,
} from '../services/registrationService';
import { Mandala } from './Mandala';
import { CornerFiligree, FiligreeDivider } from './Ornament';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Shield,
  Loader2,
  ArrowRight,
  Info,
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

const INITIAL_FORM: RegistrationInput = {
  name: '',
  department: 'IEC College of Engineering & Technology',
  year: '',
  branch: '',
  email: '',
  phone: '',
  participationType: '',
  message: '',
  consent: false,
};

const YEAR_OPTIONS: CollegeYear[] = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
];

const BRANCH_OPTIONS: CollegeBranch[] = [
  'CSE',
  'CSE (AI/ML)',
  'IT',
  'ECE',
  'ME',
  'CE',
  'Other',
];

const PARTICIPATION_OPTIONS: ParticipationType[] = [
  'Ethnic Day Participation',
  'Cultural Performance',
  'Fashion / Ethnic Walk',
  'Other',
];

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  triggerElement,
}) => {
  const [formData, setFormData] = useState<RegistrationInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'failure'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Open & Close GSAP Animations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (!prefersReducedMotion && modalBoxRef.current && backdropRef.current) {
        gsap.killTweensOf([backdropRef.current, modalBoxRef.current]);
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalBoxRef.current,
          { opacity: 0, scale: 0.96, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
            delay: 0.05,
          }
        );
      }

      // Autofocus first input after animation
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 150);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      if (triggerElement) {
        triggerElement.focus();
      }
    }
  }, [isOpen, prefersReducedMotion, triggerElement]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && status !== 'submitting') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status]);

  // Success Celebration GSAP Animation
  useEffect(() => {
    if (status === 'success' && celebrationRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        celebrationRef.current.querySelectorAll('.celebrate-item'),
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.4)',
        }
      );
    }
  }, [status, prefersReducedMotion]);

  const handleModalClose = () => {
    if (prefersReducedMotion || !modalBoxRef.current || !backdropRef.current) {
      onClose();
      resetFormAfterClose();
      return;
    }

    gsap.to(modalBoxRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
        resetFormAfterClose();
      },
    });
  };

  const resetFormAfterClose = () => {
    if (status === 'success') {
      setFormData(INITIAL_FORM);
      setStatus('idle');
      setStatusMessage('');
      setErrors({});
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: checked !== undefined ? checked : value,
    }));

    // Clear individual field error as user types
    if (errors[name as keyof RegistrationInput]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof RegistrationInput];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    // Client validation
    const validation = validateRegistrationInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstErrorField = Object.keys(validation.errors)[0];
      const el = document.getElementById(`reg-${firstErrorField}`);
      el?.focus();
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const result = await registerParticipant(formData);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('failure');
        setStatusMessage(result.error || 'Something went wrong while registering. Please try again.');
      }
    } catch {
      setStatus('failure');
      setStatusMessage('Unable to complete registration at this moment. Please check your connection and try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-asmita-title"
      aria-describedby="join-asmita-subtitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#09030E]/85 backdrop-blur-xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === backdropRef.current && status !== 'submitting') {
          handleModalClose();
        }
      }}
    >
      {/* Modal Container */}
      <div
        ref={modalBoxRef}
        className="relative w-full max-w-2xl my-auto rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#1E0B30] via-[#160A24] to-[#100718] border border-[#D4AF55]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden will-change-transform"
      >
        {/* Subtle Rotating Sacred Mandala in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 select-none z-0">
          <Mandala size="min(90vw, 540px)" speedSec={120} />
        </div>

        {/* Corner Filigrees */}
        <CornerFiligree position="tl" className="absolute top-3 left-3 pointer-events-none" size={36} />
        <CornerFiligree position="tr" className="absolute top-3 right-3 pointer-events-none" size={36} />
        <CornerFiligree position="bl" className="absolute bottom-3 left-3 pointer-events-none" size={36} />
        <CornerFiligree position="br" className="absolute bottom-3 right-3 pointer-events-none" size={36} />

        {/* Close Button */}
        <button
          onClick={handleModalClose}
          disabled={status === 'submitting'}
          aria-label="Close registration modal"
          className="interactive absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-[#D4AF55]/30 text-[#F3D995] hover:text-white hover:bg-[#D4AF55]/20 disabled:opacity-40 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ===================== SUCCESS STATE ===================== */}
        {status === 'success' ? (
          <div ref={celebrationRef} className="relative z-10 py-6 text-center flex flex-col items-center">
            {/* Sacred Ornamental Golden Seal */}
            <div className="celebrate-item relative mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#F3D995] bg-gradient-to-tr from-[#B8892D]/30 via-[#D4AF55]/20 to-[#F3D995]/40 flex items-center justify-center shadow-[0_0_40px_rgba(243,217,149,0.4)]">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#F3D995]" />
              </div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-[#D4AF55]/50 animate-spin-slow pointer-events-none" />
            </div>

            {/* YOU'RE IN. */}
            <div className="celebrate-item">
              <span className="text-[11px] font-cinzel font-semibold tracking-[0.35em] text-[#D4AF55] uppercase block mb-1">
                CONFIRMATION
              </span>
              <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-black text-gold-bright tracking-[0.18em] leading-none mb-3">
                YOU&apos;RE IN.
              </h2>
            </div>

            {/* Event Name & Date */}
            <div className="celebrate-item my-2">
              <p className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#FBF7EE] uppercase">
                ASMITA
              </p>
              <p className="font-script text-3xl sm:text-4xl text-[#F3D995]">
                Ethnic Day
              </p>
              <p className="font-sans-clean text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D4AF55] uppercase mt-1">
                16 SEPTEMBER 2026 · SEMINAR HALL, F BLOCK
              </p>
            </div>

            <FiligreeDivider className="celebrate-item w-48 my-4" />

            <p className="celebrate-item font-cormorant italic text-lg sm:text-xl text-[#FBF7EE]/90 max-w-md">
              &ldquo;Your participation has been registered. Wear your culture with pride and grace.&rdquo;
            </p>

            <p className="celebrate-item text-xs font-sans-clean text-[#FBF7EE]/60 max-w-sm mt-3 leading-relaxed">
              A member of the Spearheads Student Council or faculty coordination team will reach out if your category requires performance scheduling.
            </p>

            {/* BACK TO ASMITA CTA */}
            <button
              onClick={handleModalClose}
              className="celebrate-item interactive mt-8 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-[#F3D995] bg-gradient-to-r from-[#D4AF55]/25 via-[#B8892D]/40 to-[#D4AF55]/25 hover:from-[#D4AF55]/40 hover:to-[#B8892D]/60 text-white text-xs font-sans-clean font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,85,0.3)]"
            >
              <span>BACK TO ASMITA</span>
              <ArrowRight className="w-4 h-4 text-[#F3D995]" />
            </button>
          </div>
        ) : (
          /* ===================== REGISTRATION FORM ===================== */
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF55]/30 bg-[#100718]/80 text-[#F3D995] text-[10px] sm:text-[11px] font-cinzel tracking-[0.25em] uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#F3D995]" />
                <span>Student Registration</span>
              </div>
              <h2
                id="join-asmita-title"
                className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold-gradient tracking-[0.16em] uppercase leading-tight"
              >
                JOIN ASMITA
              </h2>
              <p
                id="join-asmita-subtitle"
                className="font-cormorant italic text-lg sm:text-xl text-[#F3D995] mt-1"
              >
                &ldquo;Step into the celebration.&rdquo;
              </p>
              <FiligreeDivider className="w-40 sm:w-56 mx-auto mt-3" />
            </div>

            {/* Failure Alert Banner (if submission failed) */}
            {status === 'failure' && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm font-sans-clean flex items-start gap-3 animate-fadeIn"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-rose-300">Registration Notice</p>
                  <p className="mt-0.5 text-rose-200/90 leading-relaxed">{statusMessage}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {/* Row 1: Full Name */}
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                >
                  FULL NAME <span className="text-rose-400">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="reg-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718]/80 border ${
                    errors.name ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                  } text-base text-[#FBF7EE] placeholder-[#FBF7EE]/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                />
                {errors.name && (
                  <p id="err-name" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Row 2: College / Department */}
              <div>
                <label
                  htmlFor="reg-department"
                  className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                >
                  COLLEGE / DEPARTMENT <span className="text-rose-400">*</span>
                </label>
                <input
                  id="reg-department"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. IEC College of Engg. & Tech. (Dept. of CSE)"
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(errors.department)}
                  aria-describedby={errors.department ? 'err-department' : undefined}
                  className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718]/80 border ${
                    errors.department ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                  } text-base text-[#FBF7EE] placeholder-[#FBF7EE]/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                />
                {errors.department && (
                  <p id="err-department" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.department}</span>
                  </p>
                )}
              </div>

              {/* Row 3: Year & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Year Select */}
                <div>
                  <label
                    htmlFor="reg-year"
                    className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                  >
                    YEAR <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="reg-year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    aria-invalid={Boolean(errors.year)}
                    aria-describedby={errors.year ? 'err-year' : undefined}
                    className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718] border ${
                      errors.year ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                    } text-base text-[#FBF7EE] focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                  >
                    <option value="" disabled className="bg-[#100718] text-[#FBF7EE]/40">
                      Select Academic Year
                    </option>
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y} className="bg-[#100718] text-[#FBF7EE]">
                        {y}
                      </option>
                    ))}
                  </select>
                  {errors.year && (
                    <p id="err-year" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.year}</span>
                    </p>
                  )}
                </div>

                {/* Branch Select */}
                <div>
                  <label
                    htmlFor="reg-branch"
                    className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                  >
                    BRANCH <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="reg-branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    aria-invalid={Boolean(errors.branch)}
                    aria-describedby={errors.branch ? 'err-branch' : undefined}
                    className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718] border ${
                      errors.branch ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                    } text-base text-[#FBF7EE] focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                  >
                    <option value="" disabled className="bg-[#100718] text-[#FBF7EE]/40">
                      Select Engineering Branch
                    </option>
                    {BRANCH_OPTIONS.map((b) => (
                      <option key={b} value={b} className="bg-[#100718] text-[#FBF7EE]">
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.branch && (
                    <p id="err-branch" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.branch}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                  >
                    EMAIL ADDRESS <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@iec.edu.in"
                    disabled={status === 'submitting'}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718]/80 border ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                    } text-base text-[#FBF7EE] placeholder-[#FBF7EE]/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                  />
                  {errors.email && (
                    <p id="err-email" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="reg-phone"
                    className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                  >
                    PHONE NUMBER <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit Mobile Number"
                    disabled={status === 'submitting'}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718]/80 border ${
                      errors.phone ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                    } text-base text-[#FBF7EE] placeholder-[#FBF7EE]/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                  />
                  {errors.phone && (
                    <p id="err-phone" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 5: Participation Type */}
              <div>
                <label
                  htmlFor="reg-participationType"
                  className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase mb-1.5"
                >
                  PARTICIPATION TYPE <span className="text-rose-400">*</span>
                </label>
                <select
                  id="reg-participationType"
                  name="participationType"
                  value={formData.participationType}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  aria-invalid={Boolean(errors.participationType)}
                  aria-describedby={errors.participationType ? 'err-participationType' : undefined}
                  className={`interactive w-full px-4 py-3 rounded-xl bg-[#100718] border ${
                    errors.participationType
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-[#D4AF55]/30 focus:border-[#F3D995]'
                  } text-base text-[#FBF7EE] focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors`}
                >
                  <option value="" disabled className="bg-[#100718] text-[#FBF7EE]/40">
                    Select Your Role or Category
                  </option>
                  {PARTICIPATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#100718] text-[#FBF7EE]">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.participationType && (
                  <p id="err-participationType" className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.participationType}</span>
                  </p>
                )}
              </div>

              {/* Row 6: Additional Message (Optional, max 300) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="reg-message"
                    className="block text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.2em] text-[#D4AF55] uppercase"
                  >
                    ADDITIONAL MESSAGE / NOTES <span className="text-[#FBF7EE]/40 font-normal lowercase">(optional)</span>
                  </label>
                  <span className="text-[10px] text-[#FBF7EE]/50 font-mono">
                    {(formData.message || '').length}/300
                  </span>
                </div>
                <textarea
                  id="reg-message"
                  name="message"
                  rows={2}
                  maxLength={300}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Let us know your performance details, group members, or cultural notes..."
                  disabled={status === 'submitting'}
                  className="interactive w-full px-4 py-2.5 rounded-xl bg-[#100718]/80 border border-[#D4AF55]/30 focus:border-[#F3D995] text-base text-[#FBF7EE] placeholder-[#FBF7EE]/30 focus:outline-none focus:ring-1 focus:ring-[#D4AF55] transition-colors resize-none"
                />
              </div>

              {/* Row 7: Consent Checkbox */}
              <div className="pt-2">
                <label className="interactive flex items-start gap-3 cursor-pointer select-none">
                  <input
                    id="reg-consent"
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-5 h-5 rounded border border-[#D4AF55] bg-[#100718] text-[#D4AF55] focus:ring-0 focus:ring-offset-0 mt-0.5 accent-[#D4AF55]"
                  />
                  <span className="text-xs sm:text-sm font-sans-clean text-[#FBF7EE]/90">
                    I agree to participate in{' '}
                    <span className="text-[#F3D995] font-semibold">ASMITA — Ethnic Day</span> and adhere to the college code of conduct and traditional attire guidelines.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-rose-400 font-sans-clean flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="interactive group relative w-full py-4 rounded-xl border border-[#F3D995] bg-gradient-to-r from-[#D4AF55]/25 via-[#B8892D]/45 to-[#D4AF55]/25 hover:from-[#D4AF55]/45 hover:to-[#B8892D]/65 text-white font-sans-clean text-xs sm:text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,85,0.25)] hover:shadow-[0_0_35px_rgba(243,217,149,0.45)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#F3D995] animate-spin" />
                      <span>REGISTERING...</span>
                    </>
                  ) : (
                    <>
                      <span>REGISTER FOR ASMITA</span>
                      <ArrowRight className="w-4 h-4 text-[#F3D995] group-hover:translate-x-1.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Statement & Expandable Notice */}
              <div className="pt-2 text-center">
                <p className="text-[11px] font-sans-clean text-[#FBF7EE]/60">
                  Your details are collected only for ASMITA participation and event coordination.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
                  className="interactive inline-flex items-center gap-1 mt-1 text-[10px] tracking-wider text-[#D4AF55] hover:text-[#F3D995] underline underline-offset-2 transition-colors"
                >
                  <Shield className="w-3 h-3" />
                  <span>{showPrivacyInfo ? 'Hide Privacy Notice' : 'Read Privacy Notice'}</span>
                </button>

                {showPrivacyInfo && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#100718]/90 border border-[#D4AF55]/25 text-left text-[11px] text-[#FBF7EE]/70 space-y-1.5 font-sans-clean animate-fadeIn">
                    <p className="font-semibold text-[#F3D995] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      Privacy &amp; Data Safeguards
                    </p>
                    <p>
                      • <strong>Information Collected:</strong> Name, department, year, branch, email, phone number, and optional participation notes.
                    </p>
                    <p>
                      • <strong>Purpose:</strong> Coordinating stage performances, ramp walk lineups, audience capacity, and entry validation at the Seminar Hall.
                    </p>
                    <p>
                      • <strong>Access:</strong> Stored securely in a private Firebase Firestore database protected by strict security rules. Your contact information is never published or exposed publicly.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
