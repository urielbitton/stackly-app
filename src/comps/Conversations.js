import React, {useContext, useEffect, useState, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,useHistory } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import {StoreContext} from './StoreContext'

function Conversations(props) {

  const {convinfo, setConvInfo} = useContext(StoreContext) 
  const [userlist, setUserList] = useState([])
  const [msgs, setMsgs] = useState([])
  const [convos, setConvos] = useState([])
  const user = firebase.auth().currentUser
  let history = useHistory()
  let shorten = useRef()

  const allconvos = convos && convos.slice(0,props.amount).map(el => {
    return <Link exact to={`/messages/${el.convoinfo.convoid}`}><div className="notifrow convorow">
      <div className="notifimg" style={{backgroundImage: `url(${el.convoinfo.creatorid===user.uid?el.convoinfo.recipientimg:el.convoinfo.senderimg})`}}></div> 
      <div className="notifcontent msgcontent" onClick={() => openMessage(el)}>
        <h5>{el.convoinfo.creatorid===user.uid?el.convoinfo.recipientname:el.convoinfo.sendername}</h5>
        <h6 style={{color: el.messages[0].senderid!==user.uid?el.messages[0].read===false?"var(--color)":"#111":""}}>{shortenMsgs(el.messages[0].message)}</h6> 
        <small><ElapsedTime providedtime={el.messages[0].msgdate.toDate()}/></small>
      </div>
      <div className="msgstatus" style={{background: el.messages[0].senderid!==user.uid?el.messages[0].read===false?"var(--color)":"#eee":"#eee"}}></div>
    </div></Link>   
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
    if(text.length > 46) {
      let shortname = text.substring(0,46) + "..."
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