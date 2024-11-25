import "../css/AuthPage.css";
import React, { useState } from "react";

function AuthPage({ setIsLoggedIn }){
  const [isLoginDisplay, setIsLoginDisplay] = useState(true);
  
  const handleDisplay = () => {
    setIsLoginDisplay(!isLoginDisplay);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return(
  <div className="container">
      <div className="form-box">
        {!isLoginDisplay &&
          <form class="register-form">
            <h1>Register</h1>
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button onClick={handleLogin}>create</button>
            <p className="message">Already registered? <a onClick={handleDisplay}>Sign In</a></p>
          </form>
        }
        {isLoginDisplay &&
          <form className="login-form">
            <h1>Login</h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button onClick={handleLogin}>login</button>
            <p className="message">Not registered? <a onClick={handleDisplay}>Create an account</a></p>
          </form>
        }
      </div>
    </div>
  );
}

export default AuthPage;