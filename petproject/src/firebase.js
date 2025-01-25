import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxShDfrQlSfQ0vBcDznv-FBDBERUxvKfE",
  authDomain: "unified-ai-toolbox.firebaseapp.com",
  projectId: "unified-ai-toolbox",
  storageBucket: "unified-ai-toolbox.firebasestorage.app",
  messagingSenderId: "254051635965",
  appId: "1:254051635965:web:c54b66f926d7c938f32494",
  measurementId: "G-19X0L9S3JZ",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

export { app, auth };
