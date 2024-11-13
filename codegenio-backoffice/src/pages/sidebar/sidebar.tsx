import { Link, Outlet } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaListAlt, FaSave, FaProjectDiagram, FaDollarSign } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <Link to="/"><li><FaSignInAlt /> Login</li></Link>
                <Link to="/addclient"><li><FaUserPlus /> Add Client</li></Link>
                <Link to="/clientlist"><li><FaListAlt /> Client List</li></Link>
                <Link to="/saveproject"><li><FaSave /> Save Project</li></Link>
                <Link to="/projectlist"><li><FaProjectDiagram /> Project List</li></Link>
                <Link to="/updateproject"><li><FaProjectDiagram /> Project List</li></Link>
                <Link to="/currencyadd"><li><FaDollarSign /> Add Currency</li></Link>
                <Link to="/currencylist"><li><FaDollarSign /> Currency List</li></Link>
            </ul>
            <Outlet />
        </div>
    );
};

export default Sidebar;
