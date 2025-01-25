import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../styling/GoogleSignIn.module.css";
import GOOGLELOGO from "../images/googleLogo.avif";
import DOGPAW from "../images/Dog_Paw_Print.png";


function GoogleSignIn() {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.loginCard}>
        <img
          src={DOGPAW}
          alt="Cute paw logo"
          className={styles.logo}
        />
        <h1 className={styles.heading}>Welcome to Petify</h1>
        <p className={styles.subtext}>Your furry friend's favorite place!</p>
        <button className={styles.googleButton} onClick={handleGoogleSignIn}>
          <img
            src={GOOGLELOGO}
            alt="Google Icon"
            className={styles.googleIcon}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default GoogleSignIn;
