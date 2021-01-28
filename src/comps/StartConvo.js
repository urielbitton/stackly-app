import {db} from './Fire'
import firebase from 'firebase'

export function StartConvo(recipientid, message, convoid) {

  const user = firebase.auth().currentUser
  
  let convoinfo = {
    convoid,
    creatorid: user.uid,
    recipientid,
    typerid: user.uid,
    userref: db.collection('users').doc(recipientid),
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
  db.collection('users').doc(user.uid).update({
    msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
    msgpersonids: firebase.firestore.FieldValue.arrayUnion(recipientid)
  }) 
  db.collection('users').doc(recipientid).update({
    msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
    msgpersonids: firebase.firestore.FieldValue.arrayUnion(user.uid)
  })  
  db.collection('conversations').doc(convoid).set({
    convoinfo,
    messages: firebase.firestore.FieldValue.arrayUnion(messages) 
  }) 
                        
  
}
