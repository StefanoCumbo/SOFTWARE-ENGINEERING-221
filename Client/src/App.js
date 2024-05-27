import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Home from './Pages/Home/Homescreen';
import Navbar from './Pages/Home/Navbar';
import Register from './Pages/Home/Register';
import Login from './Pages/Home/Login';
import AboutUs from './Pages/Home/AboutUs';
import MySkills from './Pages/Home/MySkills';
import HeroSection from './Pages/Home/HeroSection';
import Footer from './Pages/Home/Footer';
import Dashboard from './Pages/Home/Dashboard';
import ParkingLots from './Pages/Home/ParkingLots';
import ManageRequests from './Pages/Home/ManageRequests';
import ManageUsers from './Pages/Home/ManageUsers';
import AdminNavBar from './Pages/Home/AdminNavBar';
import Communication from './Pages/Home/Communication';
import DriverNavBar from './Pages/Home/DriverNavBar';
import SendParkingRequest from './Pages/Home/SendParkingRequest';
import Payments from './Pages/Home/Payments';
import Messages from './Pages/Home/Messages';
import Monitor from './Pages/Home/Monitor';
import ParkingSpace from './Pages/Home/ParkingSpace';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

const [userType, setUserType] = useState("admin");

let NavBarComponent;
if(userType ==='admin'){
  NavBarComponent = AdminNavBar;
}else if (userType === 'driver'){
  NavBarComponent = DriverNavBar;
}else{
  NavBarComponent = Navbar;
}


const handleLogout = ()=>{
  setUserType("")
};


  return (
    <div className="App">
      <Router>
        <div>
          <NavBarComponent  handleLogout={handleLogout}/>
          <Routes>

            
            <Route  path='/' element={<HeroSection/>}></Route>
            <Route path='/login' element={<Login/>}></Route> 
            <Route path="/register" element={<Register setUserType={setUserType}/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/my-skills" element={<MySkills/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path='/monitor' element={<Monitor/>}/>
            <Route path="/manage-parking-lots" element={<ParkingLots/>}/>
            <Route path="/manage-requests" element={<ManageRequests/>}/>
            <Route path="/manage-users" element={<ManageUsers/>}/>
            <Route path="/communication" element={<Communication/>}/>
            <Route path="/send-parking-request" element={<SendParkingRequest/>}/>
            <Route path='/payments' element={<Payments/>}/>
            <Route path='/parking-space' element={<ParkingSpace/>}/>
            <Route path='/messages' element={<Messages/>}/>




            <Route path='*' element={<div>404 Not Found</div>}></Route>

          </Routes>
          <Footer/>
          
          <ToastContainer autoClose={3000} /> 

          
        </div>
      </Router>
      
      
    </div>
  );
}

export default App;
