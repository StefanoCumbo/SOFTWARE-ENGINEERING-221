import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Homescreen';
import Navbar from './Pages/Home/Navbar';

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
            <Route path='/' element={<Home/>}></Route>

            {/* In the nav bar set the Link to to /login and /register */}

            {/* <Route path='/login' element={<Login/>}></Route>

            <Route path='/register' element={<Login/>}></Route> */}


            <Route path='*' element={<div>404 Not Found</div>}></Route>

          </Routes>
        </div>
      </Router>
      
      
    </div>
  );
}

export default App;
