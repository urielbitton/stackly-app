import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'

function Navbar(props) {

  const [shownew, setShowNew] = useState(false)
  const [darkmode, setDarkmode] = useState(false)
  const [notifs, setNotifs] = useState([])
  const [elapsedTime, setElapsedTime] = useState('')
  const user = firebase.auth().currentUser

  const recentnotifs = notifs && notifs.slice(0,5).reverse().map(el => {
    return <div className="notifrow">
      <div className="notifimg" style={{backgroundImage: el.notiffrom==="Stackly Platform"?"url(https://i.imgur.com/wazsi0l.png)":""}}></div>
      <div className="notifcontent">
        <h5>{el.notiffrom}</h5>
        <h6>{el.notiftext}</h6>
        <small><ElapsedTime providedtime={el.notifdate.toDate()}/></small>
      </div>
    </div>
  })


  useEffect(() => {
    db.collection('notifications').doc(user.uid).onSnapshot(snap => {
      setNotifs(snap.data().notifs)
    })    
  },[])

  return (
    <nav>
      <div className="logocont">
        <img src="https://i.imgur.com/wazsi0l.png" alt=""/>
        <h5>Stackly</h5>
      </div>

      <div className="toolbar">
        <div className="newbox boxmenu">
          <i className="far fa-plus"></i>
          <div className="slidemenu"> 
            <Link to="/projects/"><h6><i className="fal fa-project-diagram"></i>Create Project</h6></Link>
            <Link to="/clients/"><h6><i className="fal fa-users"></i>Create Client</h6></Link>
          </div>
        </div>
        <div className="searchbox boxmenu">
          <i className="far fa-search"></i>
          <div className="slidemenu">
            <div className="searchdiv">
              <i className="far fa-search"></i><Inputs placeholder="Search..."/>
            </div>
          </div>
        </div> 
        <div className="msgbox boxmenu">
          <i className="far fa-comments-alt"></i>
          <div className="notifcircle">5</div>
          <div className="slidemenu">
            messages 
          </div>
        </div>
        <div className="notifbox boxmenu">
        <i className="far fa-bell"></i>
        <div className="notifcircle">13</div>
        <div className="slidemenu">
            {recentnotifs}
          </div>
        </div>
        <div className="optionsbox boxmenu">
          <i className="fas fa-th"></i>
          <div className="slidemenu"> 
            <a href="#"><h6><i className="fas fa-moon"></i>Dark Mode</h6><Switchs onChange={(val) => {props.darkmode(val);setDarkmode(!darkmode)}} checked={darkmode}/></a>
            <Link to="/support"><h6><i className="fas fa-question-circle"></i>Support</h6></Link>
            <a href="#" onClick={() => props.handleLogout()}><h6><i className="fas fa-sign-out-alt"></i>Logout</h6></a>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar