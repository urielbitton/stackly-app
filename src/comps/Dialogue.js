import React, {useEffect, useState, useRef} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import { Inputs } from './Inputs'
import { animateScroll } from "react-scroll";

function Dialogue(props) {

  const [msgstring, setMsgString] = useState('')
  const {messages} = props.diag
  const {convoid, creatorid, recipientimg, recipientname, senderimg, sendername} = props.diag.convoinfo
  const user = firebase.auth().currentUser  
  const typerRef = useRef()

  const allmsgs = messages && messages.map(msg => {
    return <div className="msgbubblecont" style={{flexDirection: msg.senderid===user.uid?"row-reverse":"row"}}>
      <img src={msg.senderid===user.uid?senderimg:recipientimg} alt=""/>
      <div className="msgbubble" style={{background: msg.senderid===user.uid?"var(--color)":"#f1f1f1"}}>
        <p style={{color: msg.senderid===user.uid?"#fff":"#111"}}>{msg.message}</p>
        <small style={msg.senderid===user.uid?{right:"0"}:{left:"0"}}><ElapsedTime providedtime={msg.msgdate.toDate()}/></small>
      </div> 
    </div>
  })
  function sendMessage() {
    msgstring.trim()
    if(msgstring.length > 0 && msgstring!=='') {
      let msgobject = {
        message: msgstring,
        msgdate: firebase.firestore.Timestamp.now(),
        msgid: db.collection("conversations").doc().id,
        read: false,
        senderid: user.uid
      }
      db.collection("conversations").doc(convoid).update({
        messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
      })
      animateScroll.scrollToBottom({
        containerId: "convowindowinner",
        duration: 200,
        offset: 1000
      })
      setMsgString('')
    }
  }
  function triggerSend(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
      sendMessage()
    }
  }
  function formatTextarea() {
    const typer = typerRef.current
    if(typer.value.length) {
      typer.setAttribute('style', 'height:' + (typer.scrollHeight) + 'px;')
      typer.addEventListener("input", OnInput, false) 
      function OnInput() { 
        //this.style.height = 'auto'  
        this.style.height = (this.scrollHeight) + 'px'
      }
    }  
    else {
      typer.setAttribute('style', 'height: 50px')
    }
  }
  
  useEffect(() => {
    /*tinymce.init({
      selector: "#mytextarea",
      menubar: false,
      branding: false,
      height: 100,
      autoresize_bottom_margin: 0,
      plugins: 'autoresize emoticons',
      toolbar: 'emoticons'
    })*/
    animateScroll.scrollToBottom({
      containerId: "convowindowinner",
      duration: 0,
    })
  },[])
 
  return (
    <div className="dialoguecont hidescroll">
      <div className="convohead"></div>
      <div className="convowindowinner hidescroll" id="convowindowinner">
        {allmsgs}
      </div>
      
      <div className="typercont">
        <div className="typerdiv"> 
            <div className="typeractions">
              <i className="far fa-paperclip"></i>
              <i className="far fa-images"></i>
              <div className="textareacont">
                <textarea onKeyUp={(e) => triggerSend(e)} ref={typerRef} className="convotyperinput hidescroll" value={msgstring} onChange={(e) => {setMsgString(e.target.value);formatTextarea()}}/>
                <i style={{display:"none"}} className="inpemojipicker far fa-smile-beam"></i>
              </div>
            </div>
            <div className="typersendcont" onClick={() => sendMessage()}><i className="fas fa-paper-plane"></i></div>
        </div>
      </div>
    </div>
  )
}

export default Dialogue