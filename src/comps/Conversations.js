import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,useHistory, Redirect } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'
import {StoreContext} from './StoreContext'

function Conversations(props) {

  const {setConvInfo} = useContext(StoreContext) 
  const [userlist, setUserList] = useState([])
  const [msgs, setMsgs] = useState([])
  const [convosnum, setConvosNum] = useState('')
  const [convos, setConvos] = useState([])
  const user = firebase.auth().currentUser
  let history = useHistory()

  const allconvos = convos && convos.slice(0,props.amount).map(el => {
    return <div className="notifrow convorow">
      <div className="notifimg" style={{backgroundImage: `url(${el.convoinfo.creatorid===user.uid?el.convoinfo.recipientimg:el.convoinfo.senderimg})`}}></div> 
      <div className="notifcontent" onClick={() => openMessage(el)}>
        <h5>{el.convoinfo.creatorid===user.uid?el.convoinfo.recipientname:el.convoinfo.sendername}</h5>
        <h6>{el.messages[0].message}</h6> 
        <small><ElapsedTime providedtime={el.messages[0].msgdate.toDate()}/></small>
      </div>
    </div>   
  })  

  function openMessage(el) {
    el.messages && el.messages.map(msg => {
      msg.read = true
    })
    db.collection('conversations').doc(el.convoinfo.convoid).update({messages:el.messages})
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