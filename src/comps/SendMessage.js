import {db} from './Fire'
import firebase from 'firebase'

export function sendMessage(recipient, message) {
  const user = firebase.auth().currentUser
  let msgObj = { 
    msgid: db.collection("messages").doc().id,
    message: message,
    msgdate: firebase.firestore.Timestamp.now(),
    sender: user.uid
  }
  db.collection('messages').doc(db.collection("messages").doc().id).update({
    msgs: firebase.firestore.FieldValue.arrayUnion(msgObj)
  })
}
