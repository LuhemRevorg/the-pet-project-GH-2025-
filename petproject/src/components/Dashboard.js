import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import styles from "../styling/Dashboard.module.css";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null); // State to hold the selected pet
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

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

  const handlePetClick = (pet) => {
    setSelectedPet(pet); // Set selected pet when clicked
    setIsEditing(false);  // Reset editing mode when viewing pet details
  };

  const handleEditPet = () => {
    setIsEditing(true);  // Switch to edit mode
  };

  const handleSavePet = (updatedPet) => {
    // Update the pet in the database (you will need to implement this function)
    // After saving, set editing back to false and display the updated pet details
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
              <h2>{selectedPet.name}</h2>
              <button className={styles.editButton} onClick={handleEditPet}>
                Edit
              </button>
              <p>Age: {selectedPet.age}</p>
              <div className={styles.chatbox}>
                {/* Placeholder for chatbox */}
                <p>Chatbox for pet: {selectedPet.name} (API integration coming soon)</p>
              </div>
              <div className={styles.stats}>
                <div className={styles.statBox}>Stat 1: {/* Stat value */}</div>
                <div className={styles.statBox}>Stat 2: {/* Stat value */}</div>
                <div className={styles.statBox}>Stat 3: {/* Stat value */}</div>
                <div className={styles.statBox}>Stat 4: {/* Stat value */}</div>
              </div>
            </div>
          ) : (
            <div className={styles.petEditForm}>
              <h2>Edit Pet Information</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // On form submit, save the updated pet data
                  const updatedPet = {
                    ...selectedPet,
                    name: e.target.name.value,
                    age: e.target.age.value,
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
          <p>Select a pet to view or edit its details.</p> // Add fallback if no pet is selected
        )}
      </div>
    </div>
  );
};

export default Dashboard;
