import "../css/AuthPage.css";
import React, { useState } from "react";
import submitData from "../../api/postLogic";

function AuthPage({ setIsLoggedIn }){
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  
  const handleDisplay = () => {
    setIsLoginDisplay(!isLoginDisplay);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    console.log("sent: "+JSON.stringify(payload));
    const response = await submitData("auth/generate-token", payload);
    console.log("recieved"+JSON.stringify(response));
    if(response.token){
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authTokenExpiration", response.expiration);  
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