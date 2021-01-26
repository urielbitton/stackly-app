import React, { useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import Settings from './Settings'
import OneProject from './OneProject'
import OneClient from './OneClient'
import {StoreContext} from './StoreContext'
import Notifs from './Notifs'
import firebase from 'firebase'
import {db} from './Fire'
import NotifsPage from './NotifsPage'
import ConvoPage from './ConvoPage'
    
function Homecont(props) {   
  
  const {clients} = useContext(StoreContext)

  const [userlist, setUserList] = useState([]) 
  const [projlist, setProjList] = useState([])  
  const [update, setUpdate] = useState(0)
  const [time, setTime] = useState(3000)
  const [convosnum, setConvosNum] = useState('')
  const user = firebase.auth().currentUser 

  const oneproject = projlist && projlist.map(proj => {
    return <Route path={`/project/${proj.projectid}`}> 
      <OneProject proj={proj} shownotif={(time) => setUpdate(prev => prev+1, setTime(time))} key={proj.id} />
    </Route>
  }) 
  const oneclient = clients && clients.map(cli => {
    return <Route path={`/clients/${cli.id}`}> 
      <OneClient cli={cli} key={cli.id} />
    </Route> 
  })      
 
  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(use => {
      const userlist = use.data()
      setUserList(userlist)  
      db.collection('projects').onSnapshot(snap => {
        let projects = [] 
        snap.forEach(doc => {       
          if(userlist.shareids.includes(doc.data().projectid)) 
            projects.push(doc.data())
        })
        setProjList(projects)   
      })  
    })                   
  },[])

  return ( 
    <div className="homecont">
      <Navbar darkmode={props.darkmode} handleLogout={props.handleLogout} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects"> 
            <Projects shownotif={(time) => setUpdate(prev => prev+1, setTime(time))} />
          </Route>
          <Route path="/clients"> 
            <Clients />
          </Route>
          <Route path="/mytasks"> 
            <MyTasks />
          </Route> 
          <Route path="/settings"> 
            <Settings shownotif={(time) => setUpdate(prev => prev+1, setTime(time))}/>
          </Route>
          <Route path="/notifications"> 
            <NotifsPage amount={Infinity}/>
          </Route>
          <Route path="/messages">
            <ConvoPage convosnum={(val) => setConvosNum(val)}/>
          </Route>
          {oneproject}
          {oneclient}
        </Switch>

        <Notifs update={update} time={time} key="notifs"/>
    </div> 
  )
} 

export default Homecont