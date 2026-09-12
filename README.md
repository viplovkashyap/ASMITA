# ASMITA — Ethnic Day 2026

The official digital immersive experience for **ASMITA — Ethnic Day** at **IEC College of Engineering & Technology**, Greater Noida.

- **Event Date:** Wednesday, 16 September 2026
- **Venue:** Seminar Hall, F Block, IEC Campus
- **Presented by:** Spearheads Student Council

---

## ASMITA REGISTRATION — DEPLOYMENT CHECKLIST

Follow this step-by-step production deployment checklist to configure and activate the registration system with Firebase Firestore.

---

### STEP 1: CREATE A FIREBASE PROJECT
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**).
3. Project Name: Enter `asmita-ethnic-day-2026` (or your preferred college project identifier).
4. Google Analytics: Optional (can be enabled for traffic insights or disabled).
5. Click **Create project** and wait for the provisioning to finish.

---

### STEP 2: REGISTER A WEB APP
1. In your project overview, click the **Web icon** (`</>`) to add a web app.
2. App nickname: `ASMITA Web App`.
3. Check the box for Firebase Hosting if deploying directly with Firebase, or leave unchecked if deploying to Cloud Run / Vercel.
4. Click **Register app**.
5. Firebase will present your `firebaseConfig` keys containing:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

### STEP 3: CONFIGURE ENVIRONMENT VARIABLES
1. Copy `.env.example` to `.env.local` (or configure secrets in your deployment dashboard / Settings menu):
   ```bash
   cp .env.example .env.local
   ```
2. Populate the client variables with values from Step 2:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=asmita-ethnic-day-2026.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=asmita-ethnic-day-2026
   VITE_FIREBASE_STORAGE_BUCKET=asmita-ethnic-day-2026.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
   ```
3. Verify that all variables start with `VITE_` so Vite bundles them securely to the client application.

---

### STEP 4: CREATE FIRESTORE DATABASE
1. In the left navigation of Firebase Console, click **Build** → **Firestore Database**.
2. Click **Create database**.
3. Database ID: `(default)`.
4. Location: Select the closest region (e.g., `asia-south1` for Mumbai / Greater Noida, India).
5. Security Rules: Select **Start in production mode** (all reads/writes blocked by default until rules in Step 5 are applied).
6. Click **Enable**.

---

### STEP 5: DEPLOY SECURITY RULES
Deploy the restrictive, schema-validating rules located in `firestore.rules`:

**Option A (Firebase CLI - Recommended):**
```bash
firebase deploy --only firestore:rules
```

**Option B (Firebase Console):**
1. Navigate to **Firestore Database** → **Rules** tab in the console.
2. Replace all contents with the code inside `firestore.rules`:
   - Enforces valid field schemas (`name`, `department`, `year`, `branch`, `email`, `phone`, `participationType`, `consent`).
   - Ensures string length limits (name <= 80, email <= 254, phone 10-15, message <= 300).
   - Validates timestamps (`createdAt == request.time`).
   - Blocks public reads, updates, and deletes (`allow read, update, delete: if false`).
3. Click **Publish**.

---

### STEP 6: TEST REGISTRATION LOCALLY
1. Run the local development server:
   ```bash
   npm run dev
   ```
2. Open the website in your browser.
3. Click **JOIN ASMITA** in the hero or **REGISTER FOR ASMITA** near the footer.
4. Fill out the test registration with valid student information and submit.
5. Verify the celebratory screen appears:
   - **YOU'RE IN.**
   - **ASMITA — ETHNIC DAY**
   - **16 SEPTEMBER 2026**
6. Try submitting again with the same email and phone number to verify duplicate prevention is triggered.

---

### STEP 7: VERIFY DATA INTEGRITY IN FIREBASE CONSOLE
1. Navigate to **Firestore Database** → **Data** tab in the Firebase Console.
2. Verify that the `registrations` collection is created.
3. Inspect the document:
   - Document ID starts with `reg_` (deterministic SHA-256 hash).
   - All fields are normalized (`email` in lowercase, `phone` stripped of formatting).
   - `createdAt` is a genuine Firestore server timestamp.
   - `consent` is `true`.

---

### STEP 8: PRODUCTION BUILD AND DEPLOY
1. Run the production build command:
   ```bash
   npm run build
   ```
2. Ensure there are zero TypeScript compilation or bundle errors.
3. Deploy the production distribution (`dist/`) to your hosting environment (Cloud Run, Firebase Hosting, Vercel, or custom server).
4. Configure production environment variables in your hosting provider's secrets management panel.

---

### STEP 9: (RECOMMENDED) ENABLE APP CHECK
To protect your Firestore database from bots, scrapers, and abuse:
1. In Firebase Console, go to **Build** → **App Check**.
2. Register your web app with **reCAPTCHA v3**.
3. Copy your reCAPTCHA site key and add it to your environment:
   ```env
   VITE_FIREBASE_APP_CHECK_SITE_KEY=6Ld...
   ```
4. Enforce App Check on the Cloud Firestore service.

---

### STEP 10: COORDINATOR ACCESS WORKFLOW
Because registration data contains student contact information, public reads are completely disabled in `firestore.rules`:
1. **Accessing Submissions:**
   - Authorized faculty coordinators and the Spearheads Student Council access the participant roster through the [Firebase Console](https://console.firebase.google.com/).
   - Alternatively, use an authenticated Cloud Function or Firebase Admin SDK script with a Service Account to export participants to an encrypted spreadsheet.
2. **Exporting Data:**
   - In Google Cloud Console, select the project and go to Firestore → Export/Import to export Firestore collections to a private Google Cloud Storage bucket.
3. **Data Protection:**
   - Under no circumstances is the raw registration list rendered on the public website.
   - Participant records are used solely for stage coordination, ramp walk lineups, audience capacity, and security entrance at the Seminar Hall.

---

## Creator & Development Credits 🤑🤑🤑
- **Designed & Developed by:** Viplov · B.Tech 2nd Year
- **Email:** [viplov7@icloud.com](mailto:viplov7@icloud.com)
- **GitHub:** [github.com/viplovk](https://github.com/viplovk)
- **LinkedIn:** [linkedin.com/in/viplov7](https://linkedin.com/in/viplov7)
- **X:** [x.com/vishuk30](https://x.com/vishuk30)
- **Instagram:** [instagram.com/studymaterialboy](https://instagram.com/studymaterialboy)
- **Copyright:** © 2026 ASMITA · Spearheads Student Council · IEC College of Engineering & Technology
