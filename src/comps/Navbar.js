import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'

function Navbar(props) {

  const [shownew, setShowNew] = useState(false)
  const [darkmode, setDarkmode] = useState(false)
  const [notifs, setNotifs] = useState([])
  const [elapsedTime, setElapsedTime] = useState('')
  const [notifsnum, setNotifsNum] = useState(0)
  const user = firebase.auth().currentUser
  let history = useHistory()

  const recentnotifs = notifs && notifs.slice(0,8).reverse().map(el => {
    return <div className="notifrow" onClick={() => history.push(`/${el.notiflink}`)}>
      <div className="notifimg" style={el.notiftype==="stackly"?{backgroundImage: el.notiftype==="stackly"?"url(https://i.imgur.com/wazsi0l.png)":""}:{background: el.notifcolor, width:"30px",height:"30px"}}>{el.notificon?<i style={{color:"#fff"}} className={"fal "+el.notificon}></i>:""}</div>
      <div className="notifcontent">
        <h5>{el.notifsubject}</h5>
        <h6>{el.notiftext} {el.notiftype==='viewable'?<span>View now.</span>:""}</h6>
        <small><ElapsedTime providedtime={el.notifdate.toDate()}/></small>
      </div>
    </div>  
  })

  useEffect(() => {
    db.collection('notifications').doc(user.uid).onSnapshot(snap => {
      setNotifs(snap.data().notifs)
      setNotifsNum(snap.data().notifsnum)
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
        <div className="notifcircle" style={{display: notifsnum>0?"flex":"none"}}>{notifsnum}</div>
        <div className="slidemenu" onClick={() => db.collection('notifications').doc(user.uid).update({notifsnum: 0})}>
            <div className="slidemenuinner hidescroll">
              {recentnotifs}
            </div>
            <div className="viewallnotifs">
              <h6>View All</h6>
            </div>
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