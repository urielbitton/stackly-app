import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import {Inputs} from './Inputs'
import { StartConvo } from './StartConvo'
import {db} from './Fire'
import firebase from 'firebase'

function UserOpts(props) {

  const {id, name} = props
  const [showinput, setShowInput] = useState(false)
  const [message, setMessage] = useState('')
  const [msgPersonIds, setMsgPersonIds] = useState([])
  let history = useHistory()
  let convoid = db.collection("conversations").doc().id
  const user = firebase.auth().currentUser

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(use => {
      setMsgPersonIds(use.data().msgpersonids) 
    }) 
  },[])

  return ( 
    <div className="useroptscont" style={{right: props.right, left: props.left}}>
      <div>
        <div className="pimg">{props.name?props.name.split(' ')[0][0]:""}{props.name?props.name.split(' ')[1][0]:""}</div>
        <h5><div style={{display: props.activestatus?"block":"none"}} className="activestatuscircle"></div>{props.name}</h5> 
      </div>
      <div>
        <div style={{display: msgPersonIds.includes(id)?"none":"block"}}>
          <small style={{color: showinput?"var(--color)":""}} onClick={() => setShowInput(!showinput)}><i className="fal fa-paper-plane"></i>{showinput?"Cancel":"Send Message"}</small>
          <div className="form" style={{display: showinput?"flex":"none"}}>
            <Inputs onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Write a message..."/>
            <span onClick={message.length?!msgPersonIds.includes(id)?() => {StartConvo(id, message, convoid);history.replace(`/messages/${convoid}`)}:null:null}>Send</span>
          </div>
        </div>
        <small><i className="fal fa-user-plus"></i>Add Contact</small>
        <small><i className="fal fa-project-diagram"></i>Invite to Project</small>
      </div>
      <button className="viewprofbtn">View Profile</button>
    </div>
  )
}

export default UserOpts