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
      <div className={styles.basicInfo}>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Health:</strong> {pet.health}</p>
        <p><strong>Sex:</strong> {pet.sex}</p>
        <p><strong>Size:</strong> {pet.size}</p>
        <p><strong>Personality:</strong> {pet.personality}</p>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>
        <p>{pet.description || "No description available"}</p>
      </div>

      <div className={styles.imageContainer}>
        <h3>Pet Image</h3>
        <img src={pet.imageUrl || "/path/to/default/image.jpg"} alt={pet.name} />
      </div>

      <div className={styles.vaccinationRecords}>
        <h3>Vaccination Records</h3>
        {pet.vaccination && pet.vaccination.length > 0 ? (
          pet.vaccination.map((record, index) => (
            <div key={index} className={styles.vaccineRecord}>
              <p><strong>Vaccine Name:</strong> {record.vaccineName}</p>
              <p><strong>Vaccine Date:</strong> {record.vaccineDate}</p>
              <p><strong>Certificate:</strong> {record.certificate ? "Uploaded" : "Not available"}</p>
            </div>
          ))
        ) : (
          <p>No vaccination records available.</p>
        )}
      </div>

      <div className={styles.allergyDetails}>
        <h3>Allergy Details</h3>
        <p>{pet.allergy || "No known allergies"}</p>
      </div>

      <div className={styles.dietSchedule}>
        <h3>Diet Schedule</h3>
        <p><strong>Morning:</strong> {pet.diet?.morning || "Not specified"}</p>
        <p><strong>Afternoon:</strong> {pet.diet?.afternoon || "Not specified"}</p>
        <p><strong>Evening:</strong> {pet.diet?.evening || "Not specified"}</p>
        <p><strong>Night:</strong> {pet.diet?.night || "Not specified"}</p>
      </div>

      <div className={styles.chatbox}>
        <h3>Chatbox</h3>
        <p>Chat with your pet: {pet.name} (API integration coming soon)</p>
      </div>

      <div className={styles.stats}>
        <h3>Pet Stats</h3>
        <div className={styles.statBox}>
          <strong>Stat 1:</strong> {/* Add stat value */}
        </div>
        <div className={styles.statBox}>
          <strong>Stat 2:</strong> {/* Add stat value */}
        </div>
        <div className={styles.statBox}>
          <strong>Stat 3:</strong> {/* Add stat value */}
        </div>
        <div className={styles.statBox}>
          <strong>Stat 4:</strong> {/* Add stat value */}
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
