import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "../styling/PetInfoEditor.module.css";

const PetInfoEditor = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      const petRef = doc(db, "pets", id);
      const petDoc = await getDoc(petRef);

      if (petDoc.exists()) {
        setPet(petDoc.data());
        setName(petDoc.data().name);
        setAge(petDoc.data().age);
      } else {
        console.log("No such document!");
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    const petRef = doc(db, "pets", id);
    await updateDoc(petRef, {
      name,
      age,
    });
    navigate(`/dashboard/pet/${id}`);
  };

  return (
    <div className={styles.editorContainer}>
      <h2>Edit Pet Information</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PetInfoEditor;
