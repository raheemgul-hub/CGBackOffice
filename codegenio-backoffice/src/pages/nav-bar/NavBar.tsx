import { Outlet } from "react-router-dom";

function NavBar() {
    return (    
        <div className="header">
            <div className="logo"><img src="https://codegenio.com/images/logo.svg" alt="logo" /></div>
           
     <Outlet />
        </div>
    );
}

export default NavBar