import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import ElapsedTime from './ElapsedTime'
import firebase from 'firebase'
import {db} from './Fire'

function Notifications(props) {

  const [notifs, setNotifs] = useState([])
  const [notifsnum, setNotifsNum] = useState(0)
  const user = firebase.auth().currentUser
  let history = useHistory()
 
  const allnotifs = notifs && notifs.slice(0,props.amount).map(el => {
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
      setNotifs(snap.data().notifs.reverse())
      setNotifsNum(snap.data().notifsnum)
    })       
  },[])

  return (
      allnotifs
  )
}

export default Notifications