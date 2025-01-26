import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<GoogleSignIn />} />

          {/* Protected Routes */}
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

          {/* Pet Help Route (with query params) */}
          <Route
            path="/petHelp"
            element={
              <ProtectedRoute>
                <PetHelpWithQuery />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Component to handle query params for PetHelp
const PetHelpWithQuery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const breed = queryParams.get('breed');
  const type = queryParams.get('type');

  return <PetHelp name={name} breed={breed} type={type} />;
};

export default App;
