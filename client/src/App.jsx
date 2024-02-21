import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Sidebar from "./components/SideBar"
import Groups from "./pages/Groups"
import Notification from "./pages/Notification"
import Profile from "./pages/Profile"

function App() {
  
  return (
    <>
    <Sidebar>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/projects" element = {<Projects/>}/>
        <Route path="/groups" element = {<Groups/>}/>
        <Route path="/notifications" element = {<Notification/>}/>
        <Route path="/profile" element = {<Profile/>}/>
      </Routes>
      </Sidebar>
    </>
  )
}

export default App
