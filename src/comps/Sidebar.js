import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, NavLink, useHistory } from "react-router-dom"
import firebase from 'firebase'
import {db} from './Fire'

function Sidebar(props) {

  const [slideprof, setSlideProf] = useState(false)
  const [userlist, setUserList] = useState([])
  const [userinfo, setUserInfo] = useState([])
  const [profimg, setProfImg] = useState('')
  const [pinnedprojlist, setPinnedProjList] = useState([])
  const [pinshow, setPinShow] = useState(false)
  const user = firebase.auth().currentUser
  const history = useHistory()

  const pinnedprojects = pinnedprojlist && pinnedprojlist.map(el => {
    return <div className="pinnedprojectdiv" onClick={() => history.replace(`/project/${el.projectid}`)}>
      <h6><i className={`fal ${el.icon}`}></i>{el.name}</h6>
      <small>{el.tasks && el.tasks.length} {el.tasks.length>1?"tasks":"task"}</small>
    </div>
  })

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(doc => {
      const userlist = doc.data()
      setUserList(userlist)
      setUserInfo(userlist.userinfo) 
      setProfImg(userlist.userinfo.profimg)
      db.collection('projects').onSnapshot(snap => {
        let projects = [] 
        snap.forEach(doc => {       
          if(userlist.shareids.includes(doc.data().projectid) && doc.data().pinned) 
            projects.push(doc.data())
        })
        setPinnedProjList(projects)    
      })
    })  
  },[]) 

  return (
    <div className="sidebar hidescroll">
      <div className="sidebarbg"></div>
      <div className="sidetogglecont" onClick={() => props.foldsidebar()}>
        <hr/><hr/><hr/>
      </div>
      <div className="profcont" style={{minHeight: slideprof?"235px":""}}>
      <img src={profimg.length?profimg:"https://i.imgur.com/yxij2KH.jpg"} alt=""/>
        <div onClick={() => setSlideProf(!slideprof)} className="mainprof">
          <h4>{userinfo.fullname?userinfo.fullname:""}</h4>
          <h6 style={{display: userinfo.jobtitle && userinfo.jobtitle.length?"block":"none"}}>{userinfo.jobtitle}</h6>
          <i className="far fa-angle-right" style={{transform: slideprof?"rotate(90deg)":"rotate(0deg)"}}></i> 
        </div>
        <div className="accountlinks">
          <Link to="/profile"><h6><i className="fal fa-user"></i><span>Profile</span></h6></Link>
          <Link to="" onClick={props.handleLogout}><h6><i className="fal fa-sign-out-alt"></i><span>Log Out</span></h6></Link>
          <Link to="/helpcenter"><h6><i className="fal fa-question-circle"></i><span>Help Center</span></h6></Link>
        </div>
      </div> 

      <div className="menu">
          <NavLink exact to="/" activeClassName="activelink"><h6><i className="fal fa-home-alt"></i><span>Overview</span></h6></NavLink>
          <NavLink to="/projects" activeClassName="activelink"><h6><i className="fal fa-project-diagram"></i><span>Projects</span></h6></NavLink>
          <NavLink to="/clients" activeClassName="activelink"><h6><i className="fal fa-users"></i><span>Clients</span></h6></NavLink>
          <NavLink to="/mytasks" activeClassName="activelink"><h6><i className="fal fa-tasks"></i><span>My Tasks</span></h6></NavLink>
          <NavLink to="/messages" activeClassName="activelink"><h6><i class="fal fa-comments"></i><span>Messages</span></h6></NavLink>
          <NavLink to="/settings" activeClassName="activelink"><h6><i className="fal fa-cog"></i><span>Settings</span></h6></NavLink>
      </div>
      <div className="quickprojects">
        <div>
          <span onClick={() => setPinShow(!pinshow)}>Pinned Projects ({pinnedprojlist.length})<i className="far fa-angle-down" style={{transform: pinshow?"":"rotate(-90deg)"}}></i></span>
          <div className="pinprojectscont" style={{maxHeight: pinshow?"300px":"0"}}>
            {pinnedprojects}
          </div>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="blobcont">
        <i className="fal fa-sparkles spark1"></i>
        <i className="fal fa-sparkles spark2"></i>
        <i className="fal fa-sparkles spark3"></i>
        <img src="https://i.imgur.com/v2a6jdZ.png" alt=""/>
        <h6>Get your projects done lightning fast with our mobile app, coming soon.</h6>
      </div>
      <div className="spacer"></div>
      <div className="creditsdiv">
        <img src="https://i.imgur.com/QqxwU57.png" alt="" />
        <small>Powered By Metatask</small>
      </div>
      <div className="spacer"></div>
    </div> 
  )
}

export default Sidebar