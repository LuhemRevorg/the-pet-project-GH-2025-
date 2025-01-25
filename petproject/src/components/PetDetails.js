import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../styling/PetDetail.module.css";

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      const petRef = doc(db, "pets", id);
      const petDoc = await getDoc(petRef);

      if (petDoc.exists()) {
        setPet(petDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPetDetails();
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  const handleEditClick = () => {
    navigate(`/dashboard/pet/${id}/edit`);
  };

  return (
    <div className={styles.petDetailContainer}>
      <div className={styles.petHeader}>
        <h2>{pet.name}</h2>
        <button className={styles.editButton} onClick={handleEditClick}>
          Edit
        </button>
      </div>
      <p>Age: {pet.age}</p>
      <div className={styles.chatbox}>
        {/* Placeholder for chatbox */}
        <p>Chatbox for pet: {pet.name} (API integration coming soon)</p>
      </div>
      <div className={styles.stats}>
        <div className={styles.statBox}>Stat 1: {/* Stat value */}</div>
        <div className={styles.statBox}>Stat 2: {/* Stat value */}</div>
        <div className={styles.statBox}>Stat 3: {/* Stat value */}</div>
        <div className={styles.statBox}>Stat 4: {/* Stat value */}</div>
      </div>
    </div>
  );
};

export default PetDetail;
