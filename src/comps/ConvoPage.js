import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory} from "react-router-dom"
import Conversations from './Conversations'
import Dialogue from './Dialogue'
import {Inputs} from './Inputs'
import firebase from 'firebase'
import {db} from './Fire'
import Title from './Title'
import {StartConvo} from './StartConvo'

function ConvoPage(props) {

  const [convolist, setConvoList] = useState([])
  const [allusers, setAllUsers] = useState([])
  const [showsend, setShowSend] = useState(false)
  const [showuserslimit, setShowUsersLimit] = useState(10)
  const [keyword, setKeyword] = useState('') 
  const [message, setMessage] = useState('')
  const [recipientid, setRecipientId] = useState('')
  const [msgPersonIds, setMsgPersonIds] = useState([])
  const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')
  const user = firebase.auth().currentUser
  let history = useHistory()

  const onedialogue = convolist && convolist.map(diag => { 
    return <Route exact path={`/messages/${diag.convoinfo.convoid}`}> 
      <Dialogue diag={diag} key={diag.id} />
    </Route>
  }) 
  const allusersrow = allusers && allusers.map(el => {
      if(pattern.test(el.userinfo.fullname.toLowerCase()) && el.uid !== user.uid)
      return <div className="allusersrow" style={{opacity:  msgPersonIds && msgPersonIds.includes(el.uid)?"0.3":"1"}}>
        <h5><img src={el.userinfo.profimg} alt=""/>{el.userinfo.fullname}</h5>
        <small onClick={msgPersonIds && msgPersonIds.includes(el.uid)?() => setShowSend(!showsend):() => setRecipientId(el.uid)} className={recipientid===el.uid?"usersrowselected":""}>{recipientid===el.uid?<i className="fal fa-check"></i>:"Select"}</small>
      </div> 
  })
  function sendMessage() {
    if(message.length) {
      setShowSend(!showsend)
      let convoid = db.collection('conversations').doc().id
      StartConvo(recipientid, message, convoid)
      history.replace(`/messages/${convoid}`) 
    }  
    setRecipientId('')
    setMessage('')
  }

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(use => {
      const userlist = use.data() 
      setMsgPersonIds(userlist.msgpersonids)
      db.collection('conversations').onSnapshot(snap => { 
        let convos = [] 
        snap.forEach(doc => {       
          if(userlist.msgids.includes(doc.id)) 
            convos.push(doc.data())
        }) 
        setConvoList(convos)
      }) 
    }) 
    db.collection('users').orderBy('userinfo.fullname','asc').limit(showuserslimit).onSnapshot(snap => {
      const users = []
      snap.forEach(el => {
        users.push(el.data())
      })
      setAllUsers(users)
    })
  },[])

  return (
    <div className="convopage apppage hidescroll">
      <div className="convosgrid">
        <div className="sidebarconvos">
          <div className="sidebarconvoshead">
            <div>
              <h3>Messages</h3>
              <div>
                <i className="fal fa-plus" onClick={() => setShowSend(!showsend)}></i>
                <i className="fal fa-cog"></i>
              </div>
            </div>
            <div>
              <Inputs placeholder="Find a conversation" iconclass="fal fa-search" />
            </div>
          </div>
          <Conversations amount={8}/> 
        </div>
        <div className="convoscontent">
          <div className="convowindow">
              {onedialogue}
          </div>
        </div>
      </div> 
      <div className="addcover" style={{display: showsend?"block":"none"}}></div>
      <div className="startconvocont" style={{visibility: showsend?"visible":"hidden", opacity: showsend?"1":"0"}}>
        <h4>Start a Conversation</h4>
        <i className="fal fa-times" onClick={() => setShowSend(!showsend)}></i>
        <div className="convouserscont hidescroll">
          <Inputs placeholder="Search users..." value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          {allusersrow}
        </div>
        <div className="startconvoinpcont">
          <Inputs placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>

      <Title title="Messages | Stackly App"/>
    </div>
  )
}

export default ConvoPage