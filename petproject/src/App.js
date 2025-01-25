<<<<<<< HEAD
import react from 'react';
import './App.css';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Home />
    </div>
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GoogleSignIn from "./components/GoogleSignIn";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleSignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
>>>>>>> main
  );
}

export default App;
