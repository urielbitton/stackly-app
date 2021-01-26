import {db} from './Fire'
import firebase from 'firebase'

export function SendNotif(notifsubject, notiftext, notiflink, notifaction, notifcolor, notificon, notifsnum, clientid) {
  const user = firebase.auth().currentUser
  let notifObj = { 
    notifsubject: notifsubject,
    notifid: db.collection("notifications").doc().id,
    notiftext: notiftext,
    notifdate: firebase.firestore.Timestamp.now(),
    notiflink: notiflink,
    notifaction: notifaction,
    notifcolor: notifcolor,
    notificon: notificon 
  }
  db.collection('notifications').doc(user.uid).update({
    notifs: firebase.firestore.FieldValue.arrayUnion(notifObj),
    notifsnum: notifsnum+1 
  })
  db.collection('notifications').doc(clientid).update({
    notifs: firebase.firestore.FieldValue.arrayUnion(notifObj),
    notifsnum: notifsnum+1 
  }) 
}
