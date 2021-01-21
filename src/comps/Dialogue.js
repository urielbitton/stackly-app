import React, {useEffect, useState, useRef} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import { Inputs } from './Inputs'
import tinymce from 'tinymce'

function Dialogue(props) {

  const [showpicker, setShowPicker] = useState(false)
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
    typerRef.current.value = ''
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
  tinymce.init({
    selector: "#mytextarea",
    menubar: false,
    branding: false,
    height: 100,
    plugins: 'emoticons image',
    toolbar: 'emoticons image'
  });  
 
  return (
    <div className="dialoguecont hidescroll">
      <div className="convohead"></div>
      {allmsgs}
      
      <div className="typercont">
        <div className="typerdiv"> 
            <div className="typeractions">
              <i className="far fa-paperclip"></i>
              <i className="far fa-images"></i>
              <div className="textareacont">
                <textarea ref={typerRef} className="convotyperinput" value={msgstring} onChange={(e) => {setMsgString(e.target.value);formatTextarea()}}/>
                <i style={{color: showpicker?"var(--color)":"#aaa"}} className="inpemojipicker far fa-smile-beam" onClick={() => setShowPicker(!showpicker)}></i>
                <div className="emojipickercont" style={{display: showpicker?"block":"none"}}>
                  
                </div>
              </div>
            </div>
            <div className="typersendcont" onClick={() => sendMessage()}><i className="fas fa-paper-plane"></i></div>
        </div>
      </div>
    </div>
  )
}

export default Dialogue