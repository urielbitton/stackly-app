import React, {useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs} from './Inputs'

function Login(props) {

  const {name, setName, email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props

  return (  
    <div className="loginpage">  
      <div className="logincover">
        <div className="loginbgcover"></div>
        <div className="logincoverinner"></div>
        <h3>Work intelligently with <br/><span>Stackly</span></h3>
        <h6>Create an account to get started.</h6>
        <div className="spacer"></div>
        <div className="loginbtndiv">
          <button class="fblogin"><i class="fab fa-facebook-f"></i>Login with facebook</button>
          <button class="glogin"><i class="fab fa-google"></i>Login with Google</button>
        </div>
      </div>
      <div className="logincont"> 
        <div className="spacerl"></div>
        <h3 className="logocont"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><span>stackly</span></h3>
        <i class="fas fa-user-alt mainlogicon"></i>
        <h3>{hasAccount?"Login":"Register"}</h3> 
        <form onSubmit={(e) => e.preventDefault()}>  
          { 
            !hasAccount?<label><Inputs title="Full Name" placeholder="John Hopley" autofocus="true" required="true" value={name} onChange={(e) => setName(e.target.value)} /></label>:""
          }
          <label><Inputs title="Email" placeholder="jhopley@stackly.com" required="true" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <p className="errormsg">{emailError}</p>
          <label><Inputs title="Password" placeholder="Password" type="password" required="true" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
          <p className="errormsg">{passwordError}</p>
        </form>  
        {hasAccount?
        <><button onClick={handleLogin}>Log in</button><small>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Create Account</span></small></>
        :<><button onClick={handleSignup}>Register</button><small>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></small></>}
      </div>
    </div> 
  )
}

export default Login 