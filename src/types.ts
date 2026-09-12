export interface AttireItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ornamentType: 'paisley' | 'lotus' | 'peacock' | 'mandala' | 'jhumka' | 'royal';
  tag: string;
  styleAdvice: string[];
}

export interface CoordinatorInfo {
  role: string;
  name: string;
  phone: string;
  formattedPhone: string;
  email?: string;
  designationSubtitle: string;
}

export interface EventDetailItem {
  label: string;
  value: string;
  subvalue?: string;
  iconName: string;
}

export type ParticipationType =
  | 'Ethnic Day Participation'
  | 'Cultural Performance'
  | 'Fashion / Ethnic Walk'
  | 'Other';

export type CollegeYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export type CollegeBranch =
  | 'CSE'
  | 'CSE (AI/ML)'
  | 'IT'
  | 'ECE'
  | 'ME'
  | 'CE'
  | 'Other';

export interface RegistrationInput {
  name: string;
  department: string;
  year: CollegeYear | '';
  branch: CollegeBranch | '';
  email: string;
  phone: string;
  participationType: ParticipationType | '';
  message?: string;
  consent: boolean;
}

export interface RegistrationNormalizedData {
  name: string;
  department: string;
  year: CollegeYear;
  branch: CollegeBranch;
  email: string;
  phone: string;
  participationType: ParticipationType;
  message: string;
  consent: true;
}

export type FormValidationErrors = Partial<Record<keyof RegistrationInput, string>>;

export interface RegistrationResult {
  success: boolean;
  registrationId?: string;
  error?: string;
  code?: 'UNAVAILABLE' | 'VALIDATION_FAILED' | 'DUPLICATE' | 'PERMISSION_DENIED' | 'NETWORK_ERROR' | 'UNKNOWN';
}
