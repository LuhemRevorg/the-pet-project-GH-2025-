import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxShDfrQlSfQ0vBcDznv-FBDBERUxvKfE",
  authDomain: "unified-ai-toolbox.firebaseapp.com",
  projectId: "unified-ai-toolbox",
  storageBucket: "unified-ai-toolbox.appspot.com",
  messagingSenderId: "254051635965",
  appId: "1:254051635965:web:c54b66f926d7c938f32494",
  measurementId: "G-19X0L9S3JZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };