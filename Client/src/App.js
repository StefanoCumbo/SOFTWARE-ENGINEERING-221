import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home/Homescreen';
import Navbar from './Pages/Home/Navbar';
import Register from './Pages/Home/Register';
import Login from './Pages/Home/Login';
import AboutUs from './Pages/Home/AboutUs';
import MySkills from './Pages/Home/MySkills';
import HeroSection from './Pages/Home/HeroSection';
import Footer from './Pages/Home/Footer';



function App() {

const [userType, setUserType] = useState(null);

let NavBarComponent;
if(userType ==='admin'){
  NavBarComponent = AdminNavBar;
}else if (userType === 'driver'){
  NavBarComponent = DriverNavBar;
}else{
  NavBarComponent = Navbar;
}

  return (
    <div className="App">
      <Router>
        <div>
          <NavBarComponent/>
          <Routes>


            <Route  path='/' element={<HeroSection/>}></Route>
            <Route path='/login' element={<Login/>}></Route> */
            <Route path="/register" element={<Register/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/my-skills" element={<MySkills/>} />




            <Route path='*' element={<div>404 Not Found</div>}></Route>

          </Routes>
          <Footer/>
          
        </div>
      </Router>
      
      
    </div>
  );
}

export default App;
