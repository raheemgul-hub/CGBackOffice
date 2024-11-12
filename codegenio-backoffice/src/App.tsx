
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import ClientList from './pages/clientList/ClientList'
import AddClient from './pages/addClient/AddClient'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/clientlist" element={<ClientList />}></Route>
        <Route path="/addclient" element={<AddClient />}></Route>
      </Routes>
    </BrowserRouter>

   
  )
}

export default App
