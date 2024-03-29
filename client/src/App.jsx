import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ConfirmSignOut from "./components/common/dialogs/signout.confirm";
import LoadingSkeleton from "./components/common/loading/skeleton";
import ProtectedRoute from "./components/users/protected.route";
import { AuthProvider } from "./services/auth.context";
import { Toaster } from "sonner";

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const Groups = lazy(() => import("./pages/Groups"));
const Notification = lazy(() => import("./pages/Notification"));
const Profile = lazy(() => import("./pages/Profile"));
const ProjectView = lazy(() => import("./pages/Project.view"));
const GroupProjects = lazy(() => import("./pages/Group.projects"));

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster richColors />
        <Suspense
          fallback={
            <div>
              <LoadingSkeleton />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/groups"
              element={
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups/:groupId/projects"
              element={
                <ProtectedRoute>
                  <GroupProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups/:groupId/projects/:projectId"
              element={
                <ProtectedRoute>
                  <ProjectView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <ProtectedRoute>
                  <ProjectView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <ConfirmSignOut />
                </ProtectedRoute>
              }
            />
            <Route
              path="/loading"
              element={
                <ProtectedRoute>
                  <LoadingSkeleton />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
