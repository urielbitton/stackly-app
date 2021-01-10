import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter as Router,Switch,Route,Link,useHistory, Redirect } from "react-router-dom"
import "./styles.css"
import AppContainer from "./comps/AppContainer"
import Login from "./comps/Login"
import StoreContextProvider from "./comps/StoreContext"
import {db, Fire} from './comps/Fire'
import firebase from 'firebase'
 
function App() {

  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  const [monthrev, setMonthRev] = useState([])
  const [revtotal, setRevTotal] = useState(0)

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
    firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
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
    Fire.auth().onAuthStateChanged(user => {
      if(user) {
        user.updateProfile({
          displayName: name
        })
        const invoices = []
        const estimates = []
        const clients = []
        const updates = []
        const reminders = []
        const trash = []
        const revenues = []
        const userinfo = {
          fullname: name,
          email: user.email,
          phone: "",
          fax: "",
          address: "",
          postal: "",
          city: "",
          provstate: "",
          company: "", 
          jobtitle: "",
          website:  "",
          regnumber: "",
          companylogo: "",
          country: "",
          profimg: "",
          settings: {
            general: {
              darkmode: false,
              widemode: false,
              monthbar: true,
              track_revenue: true,
              track_client_spending: true,
              reminders: true,
              pinned: true,
              goals: 10000,
              email_notifs: true,
              revenue_notifs: true,
              show_updates: true,
              enable_goals: true,
            },
            invoices: {
              taxrate1: 0.09975,
              taxrate2: 0.05,
              taxname1: 'TPS',
              taxname2: 'TVQ',
              taxnum1: '', 
              taxnum2: '',
              currency: "CAD",
              show_myname: true,
              show_address: true,
              show_city: true,
              show_postal: true,
              show_phone: true,
              show_fax: true,
              show_country: false,
              show_provstate: false,
              show_logo: true,
              show_company_name: true,
              show_cli_address: true,
              show_cli_city: true,
              show_cli_postal: true,
              show_cli_phone: true,
              show_cli_provstate: true,
              show_cli_country: false,
              show_currency: true,
              show_invdate: true,
              show_invnum: true, 
              show_extraitems: false,
              show_taxes: true,
              enable_taxes: true,
              notes: ''
            },
            theme: {
              maintheme: 'Purple'
            }
          } 
        }//end of userinfo object
        db.collection('users').doc(user.uid).set({
          invoices,
          estimates,
          clients,
          userinfo,
          reminders,
          updates,
          trash,
          revenues,
          uid: user.uid
        })
      }//if (user)
      else {
        setUser('')
      } 
    }) 
  }
  const handleLogout = () => {
    firebase.auth().signOut()
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
          user?<AppContainer handleLogout={handleLogout} name={name} />:
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
        />
        }
        </Router>
      </StoreContextProvider>
    </div> 
  )
}

export default App
