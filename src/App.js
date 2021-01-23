import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter as Router,Switch,Route,Link,useHistory, Redirect } from "react-router-dom"
import "./styles.css"
import AppContainer from "./comps/AppContainer"
import Login from "./comps/Login"
import StoreContextProvider from "./comps/StoreContext"
import {db, Fire} from './comps/Fire'
import firebase from 'firebase'
import {SendNotif} from './comps/SendNotif'
 
function App() {
           
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  const [sharecode, setShareCode] = useState('')
  const [shareids, setShareIds] = useState([])
  const [msgids, setMsgIds] = useState([''])
  const [invites, setInvites] = useState([])
  const [entercode, setEnterCode] = useState(false)

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }
  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }
 
  const handleLogin = () => {
    clearErrors()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/user/disabled":
        case "auth/user-not-found":
          setEmailError(err.message)
        break
        case "auth/wrong-password":
          setPasswordError(err.message)
        break
        default:
      } 
    })
    db.collection('users').doc(user.uid).update({activestatus: true})
  } 
  const handleSignup = () => {
    clearErrors()
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPasswordError(err.message)
        break
        default: 
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        if(!shareids.length) {
          shareids.push(sharecode)
          user.updateProfile({
            displayName: name,
            photoURL: 'https://i.imgur.com/yxij2KH.jpg'
          }) 
          const clients = []
          const updates = []
          const userinfo = {
            fullname: name,
            email: user.email,
            phone: "",
            city: "",
            company: "", 
            jobtitle: "",
            companylogo: "",
            country: "",
            profimg: "",
          }
          const settings = { 
            general: {
              darkmode: false,
              widemode: false,
            },
            projects: {}
          }
          db.collection('users').doc(user.uid).set({
            clients, 
            userinfo,
            updates,
            settings,
            uid: user.uid,
            messengerid: db.collection("conversations").doc().id,
            shareids,
            msgids,
            invites,
            activestatus: true
          })
          SendNotif('Stackly Platform', 
            `Welcome to Stackly App. Go to settings to set up your account information.`,
            `settings`, 
            'View now',
            '#e04f4c',
            'fa-list-ul',
            1
          )  
        }
      }//if (user)
      else {
        setUser('')
      } 
    }) 
  }
  const handleLogout = () => {
    firebase.auth().signOut()
    db.collection('users').doc(user.uid).update({activestatus: false})
  }
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs()
        setUser(user)
      }
      else {
        setUser('')
      }
    })
  }

  useEffect(() => { 
    authListener()
  },[])  

  return (
    <div className="app"> 
      <StoreContextProvider>
        <Router>
        { 
          user?<AppContainer handleLogout={handleLogout} />:
          <Login 
          email={email} 
          name={name}
          setName={setName}
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          handleSignup={handleSignup} 
          hasAccount={hasAccount} 
          setHasAccount={setHasAccount} 
          emailError={emailError}
          passwordError={passwordError}
          entercode={entercode}
          setEnterCode={setEnterCode}
          sharecode={sharecode}
          setShareCode={setShareCode}
        />
        }
        </Router>
      </StoreContextProvider>
    </div> 
  )
}

export default App
