import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Common-elements/js/Navbar';
import { roleRoutes } from "./lib/roleRoutes.js";
import { AuthPage, WelcomePage } from './Pages/js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUserRole = localStorage.getItem("userRole");

    if(authToken && !storedUserRole){
      localStorage.removeItem("authToken");
      return;
    }
    if (authToken) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenExpiration");
    localStorage.removeItem("BusinessId"); 
    localStorage.removeItem("UserId"); 
    localStorage.removeItem("userRole"); 
    setIsLoggedIn(false);
  }
  return (
    <Router>
      {!isLoggedIn && 
        <AuthPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
      }

      {isLoggedIn && 
        <>
          <Navbar userRole={userRole}/>
          <button onClick={logOut}>log out</button>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            
            {roleRoutes[userRole]?.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </>
      }
    </Router>
  );
}

export default App;
