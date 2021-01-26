import React, {useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'
import firebase from 'firebase'

function Login(props) {

  const {name, setName, email, setEmail, entercode, setEnterCode, sharecode, setShareCode, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props
  const passRef = useRef()
  const logRef = useRef()
  const regRef = useRef()

  function pressEnter(e) {
    if(e.keyCode === 13) { 
      e.preventDefault()
      hasAccount?handleLogin():handleSignup()
    } 
  }

  return (  
    <div className="loginpage">  
      <div className="logincover">
        <div className="loginbgcover"></div>
        <div className="logincoverinner"></div>
        <h3>Work intelligently with <br/><span>Stackly</span></h3>
        <h6>Create an account to get started.</h6>
        <div className="spacer"></div>
        <div className="loginbtndiv">
          <button className="fblogin"><i className="fab fa-facebook-f"></i>Login with facebook</button>
          <button className="glogin"><i className="fab fa-google"></i>Login with Google</button>
        </div>
      </div> 
      <div className="logincont"> 
        <div className="spacerl"></div>
        <h3 className="logocont"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><span>stackly</span></h3>
        <i className="fas fa-user-alt mainlogicon"></i>
        <h3>{hasAccount?"Login":"Register"}</h3> 
        <form onSubmit={(e) => e.preventDefault()}>  
          { 
            !hasAccount?<label><Inputs title="Full Name" placeholder="John Hopley" autofocus="true" required="true" value={name} onChange={(e) => setName(e.target.value)} /></label>:""
          }
          <label><Inputs title="Email" placeholder="jhopley@stackly.com" required="true" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <p className="errormsg">{emailError}</p>
          <label><Inputs onKeyUp={(e) => pressEnter(e)} title="Password" placeholder="Password" type="password" required="true" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
          <p className="errormsg">{passwordError}</p>
          <small style={{marginBottom: entercode?"10px":""}} className="entercode" onClick={() => setEnterCode(!entercode)}>Enter an invitation code<i class="fal fa-angle-down" style={{transform: entercode?"rotate(0)":"rotate(-90deg)"}}></i></small>
          <div className="invitecodecont" style={{height: entercode?"60px":"0"}}>
          {
            entercode?
            <Inputs title="Invitation Code" value={sharecode} onChange={(e) => setShareCode(e.target.value)}/>:""
          }
          </div> 
        </form>  
        {hasAccount?
        <><button ref={logRef} onClick={handleLogin}>Log in</button><small>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Create Account</span></small></>
        :<><button ref={regRef} onClick={handleSignup}>Register</button><small>Already have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></small></>}
      </div>
    </div>  
  )
}

export default Login 