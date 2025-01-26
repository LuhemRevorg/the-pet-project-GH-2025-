import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styling/petHelp.module.css';

import diet_decide from './Diet';
import disease_find from './Disease';

const PetHelp = () => {
  // Get the pet data from the URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const petName = queryParams.get('name');
  const petBreed = queryParams.get('breed');
  const petType = queryParams.get('type');
  
  const [selectedOption, setSelectedOption] = useState('');
  const [userMessage, setUserMessage] = useState(''); // For the user's input
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // Track if an API call is in progress
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/dashboard");
  };

  // Handle model selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You: ${userMessage}`, sender: 'user' },
      ]);

      setIsProcessing(true); // Start processing API request

      // Handle based on the selected option
      if (selectedOption === '1') {
        // Disease recognition model
        disease_find(petName, userMessage, petType)
          .then((response) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `PetGuru: ${response}`, sender: 'bot' },
            ]);
          })
          .catch(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `PetGuru: Sorry, something went wrong.`, sender: 'bot' },
            ]);
          });
          setIsProcessing(false);
      } else if (selectedOption === '2') {
        // Diet recommendation model
        diet_decide(petName, petBreed, petType, userMessage)
          .then((response) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `Bot: ${response}`, sender: 'bot' },
            ]);
          })
          .catch(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: `Bot: Sorry, something went wrong.`, sender: 'bot' },
            ]);
          });
          setIsProcessing(false);
      }

      setUserMessage(''); // Clear the input field after sending a message
    }
  };

  useEffect(() => {
    const messageContainer = document.querySelector(`.${styles.messageContainer}`);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pet Help</h1>
          <p>You're asking for help for {petName}!</p>
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
          </select>
          <div className={styles.selectedOptionText}>
            {selectedOption && !isProcessing && (
              <p>You selected Option {selectedOption}. The corresponding model will be called when you send the message.</p>
            )}
            {isProcessing && <p>Processing...</p>}
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
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
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
