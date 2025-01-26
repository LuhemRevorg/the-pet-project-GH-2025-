import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../styling/Dashboard.module.css";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      if (auth.currentUser) {
        const petsRef = collection(db, "pets");
        const q = query(petsRef, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        const petsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(petsData);
      }
    };

    fetchPets();
  }, []);

  const handleAddPet = () => {
    navigate("/add-pet");
  };

  const handlePetClick = async (pet) => {
    setSelectedPet(pet);
    setIsEditing(false);

    const petRef = doc(db, "pets", pet.id);
    const petDoc = await getDoc(petRef);

    if (petDoc.exists()) {
      setSelectedPet(petDoc.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleEditPet = () => {
    setIsEditing(true);
  };

  const handlePetHelp = (petId, petBreed, petType) => {
    navigate(`/petHelp/${petId}`);
  }

  const handleHome = () => {
    navigate("/");
  }

  const handleSavePet = async (updatedPet) => {
    const petRef = doc(db, "pets", updatedPet.id);
    await updateDoc(petRef, updatedPet);
    setSelectedPet(updatedPet);
    setIsEditing(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>Your Pets</h2>
        <ul>
          {pets.map((pet) => (
            <li key={pet.id} className={styles.sidebarItem}>
              <button onClick={() => handlePetClick(pet)}>{pet.name}</button>
            </li>
          ))}
          <li className={styles.sidebarItem} onClick={handleAddPet}>
            Add Pet
          </li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        {selectedPet ? (
          !isEditing ? (
            <div className={styles.petDetailContainer}>
              <h2 className={styles.petName}>{selectedPet.name}</h2>
              <button className={styles.petHelpButton} onClick={() => handlePetHelp(selectedPet.name, selectedPet.breed, selectedPet.type)}>Pet Help</button>
              <div className={styles.petDetailSection}>
                <div className={styles.petDetailCard}>
                  <h3>Basic Information</h3>
                  <p><strong>Age:</strong> {selectedPet.age}</p>
                  <p><strong>Breed:</strong> {selectedPet.breed}</p>
                  <p><strong>Description:</strong> {selectedPet.description}</p>
                  <p><strong>Health:</strong> {selectedPet.health}</p>
                  <p><strong>Personality:</strong> {selectedPet.personality}</p>
                  <p><strong>Sex:</strong> {selectedPet.sex}</p>
                  <p><strong>Size:</strong> {selectedPet.size}</p>
                  <p><strong>Allergies:</strong> {selectedPet.allergy || "No known allergies"}</p>
                </div>
                
                <div className={styles.petDetailCard}>
                  <h3>Diet Schedule</h3>
                  <p><strong>Morning:</strong> {selectedPet.diet?.morning || "Not specified"}</p>
                  <p><strong>Afternoon:</strong> {selectedPet.diet?.afternoon || "Not specified"}</p>
                  <p><strong>Evening:</strong> {selectedPet.diet?.evening || "Not specified"}</p>
                  <p><strong>Night:</strong> {selectedPet.diet?.night || "Not specified"}</p>
                </div>
                
                <div className={styles.petDetailCardVaccine}>
                  <h3>Vaccination Records</h3>
                  {selectedPet.vaccination && selectedPet.vaccination.length > 0 ? (
                    <table className={styles.vaccineTable}>
                      <thead>
                        <tr>
                          <th>Vaccine Name</th>
                          <th>Vaccine Date</th>
                          <th>Certificate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPet.vaccination.map((record, index) => (
                          <tr key={index}>
                            <td>{record.vaccineName}</td>
                            <td>{record.vaccineDate}</td>
                            <td>{record.certificate ? "Uploaded" : "Not available"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No vaccination records available.</p>
                  )}
                </div>

              </div>
              <button className={styles.editButton} onClick={handleEditPet}>Edit</button>
              <button className={styles.editButton} onClick={handleHome}>Return To Home</button>
            </div>
          ) : (
            <div className={styles.petEditForm}>
              <h2>Edit Pet Information</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedPet = {
                    ...selectedPet,
                    name: e.target.name.value,
                    age: e.target.age.value,
                    // Update other fields as needed
                  };
                  handleSavePet(updatedPet);
                }}
              >
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedPet.name}
                    required
                  />
                </div>
                <div>
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    defaultValue={selectedPet.age}
                    required
                  />
                </div>
                <button type="submit">Save</button>
              </form>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          )
        ) : (
          <p>Select a pet to view or edit its details.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
