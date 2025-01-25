import React, { useState } from "react";
import styles from "../styling/AddPet.module.css";
import { db, storage, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [vaccination, setVaccination] = useState({ vaccineName: "", vaccineDate: "", certificate: null });
  const [diet, setDiet] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    sex: "",
    size: "",
    health: "",
    breed: "",
    personality: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `pets/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Save pet data in Firestore
      await addDoc(collection(db, "pets"), {
        name,
        age,
        imageUrl,
        vaccination,
        diet,
        personalInfo,
        userId: auth.currentUser.uid, // Associate pet with the authenticated user
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <div className={styles.addPetContainer}>
      <h1>Add a New Pet</h1>
      <form className={styles.petForm} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h2>Pet Info</h2>
          <input
            type="text"
            placeholder="Pet Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Pet Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className={styles.formSection}>
          <h2>Vaccination Data</h2>
          <input
            type="text"
            placeholder="Vaccine Name"
            value={vaccination.vaccineName}
            onChange={(e) =>
              setVaccination({ ...vaccination, vaccineName: e.target.value })
            }
          />
          <input
            type="date"
            value={vaccination.vaccineDate}
            onChange={(e) =>
              setVaccination({ ...vaccination, vaccineDate: e.target.value })
            }
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setVaccination({ ...vaccination, certificate: e.target.files[0] })
            }
          />
        </div>

        <div className={styles.formSection}>
          <h2>Pet Diet</h2>
          <textarea
            placeholder="Pet Diet (What it usually eats)"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          />
        </div>

        <div className={styles.formSection}>
          <h2>Pet Personal Info</h2>
          <input
            type="text"
            placeholder="Sex"
            value={personalInfo.sex}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, sex: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Size"
            value={personalInfo.size}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, size: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Health"
            value={personalInfo.health}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, health: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Breed"
            value={personalInfo.breed}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, breed: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Personality"
            value={personalInfo.personality}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, personality: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={personalInfo.description}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, description: e.target.value })
            }
          />
        <h2>Pet Profile Picture</h2>
            <div className={styles.formSection}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            </div>

        </div>
        

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
