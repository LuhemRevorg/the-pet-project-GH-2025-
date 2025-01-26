import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import GoogleSignIn from "./components/GoogleSignIn";
import Dashboard from "./components/Dashboard";
import AddPet from "./components/AddPet";
import PetDetails from "./components/PetDetails";
import PetInfoEditor from "./components/PetInfoEditor"; 
import PetHelp from "./components/petHelp"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleSignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute>
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pet/:id"
            element={
              <ProtectedRoute>
                <PetDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pet/:id/edit"
            element={
              <ProtectedRoute>
                <PetInfoEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/petHelp/:id" // New route to petHelp with petId
            element={
              <ProtectedRoute>
                <PetHelp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
