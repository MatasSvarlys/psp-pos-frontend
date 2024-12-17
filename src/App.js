import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Common-elements/js/Navbar';
import { roleRoutes } from "./lib/roleRoutes.js";
import { AuthPage, WelcomePage } from './Pages/js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      {!isLoggedIn && 
        <AuthPage setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
      }

      {isLoggedIn && 
        <>
          <Navbar userRole={userRole}/>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            
            {/* Dynamically render routes based on user role */}
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
