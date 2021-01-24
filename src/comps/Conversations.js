import React, {useContext, useEffect, useState, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,NavLink,useHistory } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import {StoreContext} from './StoreContext'
import { setActiveLink } from 'react-scroll/modules/mixins/scroller'

function Conversations(props) {

  const {convinfo, setConvInfo} = useContext(StoreContext) 
  const [userlist, setUserList] = useState([])
  const [convos, setConvos] = useState([])
  const user = firebase.auth().currentUser 
 
  const allconvos = convos && convos.slice(0,props.amount).map(el => {
    if(user) { 
    return <NavLink exact to={`/messages/${el.convoinfo.convoid}`} activeClassName="activeconvo"><div className="notifrow convorow">
      <div className="notifimg" style={{backgroundImage: `url(${el.convoinfo.creatorid===user.uid?el.convoinfo.recipientimg:el.convoinfo.senderimg})`}}></div>  
      <div className="notifcontent msgcontent" onClick={() => openMessage(el)}>
        <h5>{el.convoinfo.creatorid===user.uid?el.convoinfo.recipientname:el.convoinfo.sendername}</h5>
        <h6 style={{color: el.messages[el.messages.length-1].senderid!==user.uid?el.messages[el.messages.length-1].read===false?"var(--color)":"#111":""}}>{el.messages[el.messages.length-1].senderid===user.uid?"You:":""} {shortenMsgs(el.messages[el.messages.length-1].message)}</h6> 
        <small><ElapsedTime providedtime={el.messages[el.messages.length-1].msgdate.toDate()}/></small>
      </div>  
      <div className="msgstatus" style={{background: el.messages[el.messages.length-1].senderid!==user.uid?el.messages[el.messages.length-1].read===false?"var(--color)":"#eee":"#eee"}}></div>
    </div></NavLink>   
    }
  })  

  function openMessage(el) {
    if(convinfo.unreadmsgs > 0) {
      el.messages && el.messages.map(msg => {
        msg.read = true
      })
      db.collection('conversations').doc(el.convoinfo.convoid).update({messages:el.messages})
    }
  }  
  function shortenMsgs(text) {
    if(text.length > 40) {
      let shortname = text.substring(0,40) + "..."
      return shortname
    }
    else {
      return text
    }
  }

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(use => {
      const userlist = use.data()
      setUserList(userlist)  
      db.collection('conversations').onSnapshot(snap => { 
        let convos = [] 
        snap.forEach(doc => {       
          if(userlist.msgids.includes(doc.id)) 
            convos.push(doc.data())
        }) 
        setConvos(convos) 
        let unreadnum = []
        convos.forEach(conv => {
          unreadnum.push(conv.messages.filter((msg) => msg.senderid !== user.uid && msg.read === false).length)
        }) 
        setConvInfo({unreadmsgs: unreadnum.reduce((a,b) => a+b,0)}) 
      }) 
    })
  },[])
  
 
  return (
    allconvos
  )
}

export default Conversations