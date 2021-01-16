import React, {useContext, useEffect, useState} from 'react'
import Calendars from './Calendars'
import Charts from "./Chart"
import {StoreContext} from './StoreContext'
import {db} from './Fire'
import firebase from 'firebase'

function Home() {

  const [userlist, setUserList] = useState([])
  const [userinfo, setUserInfo] = useState([])
  const [projlist, setProjList] = useState([])
  const [clientlist, setClientList] = useState([])
  const [fullname, setFullName] = useState('')
  const activetasks = 0
  const user = firebase.auth().currentUser
 

  useEffect(() => {
    db.collection('users').doc(user.uid).get().then(doc => {
      const userlist = doc.data()
      setUserList(userlist)
      setUserInfo(userlist.userinfo)
      setFullName(userlist.userinfo.fullname)
    })
    db.collection("projects").get().then(snap => {
      let projects = []
      snap.forEach(doc => {
        projects.push(doc.data())
      })
      setProjList(projects)
    }); 
  },[]) 

  return ( 
    <div className="home apppage">
      <div className="apptitles">
        <h5>Overview</h5>
        <h6>An overview of your projects, clients and tasks.</h6>
      </div>

      <div className="homegrid">
        <div className="homemain">
          <div className="banner homebanner">
            <div className="bannertext">
              <h4>Good Morning, {fullname?fullname.split(' ')[0]:""}</h4>
              <h6>Check your recent notifications and tasks</h6>
              <div className="quicknotifs">
                <small><i className="fal fa-bell"></i>3 Notifications</small>
                <small><i className="fal fa-tasks"></i>5 New Tasks</small>
              </div>
            </div>
            <img src="https://i.imgur.com/ij6HKa7.png" alt=""/>
          </div>
          <div className="dashgraph dashbox">
            <Charts type="bar-chart" /> 
          </div>
          <div className="dashbox hometasksbox">
            <h5>Latest Tasks</h5>
            <div className="hometaskhead">
              <h6>Task</h6>
              <h6>Client</h6>
              <h6>Stage</h6>
              <h6>Date</h6>
              <h6>Status</h6>
              <h6>Details</h6>
            </div>
            <div className="hometaskrow">
              <h6>Redesign Website</h6>
              <h6>Cindy Bitton</h6>
              <h6>Development</h6>
              <h6>Jan 09 2021</h6>
              <h6>Not Done</h6>
              <h6><i className="far fa-ellipsis-h"></i></h6>
            </div>
          </div>
        </div>
        <div className="homeside"> 
          <Calendars />
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-rocket-launch"></i>
              <h4>Active Projects<span>{projlist && projlist.length}</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div>
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-tasks"></i>
              <h4>Active Tasks<span>{activetasks}</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div>
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-user-friends"></i>
              <h4>Active Clients<span>{clientlist.length}</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div> 
          <div className="updatesbox dashbox">
            <h5>Updates</h5>
            <hr className="updatebar"/>
            <div className="updateitem">
              <h4><i className="fas fa-circle-notch"></i>Project Web Design is marked complete</h4>
              <div className="view"><i className="far fa-angle-right"></i></div>
            </div>
            <div className="updateitem">
              <h4><i className="fas fa-circle-notch"></i>Marc has sent you a new task</h4>
              <div className="view"><i className="far fa-angle-right"></i></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home