import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Groups from "./pages/Groups";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import { useState } from "react";
import ProjectView from "./components/projects/ProjectView";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:projectId" element={<ProjectView/>}/>
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
