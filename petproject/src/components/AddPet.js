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
  const [vaccination, setVaccination] = useState([]);
  const [diet, setDiet] = useState({
    morning: "",
    afternoon: "",
    evening: "",
    night: "",
  });
  const [allergies, setAllergies] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    sex: "",
    size: "",
    health: "",
    breed: "",
    personality: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleVaccinationSubmit = () => {
    setVaccination([
      ...vaccination,
      { vaccineName: "", vaccineDate: "", certificate: null },
    ]);
  };

  const handleVaccinationChange = (index, e) => {
    const newVaccination = [...vaccination];
    newVaccination[index][e.target.name] = e.target.value;
    setVaccination(newVaccination);
  };

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
        allergies,
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
        {/* Pet Info Section */}
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

        {/* Vaccination Section */}
        <div className={styles.formSection}>
          <h2>Vaccination Records</h2>
          {vaccination.map((vaccine, index) => (
            <div key={index}>
              <input
                type="text"
                name="vaccineName"
                placeholder="Vaccine Name"
                value={vaccine.vaccineName}
                onChange={(e) => handleVaccinationChange(index, e)}
              />
              <input
                type="date"
                name="vaccineDate"
                value={vaccine.vaccineDate}
                onChange={(e) => handleVaccinationChange(index, e)}
              />
              <input
                type="file"
                accept="application/pdf"
                name="certificate"
                onChange={(e) => {
                  const newVaccination = [...vaccination];
                  newVaccination[index].certificate = e.target.files[0];
                  setVaccination(newVaccination);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={handleVaccinationSubmit}>
            Add Another Vaccine
          </button>

          {/* Vaccine Table */}
          {vaccination.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Vaccine Name</th>
                  <th>Vaccine Date</th>
                  <th>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {vaccination.map((vaccine, index) => (
                  <tr key={index}>
                    <td>{vaccine.vaccineName}</td>
                    <td>{vaccine.vaccineDate}</td>
                    <td>{vaccine.certificate ? "Uploaded" : "Not Uploaded"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Allergy Section */}
        <div className={styles.formSection}>
          <h2>Allergy Details</h2>
          <textarea
            placeholder="Describe any allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
        </div>

        {/* Pet Diet Section */}
        <div className={styles.formSection}>
          <h2>Pet Diet</h2>
          <input
            type="text"
            placeholder="Morning"
            value={diet.morning}
            onChange={(e) => setDiet({ ...diet, morning: e.target.value })}
          />
          <input
            type="text"
            placeholder="Afternoon"
            value={diet.afternoon}
            onChange={(e) => setDiet({ ...diet, afternoon: e.target.value })}
          />
          <input
            type="text"
            placeholder="Evening"
            value={diet.evening}
            onChange={(e) => setDiet({ ...diet, evening: e.target.value })}
          />
          <input
            type="text"
            placeholder="Night"
            value={diet.night}
            onChange={(e) => setDiet({ ...diet, night: e.target.value })}
          />
        </div>

        {/* Personal Info Section */}
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
        </div>

        {/* Pet Profile Picture Section */}
        <div className={styles.formSection}>
          <h2>Pet Profile Picture</h2>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
