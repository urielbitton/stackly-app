import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,NavLink,useHistory } from "react-router-dom"
import ElapsedTime from './ElapsedTime'
import firebase from 'firebase'
import {db} from './Fire'
import {StoreContext} from './StoreContext'

function ConvoCard(props) {

  const {convinfo, setConvInfo} = useContext(StoreContext) 
  const [recipname, setRecipName] = useState('')
  const [recipimg, setRecipImg] = useState('')
  const [activestatus, setActiveStatus] = useState(false)
  const [myActiveStatus, setMyActiveStatus] = useState(false)
  const [sendername, setSenderName] = useState('')
  const [senderimg, setSenderImg] = useState('')
  const {el} = props
  const user = firebase.auth().currentUser

  function shortenMsgs(text) {
    if(text.length > 40) {
      let shortname = text.substring(0,40) + "..."
      return shortname
    }
    else {
      return text
    }
  }
  function openMessage(el) {
    if(convinfo.unreadmsgs > 0) {
      el.messages && el.messages.map(msg => {
        msg.read = true
      })
      db.collection('conversations').doc(el.convoinfo.convoid).update({messages:el.messages})
    }
  } 

  useEffect(() => {
    db.collection('users').doc(el.convoinfo.recipientid).onSnapshot(snap => {
      const user = snap.data()
      setRecipName(user.userinfo.fullname)
      setRecipImg(user.userinfo.profimg)
      setActiveStatus(user.activestatus)
    })
    db.collection('users').doc(el.convoinfo.creatorid).onSnapshot(snap => {
      const user = snap.data()
      setSenderName(user.userinfo.fullname)
      setSenderImg(user.userinfo.profimg)
      setMyActiveStatus(user.activestatus)
    })
  })

  return ( 
    user?<NavLink exact to={`/messages/${el.convoinfo.convoid}`} activeClassName="activeconvo"><div className="notifrow convorow">
      <div className="notifimg" style={{backgroundImage: `url(${el.convoinfo.creatorid===user.uid?recipimg:senderimg})`}}></div>  
      <div className="notifcontent msgcontent" onClick={() => openMessage(el)}>
        <h5>{el.convoinfo.creatorid===user.uid?recipname:sendername}<div style={{display: el.convoinfo.creatorid===user.uid?activestatus?"block":"none":myActiveStatus?"block":"none"}} className="activestatuscircle"></div></h5>
        <h6 style={{color: el.messages[el.messages.length-1].senderid!==user.uid?el.messages[el.messages.length-1].read===false?"var(--color)":"#111":""}}>{el.messages[el.messages.length-1].senderid===user.uid?"You:":""} {shortenMsgs(el.messages[el.messages.length-1].message)}</h6> 
        <small><ElapsedTime providedtime={el.messages[el.messages.length-1].msgdate.toDate()}/></small>
      </div>  
      <div className="msgstatus" style={{background: el.messages[el.messages.length-1].senderid!==user.uid?el.messages[el.messages.length-1].read===false?"var(--color)":"#eee":"#eee"}}></div>
    </div></NavLink>:""
  )
}

export default ConvoCard