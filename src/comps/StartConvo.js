import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import {db} from './Fire'
import firebase from 'firebase'
import { useState } from "react"

export function StartConvo(recipientid, recipientname, message) {

  const user = firebase.auth().currentUser
  let history = useHistory()
  let convoid = db.collection("conversations").doc().id
  
  let convoinfo = {
    convoid,
    creatorid: user.uid,
    recipientimg:"",
    recipientname,
    senderimg: user.photoURL,
    sendername: user.displayName,
    usertyping: false
  }
  let messages = {
    message,
    msgdate: firebase.firestore.Timestamp.now(),
    msgid: db.collection("conversations").doc().id,
    read: false,
    senderid: user.uid,
    sendername: user.displayName
  }
  db.collection('users').where(firebase.firestore.FieldPath.documentId(),'in',[user.uid, recipientid]).update({
    msgids: firebase.firestore.FieldValue.arrayUnion(convoid)
  })  
  db.collection('conversations').doc(convoid).set({
    convoinfo,
    messages: firebase.firestore.FieldValue.arrayUnion(messages) 
  }) 
  history.replace(`/messages/${convoid}`)


  
}
