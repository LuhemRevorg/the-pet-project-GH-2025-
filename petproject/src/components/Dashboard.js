import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "../styling/Dashboard.module.css";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import PAWS from "../images/pwpw.png";
import KUTTTABC from "../images/dogge.gif";
import SIDEBARPiC from "../images/dashhh.png";

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

  const handleSignOut = () => {
    navigate("/");
  }

  const handlePetClick = async (pet) => {
    setSelectedPet(pet);
    setIsEditing(false);
  
    const petRef = doc(db, "pets", pet.id);
    const petDoc = await getDoc(petRef);
  
    if (petDoc.exists()) {
      const petData = petDoc.data();
      console.log("Selected pet:", petData);  // Add this line to log the selected pet
      setSelectedPet({ id: pet.id, ...petData });
    } else {
      console.log("No such document!");
    }
  };
  

  const handleEditPet = () => {
    setIsEditing(true);
  };

  const handlePetHelp = (name, breed, type) => {
    // Navigate with query parameters using the URLSearchParams API
    navigate(`/petHelp?name=${name}&breed=${breed}&type=${type}`);
  };
 
  const handleHome = () => {
    navigate("/");
  }

  const handleDelete = async (petId) => {
    console.log("Pet ID received:", petId);
    if (!petId) {
      console.error("Error: petId is undefined or invalid.");
      return;
    }
    try {
      const petRef = doc(db, "pets", petId);
      console.log("Pet Reference:", petRef.path);
  
      await deleteDoc(petRef);
  
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      setSelectedPet(null);
      console.log("Pet successfully deleted!");
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };
  
    
  

  const handleSavePet = async (updatedPet) => {
    const petRef = doc(db, "pets", updatedPet.id);
    await updateDoc(petRef, updatedPet);
    setSelectedPet(updatedPet);
    setIsEditing(false);
  };

  return (
    <div className={styles.dashboardContainer}>
              
      <div className={styles.sidebar}> 
        <h2 className={styles.topHeader}>Your Pets</h2>
        <ul>
          {pets.map((pet) => (
            <li key={pet.id} className={styles.sidebarItem}>
              <p className={styles.petSide} onClick={() => handlePetClick(pet)}>{pet.name}</p>
            </li>
          ))}
          <li className={styles.sidebarItemAddNew} onClick={handleAddPet}>
            Add Pet
          </li>
        </ul>
        <img src={SIDEBARPiC} alt="dog" height={200} width={150} className={styles.KUTTAA}/>
        <button className={styles.DelButton2} onClick={handleSignOut}>Sign Out</button>
      </div>








      <div className={styles.mainContent}>
              <div className="gif-container-2">
                <img src={KUTTTABC} alt="Roaming Dog" className="gif" />
              </div>
        {selectedPet ? (
          !isEditing ? (
            <div className={styles.petDetailContainer}>
              <h2 className={styles.petName}>{selectedPet.name}</h2>
              <button className={styles.petHelpButton} onClick={() => handlePetHelp(selectedPet.name, selectedPet.breed, selectedPet.type)}>Take Help !!</button>

              <div className={styles.petDetailSection}>
                <div className={styles.petDetailCard}>
                  <h3>Basic Information</h3>
                  <p><strong>Age:</strong> {selectedPet.age}</p>
                  <p><strong>Type:</strong> {selectedPet.type}</p>
                  <p><strong>Breed:</strong> {selectedPet.personalInfo.breed}</p>
                  <p><strong>Description:</strong> {selectedPet.personalInfo.description}</p>
                  <p><strong>Health:</strong> {selectedPet.personalInfo.health}</p>
                  <p><strong>Personality:</strong> {selectedPet.personalInfo.personality}</p>
                  <p><strong>Sex:</strong> {selectedPet.personalInfo.sex}</p>
                  <p><strong>Size:</strong> {selectedPet.personalInfo.size}</p>
                  <p><strong>Allergies:</strong> {selectedPet.allergies}</p>
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
              <div>
                <button className={styles.editButton} onClick={handleEditPet}>Edit</button>
                <button className={styles.editButton} onClick={handleHome}>Return To Home</button>
                <button className={styles.DelButton} onClick={() => handleDelete(selectedPet.id)}>Delete Pet</button>

              </div>
              
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
          <div className={styles.default}>
           <button className={styles.addPetButton} onClick={handleAddPet}>
            {/* <img src={PAWS} alt="paws" height={40} width={40} /> */}
              <p>🐾 Paw Me <img src={PAWS} alt="paws" height={40} width={40} /></p>
            
          </button> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
