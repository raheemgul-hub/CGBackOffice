import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import { useState } from 'react';
import Sidebar from './pages/sidebar/sidebar';
import NavBar from './pages/nav-bar/NavBar';
import ClientList from './pages/client-list/ClientList';
import ClientAdd from './pages/client-add/ClientAdd';
import ClientUpdate from './pages/client-update/ClientUpdate';
import CurrencyList from './pages/currency-list/CurrencyList';
import CurrencyAdd from './pages/currency-add/CurrencyAdd';
import CurrencyUpdate from './pages/currency-update/CurrencyUpdate';
import EmployeeList from './pages/employee-list/EmployeeList';
import EmployeeAdd from './pages/employee-add/EmployeeAdd';
import EmployeeUpdate from './pages/employee-update/EmployeeUpdate';
import ProjectSave from './pages/project-save/ProjectSave';
import ProjectList from './pages/project-list/ProjectList';
import ProjectUpdate from './pages/project-update/ProjectUpdate';
import EmployeeDetail from './pages/employee-detail/EmployeeDetail';
import WelcomePage from './pages/welcome-page/WelcomePage';
import { Toaster } from 'react-hot-toast';


function App() {
  // State to control sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      {/* Sidebar Component - will be available across all routes */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar Toggle Button */}
      <div className="sidebar-toggle-button" onClick={toggleSidebar}>
        <button type="button"><i className="fa-solid fa-bars"></i></button>
      </div>

      {/* Main Routes */}
      <div className={isSidebarOpen ? 'content overlay' : 'content'}>
        <Routes>
          <Route path="/" element={<NavBar />} >
            <Route index element={<WelcomePage />}></Route>
            <Route path="/login" element={<Login />} />
            {/* client routers */}
            <Route path="/client-list" element={<ClientList />} />
            <Route path="/client-add" element={<ClientAdd />} />
            <Route path="/client-update/:id" element={<ClientUpdate />} />

            {/* currency routers */}
            <Route path="/currency-list" element={<CurrencyList />} />
            <Route path="/currency-add" element={<CurrencyAdd />} />
            <Route path="/currency-update/:id" element={<CurrencyUpdate />} />

            {/* employee routers */}
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/employee-add" element={<EmployeeAdd />} />
            <Route path="/employee-update/:id" element={<EmployeeUpdate />} />
            <Route path='/employee-detail/:id' element={<EmployeeDetail />} />


            {/* project routers */}
            <Route path="/project-save" element={<ProjectSave />} />
            <Route path="/project-list" element={<ProjectList />} />
            <Route path="/project-update/:id/:client_id" element={<ProjectUpdate />} />
          </Route>
        </Routes>
      </div>
      <div><Toaster /></div>
    </BrowserRouter>
  );
}

export default App;
