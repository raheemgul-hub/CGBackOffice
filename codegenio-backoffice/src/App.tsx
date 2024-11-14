import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import ClientUpdate from './pages/client-update/ClientUpdate';
import CurrencyAdd from './pages/currencyAdd/CurrencyAdd';
import CurrencyList from './pages/currencyList/CurrencyList';
import CurrencyUpdate from './pages/currency-update/CurrencyUpdate';
import EmployeeList from './pages/employee-list/EmployeeList';
import EmployeeAdd from './pages/employee-add/EmployeeAdd';
import EmployeeUpdate from './pages/employee-update/EmployeeUpdate';
import { useState } from 'react';
import Sidebar from './pages/sidebar/sidebar';
import NavBar from './pages/nav-bar/NavBar';
import ClientList from './pages/client-list/ClientList';
import ClientAdd from './pages/client-add/ClientAdd';
import ProjectSave from './pages/project-save/ProjectSave';
import ProjectUpdate from './pages/project-update/ProjectUpdate';
import ProjectList from './pages/projectlist/ProjectList';

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
            <Route path="/login" element={<Login />} />
            <Route path="/client-list" element={<ClientList />} />
            <Route path="/client-add" element={<ClientAdd />} />
            <Route path="/project-save" element={<ProjectSave />} />
            <Route path="/project-list" element={<ProjectList />} />
            <Route path="/project-update/:id/:client_id" element={<ProjectUpdate />} />
            <Route path="/client-update/:id" element={<ClientUpdate />} />
            <Route path="/currencyadd" element={<CurrencyAdd />} />
            <Route path="/currencylist" element={<CurrencyList />} />
            <Route path="/currencyupdate/:id" element={<CurrencyUpdate />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/employee-add" element={<EmployeeAdd />} />
            <Route path="/employee-update/:id" element={<EmployeeUpdate />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
