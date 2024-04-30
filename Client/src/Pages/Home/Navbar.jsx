import { useState, useEffect } from "react";
import { Link  as ScrollLink} from "react-scroll";
import { Link as RouterLink } from "react-router-dom";


const Navbar = () => {
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
                        <RouterLink onClick={closeMenu} activeClass="navbar--active-content"
                        to="/"
                        className="navbar--content"
                        >
                            
                            Home
                          </RouterLink>
                        
                    </li>
                    <li>
                        <RouterLink onClick={closeMenu} activeClass="navbar--active-content"
                        to="/my-skills"
                        className="navbar--content"
                        >
                            
                            Skills
                          </RouterLink>
                        
                    </li>
                    <li>
                        <RouterLink onClick={closeMenu} activeClass="navbar--active-content"
                        to="/about-us"
                        className="navbar--content"
                        >
                            
                            About Us
                          </RouterLink>
                        
                    </li>
                    <li>
                        <RouterLink onClick={closeMenu} activeClass="navbar--active-content"
                        
                        to="/login"
                        className="navbar--content"
                        >
                            
                            Login
                          </RouterLink>
                        
                    </li>
                </ul>
          </div>

          <RouterLink onClick={closeMenu} activeClass="navbar--active-content"
                to="/register"
                className="btn btn-outline-primary"
                >
                     Register
                
            </RouterLink>
                
             
        </nav>

     );
}
 
export default Navbar;