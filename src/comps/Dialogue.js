import React, {useEffect, useState, useRef} from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'

function Dialogue(props) {

  const [msgstring, setMsgString] = useState('')
  const [updateelapsed, setUpdateElapsed] = useState(0)
  const [typing, setTyping] = useState(false)
  const [realtyping, setRealTyping] = useState(false)
  const [typerid, setTyperId] = useState('')
  const [activeStatus, setActiveStatus] = useState(false)
  const [myActiveStatus, setMyActiveStatus] = useState(false)
  const [recipname, setRecipName] = useState('')
  const [recipimg, setRecipImg] = useState('')
  const [recipcity, setRecipCity] = useState('')
  const [recipcountry, setRecipCountry] = useState('')
  const [userimg, setUserImg] = useState('')
  const [username, setUserName] = useState('')
  const [usercity, setUserCity] = useState('')
  const [usercountry, setUserCountry] = useState('')
  const {messages} = props.diag
  const {convoid, creatorid, recipientid, userref} = props.diag.convoinfo
  const user = firebase.auth().currentUser  
  const typerRef = useRef()
  
  const allmsgs = messages && messages.slice(0).reverse().map(msg => {
    return <div className="msgbubblecont" style={{flexDirection: msg.senderid===user.uid?"row-reverse":"row"}}>
      <div className="msgimg" style={{backgroundImage: `url(${msg.senderid===creatorid?recipimg:userimg})`}}></div>
      <div className="msgbubble" style={{background: msg.senderid===user.uid?"var(--color)":"#f1f1f1"}}>
        <p style={{color: msg.senderid===user.uid?"#fff":"#111"}}>{msg.message}</p>
        <small style={msg.senderid===user.uid?{right:"0"}:{left:"0"}}><ElapsedTime providedtime={msg.msgdate.toDate()} updateelapsed={updateelapsed} /></small>
      </div>  
    </div>
  })
  function sendMessage() { 
    if(msgstring.replace(/\s/g, '').length) {
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
      setMsgString('')
      typerRef.current.setAttribute('style', 'height: 50px')
    }
  }
  function triggerSend(e) {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  function formatTextarea() {
    let typer = typerRef.current
    if(msgstring.replace(/\s/g, '').length) {
      typer.setAttribute('style', 'height:' + (typer.scrollHeight) + 'px;')
      typer.style.height = (this.scrollHeight) + 'px' 
    }  
    setTyping(true)
    //showTypingAnim()
  }
  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>'
    })
  }
  function showTypingAnim() {
    setTyperId(user.uid)
    let infoObj = {
      convoid, 
      creatorid, 
      recipientid, 
      usertyping: typing,
      userref: db.collection('users').doc(creatorid),
      typerid  
    }  
    db.collection("conversations").doc(convoid).update({
      convoinfo: infoObj 
    }).then(() => {
      db.collection("conversations").doc(convoid).onSnapshot(snap => {
        setTyperId(snap.data().convoinfo.typerid) 
        setRealTyping(snap.data().convoinfo.usertyping)
      })  
    }) 
  }
  
  useEffect(() => {
    let timer = setInterval(() => {
      setUpdateElapsed(prev => prev+1)
    },30000)
    return() => {
      clearInterval(timer) 
    }
  },[])
  useEffect(() => {
    let timer = setInterval(() => {
      setTyping(false)
    }, 4000)
    //showTypingAnim()
    return() => {
      clearInterval(timer)  
    }
  },[typing])  
  useEffect(() => {
    db.collection('users').doc(creatorid).onSnapshot(snap => {
      const user = snap.data() 
      setRecipName(user.userinfo.fullname)
      setRecipImg(user.userinfo.profimg) 
      setRecipCity(user.userinfo.city)
      setRecipCountry(user.userinfo.country)
      setActiveStatus(user.activestatus) 
    }) 
    db.collection('users').doc(recipientid).onSnapshot(snap => {
      const user = snap.data()
      setUserImg(user.userinfo.profimg)
      setUserName(user.userinfo.fullname)
      setMyActiveStatus(user.activestatus) 
      setUserCity(user.userinfo.city)
      setUserCountry(user.userinfo.country)
    })
  },[])

  const typingstyles = {
    backgroundColor: "#888"
  }

  return (
    <div className="dialoguecont hidescroll"> 
      <div className="convohead">
        <div>
          <div className="dialogheadimg" style={{backgroundImage: `url(${creatorid===user.uid?userimg:recipimg})`}}></div>
          <h5>
            {creatorid===user.uid?username:recipname}
            <small style={{display: creatorid===user.uid?myActiveStatus?"block":"none":activeStatus?"block":"none"}}>Active Now</small>
          </h5>
        </div>
        <div>
          <div className="icondiv"><i className="fas fa-user-alt"></i></div>
          <div className="icondiv"><i className="fas fa-info-circle"></i></div>
        </div>
      </div>
      <div className="convowindowinner hidescroll" id="convowindowinner">
        {allmsgs}
        <div className="chatprofilecont">
          <div className="chatprofileimg" style={{backgroundImage: `url(${creatorid===user.uid?userimg:recipimg})`}}></div>
          <h5>{creatorid===user.uid?username:recipname}</h5>
          <h6>{creatorid===user.uid?usercity:recipcity}, {creatorid===user.uid?usercountry:recipcountry}</h6>
        </div> 
        <div className="msgbubblecont" style={{flexDirection: "row", display: realtyping?typerid!==user.uid?"flex":"none":"none"}}>
          <div className="msgbubble typingbubble">
            <p class="typing-indicator"><span style={typingstyles}></span><span style={typingstyles}></span><span style={typingstyles}></span></p>
          </div>
        </div>  
        <div className="spacer"></div>
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