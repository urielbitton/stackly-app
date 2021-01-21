import React, {useEffect, useState} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'

function Dialogue(props) {

  const {messages} = props.diag
  const {convoid, creatorid, recipientimg, recipientname, senderimg, sendername} = props.diag.convoinfo
  const user = firebase.auth().currentUser  

  const allmsgs = messages && messages.map(msg => {
    return <div className="msgbubblecont" style={{flexDirection: msg.senderid===user.uid?"row-reverse":"row"}}>
      <img src={msg.senderid===user.uid?senderimg:recipientimg} alt=""/>
      <div className="msgbubble" style={{background: msg.senderid===user.uid?"var(--color)":"#f1f1f1"}}>
        <p style={{color: msg.senderid===user.uid?"#fff":"#111"}}>{msg.message}</p>
        <small style={msg.senderid===user.uid?{right:"0"}:{left:"0"}}><ElapsedTime providedtime={msg.msgdate.toDate()}/></small>
      </div>
    </div>
  })
 
  return (
    <div className="dialoguecont hidescroll">
      <div className="convohead"></div>
      {allmsgs}
    </div>
  )
}

export default Dialogue