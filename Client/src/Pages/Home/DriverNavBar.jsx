
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";


const DriverNavBar = ({handleLogout}) => {
    

        

const [navActive, setNavActive] = useState(false);

const toggleNav = ()=>{
    setNavActive(true)
}

const closeMenu = ()=>{
    setNavActive(false)
}

useEffect(()=>{
    const handleResize = ()=> {
        if (window.innerWidth <= 500){
            closeMenu
        }
    }
    window.addEventListener("resize", handleResize);
    return ()=>{
        window.removeEventListener("resize", handleResize)
    }

}, []) 

useEffect(()=>{
    if(window.innerWidth <= 1200){
        closeMenu;
    }
}, [])



    return ( 
        <nav className={`navbar ${navActive? "active": ""}`}>
        <div>
            <img src="./img/logo.svg" alt="logoipsum" />
        </div>
        <a className={`nav__hamburger ${navActive ? "active": ""}`} onClick={toggleNav}>

            <span className="nav__hamburger__lime"></span>
            <span className="nav__hamburger__lime"></span>
            <span className="nav__hamburger__lime"></span>


        </a>
        <div className={`navbar--items ${navActive ? "active":""}`}>
            <ul>
                <li>
                    <Link onClick={closeMenu} activeClass="navbar--active-content"
                    to="/"
   

                    className="navbar--content"
                    >
                        
                        Home
                      </Link>
                    
                </li>
                <li>
                    <Link onClick={closeMenu} activeClass="navbar--active-content"
                    to="/send-parking-request"
   

                    className="navbar--content"
                    >
                        
                        Send Parking Request.
                      </Link>
                    
                </li>
                <li>
                    <Link onClick={closeMenu} activeClass="navbar--active-content"
                    to="/payments"
                    className="navbar--content"
                    >
                        
                        Payments.
                      </Link>
                    
                </li>
                <li>
                    <Link onClick={closeMenu} activeClass="navbar--active-content"
                    to="/parking-status"
                    className="navbar--content"
                    >
                        
                        Parking Status.
                      </Link>
                    
                </li>
                <li>
                    <Link onClick={()=>{handleLogout(); closeMenu();}} activeClass="navbar--active-content"
                    
                    to="/"
                    className="navbar--content"
                    
                    
                    >
                        
                        Logout
                      </Link>
                    
                </li>
                <li>
                    <Link onClick={closeMenu} activeClass="navbar--active-content"
                    
                    to="/messages"
                    className="navbar--content"
                    >
                        
                        Messages
                      </Link>
                    
                </li>
                
                
            </ul>
      </div>

      <Link onClick={closeMenu} activeClass="navbar--active-content"
            to="/register"
            className="btn btn-outline-primary"
            >
                 Register
            
        </Link>
            
         
    </nav>

     );
     
}
 
export default DriverNavBar;