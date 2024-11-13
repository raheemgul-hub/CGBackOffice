
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import ClientList from './pages/clientList/ClientList'
import AddClient from './pages/addClient/AddClient'
import SaveProject from './pages/saveProject/SaveProject'
import Sidebar from './pages/sidebar/sidebar'
import ProjectList from './pages/projectlist/ProjectList'
import UpdateProject from './pages/updateproject/UpdateProject'
import UpdateClient from './pages/updateClient/UpdateClient'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/clientlist" element={<ClientList />}></Route>
        <Route path="/addclient" element={<AddClient />}></Route>
        <Route path="/saveproject" element={<SaveProject />}></Route>
        <Route path="/projectlist" element={<ProjectList />}></Route>
        <Route path="/updateproject/:id/:client_id" element={<UpdateProject />}></Route>
        <Route path="/updateclient/:id" element={<UpdateClient />}></Route>
      </Routes>
    </BrowserRouter>

   
  )
}

export default App
