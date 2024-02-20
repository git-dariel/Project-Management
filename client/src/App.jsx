import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Sidebar from "./components/SideBar"

function App() {
  

  return (
    <>
    <Sidebar>
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/projects" element = {<Projects/>}/>
      </Routes>
      </Sidebar>
    </>
  )
}

export default App
