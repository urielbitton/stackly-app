import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import Conversations from './Conversations'
import Dialogue from './Dialogue'
import {Inputs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'

function ConvoPage(props) {

  const [convolist, setConvoList] = useState([])
  const [userlist, setUserList] = useState([])
  const user = firebase.auth().currentUser

  const onedialogue = convolist && convolist.map(diag => {
    return <Route exact path={`/messages/${diag.convoinfo.convoid}`}> 
      <Dialogue diag={diag} key={diag.id} />
    </Route>
  }) 

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
        setConvoList(convos)
      }) 
    })
  },[])

  return (
    <div className="convopage apppage">
      <div className="convosgrid">
        <div className="sidebarconvos">
          <div className="sidebarconvoshead">
            <div>
              <h3>Messages</h3>
              <i class="fal fa-cog"></i>
            </div>
            <div>
              <Inputs placeholder="Find a conversation" iconclass="fal fa-search" />
            </div>
          </div>
          <Conversations amount={8} /> 
        </div>
        <div className="convoscontent">
          <div className="convowindow">
              {onedialogue}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConvoPage