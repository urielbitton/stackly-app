import React, {useContext, useEffect, useState, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,NavLink,useHistory } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'
import {StoreContext} from './StoreContext'
import ConvoCard from './ConvoCard'

function Conversations(props) {

  const {convinfo, setConvInfo} = useContext(StoreContext) 
  const [userlist, setUserList] = useState([])
  const [convos, setConvos] = useState([])
  const user = firebase.auth().currentUser    
 
  const allconvos = convos && convos.slice(0,props.amount).map(el => {
    return <ConvoCard el={el}/>   
  })  

  function openMessage(el) {
    if(convinfo.unreadmsgs > 0) {
      el.messages && el.messages.map(msg => {
        msg.read = true
      })
      db.collection('conversations').doc(el.convoinfo.convoid).update({messages:el.messages})
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