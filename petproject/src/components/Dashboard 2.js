import React from "react";
import styles from "../styling/Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleGoBack = async () => {
    navigate("/");
  }


  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2>Sidebar</h2>
        <ul>
          <li className={styles.sidebarItem}>Feature 1</li>
          <li className={styles.sidebarItem}>Feature 2</li>
          <li className={styles.sidebarItem}>Feature 3</li>
          <li className={styles.sidebarItem}>Feature 4</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Welcome Message */}
        <h1 className={styles.welcomeMessage}>Welcome to Your Dashboard</h1>
        <p className={styles.subtext}>
          You are now signed in. Use this interface to interact with your AI assistant.
        </p>

        {/* Text Prompt Interface */}
        <div className={styles.textPrompt}>
          <textarea
            placeholder="Type your prompt here..."
            className={styles.textArea}
          ></textarea>
        </div>

        {/* Feature Template Boxes */}
        <div className={styles.featureGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.templateBox}>
              <p className={styles.templateText}>Template {index + 1}</p>
            </div>
          ))}
        </div>

        <button onClick={handleGoBack}>Go back?</button> 

      </div>

    </div>
  );
};

export default Dashboard;
