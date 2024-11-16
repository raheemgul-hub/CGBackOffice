import { Link, Outlet } from 'react-router-dom';
import './Sidebar.css';
import { FaSignInAlt, FaUserPlus, FaListAlt, FaSave, FaProjectDiagram, FaDollarSign } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }:any) => {
    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <h2>Sidebar Menu</h2>
            <button className='sidebar-close' onClick={toggleSidebar}>Close</button>
            <ul>
                <ul className="sidebar-menu">
                    <Link to="/login" className="sidebar-item"><li><FaSignInAlt /> Login</li></Link>

                    <Link to="/client-add" className="sidebar-item"><li><FaUserPlus /> Client Add</li></Link>
                    <Link to="/client-list" className="sidebar-item"><li><FaListAlt /> Client List</li></Link>



                    <Link to="/project-save" className="sidebar-item"><li><FaSave />  Project Add</li></Link>
                    <Link to="/project-list" className="sidebar-item"><li><FaProjectDiagram /> Project List</li></Link>

                    <Link to="/currency-add" className="sidebar-item"><li><FaDollarSign />  Currency Add</li></Link>
                    <Link to="/currency-list" className="sidebar-item"><li><FaDollarSign /> Currency List</li></Link>

                    <Link to="/employee-add" className='sidebar-item'><li><FaUserPlus /> Employee Add</li></Link>
                    <Link to="employee-list" className='sidebar-item'><li><FaListAlt /> Employee List</li></Link>
                    <Link to="employee-detail/:id" className='sidebar-item'><li><FaListAlt /> Employee Detail</li></Link>
                    
                </ul>

                <Outlet />

            </ul>
        </div>
    );
};

export default Sidebar;
