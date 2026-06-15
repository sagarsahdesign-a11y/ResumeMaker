import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// CRITICAL: The app will break without this line passing the db id explicitly
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "ai-studio-b9cf2aed-8e59-45a1-b576-3e1a55083777");
export const auth = getAuth(app);
