import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/forms/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Sidebar from "./components/SideBar";
import Groups from "./pages/Groups";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import { useState } from "react";
import Signup from "./pages/forms/Signup";
import ProjectView from "./components/ProjectView";

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
        {/* Public Routes */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} /> 
        
        {/* Protected Routes */}
        {isLoggedIn && (
          <Route
            path="/dashboard"
            element={
              <Sidebar onLogout={handleLogout}>
                <Dashboard />
              </Sidebar>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path="/projects"
            element={
              <Sidebar onLogout={handleLogout}>
                <Projects />
              </Sidebar>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path="/groups"
            element={
              <Sidebar onLogout={handleLogout}>
                <Groups />
              </Sidebar>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path="/notifications"
            element={
              <Sidebar onLogout={handleLogout}>
                <Notification />
              </Sidebar>
            }
          />
        )}
        {isLoggedIn && (
          <Route
            path="/profile"
            element={
              <Sidebar onLogout={handleLogout}>
                <Profile />
              </Sidebar>
            }
          />
        )}
      </Routes>

      {/* For testing purposes only */}
      <Routes>
        {/* <Route path="/dashboard" element={<Sidebar> <Dashboard/></Sidebar>} />
        <Route path="/projects" element={<Sidebar> <Projects/></Sidebar>} /> */}
        <Route path="/projectview" element={<Sidebar><ProjectView/></Sidebar>} />
        {/* <Route path="/groups" element={<Sidebar> <Groups/></Sidebar>} />
        <Route path="/notifications" element={<Sidebar> <Notification/></Sidebar>} />
        <Route path="/profile" element={<Sidebar> <Profile/></Sidebar>} /> */}
      </Routes>
    </>
  );
}

export default App;
