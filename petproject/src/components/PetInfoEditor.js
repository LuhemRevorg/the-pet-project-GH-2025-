import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To get the pet ID from URL
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "../styling/PetInfoEditor.module.css";

const PetInfoEditor = () => {
  const navigate = useNavigate();
  const { petId } = useParams(); // Get the pet ID from the URL
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      const petRef = doc(db, "pets", petId);
      const petDoc = await getDoc(petRef);

      if (petDoc.exists()) {
        setPet(petDoc.data());
      } else {
        console.log("Pet not found");
      }
    };

    fetchPetDetails();
  }, [petId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedPet = {
      name: e.target.name.value,
      age: e.target.age.value,
      breed: e.target.breed.value,
      description: e.target.description.value,
      health: e.target.health.value,
      personality: e.target.personality.value,
      sex: e.target.sex.value,
      size: e.target.size.value,
      allergy: e.target.allergy.value,
      diet: {
        morning: e.target.morning.value,
        afternoon: e.target.afternoon.value,
        evening: e.target.evening.value,
        night: e.target.night.value,
      },
      vaccination: pet.vaccination, // Keep existing vaccination data
    };

    const petRef = doc(db, "pets", petId);
    await updateDoc(petRef, updatedPet);
    navigate("/dashboard"); // After saving, navigate back to the dashboard
  };

  if (!pet) return <p>Loading...</p>;

  return (
    <div className={styles.editorContainer}>
      <h2>Edit Pet Information</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={pet.name}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            defaultValue={pet.age}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            defaultValue={pet.breed}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            defaultValue={pet.description}
          />
        </div>
        <div>
          <label>Health:</label>
          <input
            type="text"
            name="health"
            defaultValue={pet.health}
          />
        </div>
        <div>
          <label>Personality:</label>
          <input
            type="text"
            name="personality"
            defaultValue={pet.personality}
          />
        </div>
        <div>
          <label>Sex:</label>
          <input
            type="text"
            name="sex"
            defaultValue={pet.sex}
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="text"
            name="size"
            defaultValue={pet.size}
          />
        </div>
        <div>
          <label>Allergy:</label>
          <input
            type="text"
            name="allergy"
            defaultValue={pet.allergy || ""}
          />
        </div>

        <h3>Diet Schedule:</h3>
        <div>
          <label>Morning:</label>
          <input
            type="text"
            name="morning"
            defaultValue={pet.diet?.morning || ""}
          />
        </div>
        <div>
          <label>Afternoon:</label>
          <input
            type="text"
            name="afternoon"
            defaultValue={pet.diet?.afternoon || ""}
          />
        </div>
        <div>
          <label>Evening:</label>
          <input
            type="text"
            name="evening"
            defaultValue={pet.diet?.evening || ""}
          />
        </div>
        <div>
          <label>Night:</label>
          <input
            type="text"
            name="night"
            defaultValue={pet.diet?.night || ""}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default PetInfoEditor;
