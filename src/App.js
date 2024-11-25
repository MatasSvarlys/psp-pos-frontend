import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Common-elements/js/Navbar';
import {AuthPage, WelcomePage, OrdersPage, ReservationsPage, UsersPage, BusinessesPage} from './Pages/js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //TODO: Add persistence so that refreshing the page doesnt log you out
  return (
    <Router>
      {!isLoggedIn && 
        <AuthPage setIsLoggedIn={setIsLoggedIn}/>
      }
      {isLoggedIn && 
      <>
        <Navbar />
        <Routes>
            <Route path="/" element={<WelcomePage/>}></Route>
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/businesses" element={<BusinessesPage />} />
        </Routes>
      </>
      }
    </Router>
  );
}

export default App;
