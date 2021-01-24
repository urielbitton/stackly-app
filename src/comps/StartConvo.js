import {db} from './Fire'
import firebase from 'firebase'

export function StartConvo(recipientid, recipientname, message, convoid) {

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
    msgids: firebase.firestore.FieldValue.arrayUnion(convoid)
  }) 
  db.collection('users').doc(recipientid).update({
    msgids: firebase.firestore.FieldValue.arrayUnion(convoid)
  })  
  db.collection('conversations').doc(convoid).set({
    convoinfo,
    messages: firebase.firestore.FieldValue.arrayUnion(messages) 
  }) 
                        
  
}
