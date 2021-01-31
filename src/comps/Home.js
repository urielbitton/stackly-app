import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory} from "react-router-dom"
import Calendars from './Calendars'
import Charts from "./Chart"
import {StoreContext} from './StoreContext'
import {db} from './Fire'
import firebase from 'firebase'
import Title from './Title'
import ElapsedTime from './ElapsedTime'

function Home() {

  const [userlist, setUserList] = useState([])
  const [userinfo, setUserInfo] = useState([])
  const [projlist, setProjList] = useState([])
  const [clientlist, setClientList] = useState([])
  const [fullname, setFullName] = useState('')
  const [invites, setInvites] = useState([])
  const [activetasksnum, setActiveTasksNum] = useState([])
  const [newtasks, setNewTasks] = useState([])
  const [activeprojnum, setActiveProjNum] = useState([])
  const [daytime, setDaytime] = useState('')
  const user = firebase.auth().currentUser
  const history = useHistory()
 
  const invitesrow = invites && invites.map(el => {
    return <div className="invitesrow">
      <small><span>{el.projectname}</span></small>
      <small>{el.inviter}</small>
      <div>
        <button onClick={() => acceptInvitation(el)}>Accept</button>
        <button onClick={() => rejectInvitation(el)}>Reject</button>
      </div>
    </div>
  }) 
  const recentprojects = projlist && projlist.map(el => {
    return <div className="hometaskrow">
      <h6>{el.name}</h6>
      <h6>{el.client.clientname}</h6>
      <h6>{el.tasks.length}</h6>
      <h6><ElapsedTime providedtime={el.datecreated.toDate()}/></h6>
      <h6 style={{color: el.active?"var(--color)":"#bbb"}}>{el.active?"Active":"Not Active"}</h6>
      <h6 style={{color: el.active?"var(--color)":"#bbb"}}>{el.progress}%</h6>
      <div className="view"><Link to={`/project/${el.projectid}`}><i className="far fa-angle-right"></i></Link></div>
    </div>
  })

  function acceptInvitation(el) {
    db.collection("users").doc(user.uid).update({
      shareids: firebase.firestore.FieldValue.arrayUnion(el.projectid)
    })
    invites && invites.map(el => {
      if(userlist.shareids.includes(el.projectid)) {
        let invindex = invites.indexOf(el)
        invites.splice(invindex,1)
      }
    })
    db.collection("users").doc(user.uid).update({
      invites
    }) 
  }
  function rejectInvitation(el) {
    invites && invites.map(el => {
      let invindex = invites.indexOf(el)
      invites.splice(invindex,1)
    })
    db.collection("users").doc(user.uid).update({
      invites
    })
  }
 
  useEffect(() => { 
    db.collection('users').doc(user.uid).onSnapshot(use => {
      const userlist = use.data()
      setUserList(userlist)  
      setUserInfo(userlist.userinfo) 
      setFullName(userlist.userinfo.fullname)
      setInvites(userlist.invites)
      let projRef = db.collection('projects')
      let recentProjRef = db.collection('projects').orderBy('datecreated','desc').limit(3)
      projRef.onSnapshot(snap => {
        let projects = [] 
        let newtasksarr = []
        let activetasksarr = []
        let activeprojs = []
        snap.forEach(doc => {       
          if(userlist.shareids.includes(doc.data().projectid)) 
            projects.push(doc.data())
        })
        projects.forEach(el => {
          if(el.active) {
            el.tasks.forEach(el2 => { 
              activetasksarr.push(el2.taskid)
            }) 
          }
        })  
        setActiveTasksNum(activetasksarr) 
        projects.forEach(el => {
          el.tasks.forEach(el2 => {
            if(el2.taskstatus !== 'Completed')
              newtasksarr.push(el2.taskid)
          })
        })
        setNewTasks(newtasksarr)
        projects.forEach(el => {
          if(el.active)
            activeprojs.push(el.projectid)
        }) 
        setActiveProjNum(activeprojs)
      }) 
      //limited to 3 projects - use cautiously!
      recentProjRef.onSnapshot(snap => {
        let projects = [] 
        snap.forEach(doc => {       
          if(userlist.shareids.includes(doc.data().projectid)) 
            projects.push(doc.data())
        })
        setProjList(projects)  
      })
    }) 
    let time = new Date().getHours()
    if(time >= 0 && time < 12) 
      setDaytime('Morning') 
    else if(time >= 12 && time <=17)
      setDaytime('Afternoon')
    else  
      setDaytime('Evening') 
  },[]) 
    
  return ( 
    <div className="home apppage">
      <div className="apptitles">
        <div>
          <h5>Overview</h5>
          <h6>An overview of your projects, clients and tasks.</h6>
          
        </div>
        <div className="invitationscont" style={{display: invites.length?"block":"none"}}>
          <h5>Invitations</h5>
          <h6>You have <span>{invites.length}</span> new {invites.length>1?"invitations":"invitation"}</h6>
          <div className="invitewindow">
            <div className="inviteshead"><small>Project</small></div>
            {invitesrow}
          </div>
        </div>
      </div>

      <div className="homegrid">
        <div className="homemain">
          <div className="banner homebanner">
            <div className="bannertext">
              <h4>Good {daytime}, {fullname?fullname.split(' ')[0]:""}</h4>
              <h6>Check your recent notifications and tasks</h6>
              <div className="quicknotifs">
                <small><i className="fal fa-sync-alt"></i>0 New Updates</small>
                <small onClick={() => history.push('/tasks')}><i className="fal fa-tasks"></i>{newtasks?newtasks.length:0} New Tasks</small>
              </div>
            </div>
            <img src="https://i.imgur.com/ij6HKa7.png" alt=""/>
          </div>
          <div className="dashgraph dashbox">
            <Charts type="bar-chart" /> 
          </div>
          <div className="dashbox hometasksbox">
            <h5>Recent Active Projects</h5>
            <small onClick={() => history.push('/projects')}>more<i className="fal fa-long-arrow-right"></i></small>
            <div className="hometaskhead">
              <h6>Name</h6>
              <h6>Client</h6> 
              <h6>Tasks</h6>
              <h6>Date Created</h6>
              <h6>Status</h6>
              <h6>Progress</h6>
              <h6></h6>
            </div>
            {recentprojects}
          </div>
        </div>
        <div className="homeside"> 
          <Calendars />
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-rocket-launch"></i>
              <h4>Active Projects<span>{activeprojnum?activeprojnum.length:0}</span></h4>
            </div>
            <div className="view"><Link to="/projects"><i className="far fa-angle-right"></i></Link></div>
          </div>
          <div className="statusbox dashbox"> 
            <div className="iconcont">
              <i className="fal fa-tasks"></i>
              <h4>Active Tasks<span>{activetasksnum && activetasksnum.length}</span></h4>
            </div>
            <div className="view"><Link to="/mytasks"><i className="far fa-angle-right"></i></Link></div>
          </div>
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-user-friends"></i>
              <h4>Active Clients<span>{clientlist.length}</span></h4>
            </div>
            <div className="view"><Link to="/clients"><i className="far fa-angle-right"></i></Link></div>
          </div> 
          <div className="updatesbox dashbox">
            <h5>Updates</h5>
            
          </div>
        </div>
      </div>

       <Title title="Home | Stackly App - Realtime client & contractor collaboration platform"/>
    </div>
  )
}

export default Home