import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,useHistory, Redirect } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'
import ElapsedTime from './ElapsedTime'

function Messages(props) {

  const [userlist, setUserList] = useState([])
  const [msgs, setMsgs] = useState([])
  const [msgsnum, setMsgsNum] = useState('')
  const user = firebase.auth().currentUser
  let history = useHistory()

  const allmsgs = msgs && msgs.slice(0,props.amount).map(el => {
    return <div className="notifrow">
      <div className="notifimg"></div> 
      <div className="notifcontent">
        <h5>{el.sendername}</h5>
        <h6>{el.message} <small><ElapsedTime providedtime={el.msgdate.toDate()}/></small></h6>
      </div>
    </div>  
  }) 

  /*db.collection('users').doc(user.uid).onSnapshot(use => {
    const userlist = use.data()
    setUserList(userlist)  
    db.collection('messages').onSnapshot(snap => {
      let messages = [] 
      snap.forEach(doc => {       
        if(userlist.msgids.includes(doc.data().id)) 
        messages.push(doc.data())
      })
      setMsgs(messages) 
       
    })   
  })*/
  
 
  return (
    allmsgs
  )
}

export default Messages