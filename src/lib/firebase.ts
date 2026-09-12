import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Checks if mandatory Firebase environment variables are provided.
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey.trim() !== '' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId.trim() !== '' &&
    firebaseConfig.appId &&
    firebaseConfig.appId.trim() !== ''
  );
};

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

/**
 * Safely initialize or retrieve the Firebase app instance.
 */
export const getFirebaseApp = (): FirebaseApp | null => {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!appInstance) {
    if (getApps().length > 0) {
      appInstance = getApp();
    } else {
      appInstance = initializeApp(firebaseConfig as Record<string, string>);

      // Optional production App Check setup
      const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;
      if (typeof window !== 'undefined' && appCheckSiteKey && appCheckSiteKey.trim() !== '') {
        import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
          try {
            initializeAppCheck(appInstance!, {
              provider: new ReCaptchaV3Provider(appCheckSiteKey),
              isTokenAutoRefreshEnabled: true,
            });
          } catch {
            // Non-blocking in local development / testing
          }
        }).catch(() => {});
      }
    }
  }

  return appInstance;
};

/**
 * Safely get the Firestore database instance.
 */
export const getFirestoreDb = (): Firestore | null => {
  if (dbInstance) return dbInstance;

  const app = getFirebaseApp();
  if (!app) return null;

  try {
    dbInstance = getFirestore(app);
    return dbInstance;
  } catch (err) {
    console.error('Failed to initialize Firestore:', err);
    return null;
  }
};
