import "../css/AuthPage.css";
import React, { useState, useEffect } from "react";
import submitData from "../../api/postLogic";

function AuthPage({ setIsLoggedIn, setUserRole }){
  //TODO: export this higher up so it refreshes/logs you out when the token is invalid
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const expiration = localStorage.getItem("authTokenExpiration");
  
    if (authToken && expiration) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expiration).getTime();
  
      if (currentTime >= expirationTime) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiration");
        localStorage.removeItem("BusinessId"); 
        localStorage.removeItem("UserId"); 
        localStorage.removeItem("userRole"); 
        setIsLoggedIn(false);
        console.log("Token expired and removed.");
      } else {
        setIsLoggedIn(true);
      }
    }
  }, [setIsLoggedIn]);
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const response = await submitData("auth/generate-token", payload);

    if(response.token){
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authTokenExpiration", response.expiration);
      localStorage.setItem("BusinessId", response.businessId); 
      localStorage.setItem("UserId", response.userId); 
      localStorage.setItem("userRole", response.role); 
      setUserRole(response.role); 
      setIsLoggedIn(true);
    }
  };

  return(
  <div className="container">
      <div className="form-box">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <input type="email" name="email" placeholder="username"/>
          <input type="password" name="password" placeholder="password"/>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default AuthPage;