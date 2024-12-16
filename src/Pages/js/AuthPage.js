import "../css/AuthPage.css";
import React, { useState, useEffect } from "react";
import submitData from "../../api/postLogic";

function AuthPage({ setIsLoggedIn, setUserRole }){
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    const expiration = sessionStorage.getItem("authTokenExpiration");
  
    if (authToken && expiration) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(expiration).getTime();
  
      if (currentTime >= expirationTime) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authTokenExpiration");
        sessionStorage.removeItem("BusinessId");
        setIsLoggedIn(false); //i think this will run only when on the auth page, but wtv
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
    console.log("sent: "+JSON.stringify(payload));
    const response = await submitData("auth/generate-token", payload);
    console.log("recieved"+JSON.stringify(response));


    if(response.token){
      sessionStorage.setItem("authToken", response.token);
      sessionStorage.setItem("authTokenExpiration", response.expiration);
      sessionStorage.setItem("BusinessId", response.businessId); 
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