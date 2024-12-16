import "../css/AuthPage.css";
import React, { useState, useEffect } from "react";
import submitData from "../../api/postLogic";

function AuthPage({ setIsLoggedIn }){
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  
  useEffect(() => {
    if(sessionStorage.getItem("authToken")){
      setIsLoggedIn(true);
    }
  }, []);
  
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