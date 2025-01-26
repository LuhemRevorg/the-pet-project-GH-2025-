import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styling/petHelp.module.css';

import diet_decide from './Diet';

const PetHelp = () => {
  // Get the pet data from the URL path parameters
  const { name, breed, type } = useParams(); // Access path parameters
  const [selectedOption, setSelectedOption] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // New local variables for pet info
  const petName = name;
  const petBreed = breed;
  const petType = type;
  console.log(petName, petBreed, petType);

  const handleHome = () => {
    navigate("/");
  }

  // This function will be called when an option is selected
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Call the corresponding model function based on selected option
    if (event.target.value === '1') {
      callModel1(petName, petBreed, petType); // Pass the pet info to the API function
    } else if (event.target.value === '2') {
      callModel2(petName, petBreed, petType);
      diet_decide(selected); // Pass the pet ID to the API function
    } else if (event.target.value === '3') {
      callModel3(petName, petBreed, petType);
    }
  };

  // Placeholder API functions
  const callModel1 = (name, breed, type) => {
    console.log(`Calling Model 1 for ${name}, ${breed}, ${type}`);
    setMessages([...messages, { text: 'Model 1: How can I assist you?', sender: 'bot' }]);
  };

  const callModel2 = (name, breed, type) => {
    console.log(`Calling Model 2 for ${name}, ${breed}, ${type}`);
    setMessages([...messages, { text: 'Model 2: How can I assist you?', sender: 'bot' }]);
  };

  const callModel3 = (name, breed, type) => {
    console.log(`Calling Model 3 for ${name}, ${breed}, ${type}`);
    setMessages([...messages, { text: 'Model 3: How can I assist you?', sender: 'bot' }]);
  };

  const handleSendMessage = () => {
    if (selectedOption) {
      setMessages([...messages, { text: `You: ${selectedOption}`, sender: 'user' }]);
    }
  };

  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pet Help</h1>
          <p>You're asking for help for: {petName} ({petType}, {petBreed})</p>
        </div>

        <div className={styles.dropdownContainer}>
          <label htmlFor="options">Choose an option:</label>
          <select
            id="options"
            className={styles.dropdown}
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            <option value="1">Disease Recognition</option>
            <option value="2">Diet Recommendation</option>
            <option value="3">Option 3 (Model 3)</option>
          </select>
          <div className={styles.selectedOptionText}>
            {selectedOption && <p>You selected Option {selectedOption}. The corresponding model is being called.</p>}
          </div>
        </div>

        <div className={styles.chatbox}>
          <div className={styles.messageContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${msg.sender === 'bot' ? styles.botMessage : ''}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputField}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              placeholder="Type your message"
            />
            <button className={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>

        <div>
          <button className={styles.editButton} onClick={handleHome}>Return To Home</button>
        </div>
      </div>

    </div>
  );
};

export default PetHelp;
