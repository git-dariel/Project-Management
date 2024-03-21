import { Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import ConfirmSignOut from "./components/common/dialogs/signout.confirm";
import LoadingSkeleton from "./components/common/loading/skeleton";


const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const Groups = lazy(() => import("./pages/Groups"));
const Notification = lazy(() => import("./pages/Notification"));
const Profile = lazy(() => import("./pages/Profile"));
const ProjectView = lazy(() => import("./components/projects/project.view"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Suspense fallback={<div><LoadingSkeleton /></div>}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectView />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<ConfirmSignOut />} />
          <Route path="/loading" element={<LoadingSkeleton />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
