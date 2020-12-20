import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, NavLink } from "react-router-dom"

function Sidebar(props) {

  const [slideprof, setSlideProf] = useState(false)

  return (
    <div className="sidebar">
      <div className="sidebarbg"></div>
      <div className="sidetogglecont" onClick={() => props.foldsidebar()}>
        <hr/><hr/><hr/>
      </div>
      <div className="profcont" style={{minHeight: slideprof?"270px":"150px"}}>
        <img src="https://i.imgur.com/JWVZJyP.jpg" alt=""/>
        <div onClick={() => setSlideProf(!slideprof)} className="mainprof">
          <h4>Uriel Bitton</h4>
          <h6>App Developer</h6>
          <i className="far fa-angle-right" style={{transform: slideprof?"rotate(90deg)":"rotate(0deg)"}}></i> 
        </div>
        <div className="accountlinks">
          <Link to="/profile"><h6><i class="fal fa-user"></i><span>Profile</span></h6></Link>
          <Link to="#"><h6><i class="fal fa-sign-out-alt"></i><span>Log Out</span></h6></Link>
          <Link to="/helpcenter"><h6><i class="fal fa-question-circle"></i><span>Help Center</span></h6></Link>
        </div>
      </div> 

      <div className="menu">
          <NavLink exact to="/" activeClassName="activelink"><h6><i className="fal fa-home-alt"></i><span>Overview</span></h6></NavLink>
          <NavLink to="/projects" activeClassName="activelink"><h6><i className="fal fa-project-diagram"></i><span>Projects</span></h6></NavLink>
          <NavLink to="/clients" activeClassName="activelink"><h6><i className="fal fa-users"></i><span>Clients</span></h6></NavLink>
          <NavLink to="/mytasks" activeClassName="activelink"><h6><i className="fal fa-tasks"></i><span>My Tasks</span></h6></NavLink>
          <NavLink to="/settings" activeClassName="activelink"><h6><i className="fal fa-cog"></i><span>Settings</span></h6></NavLink>
      </div>
      <div className="quickprojects">
        <div>
          <span>Recent Projects</span>
        </div>
        <div>
          <span>Pinned Projects</span>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="blobcont">
        <i className="fal fa-sparkles spark1"></i>
        <i className="fal fa-sparkles spark2"></i>
        <i className="fal fa-sparkles spark3"></i>
        <img src="https://i.imgur.com/8i8FRix.png" alt=""/>
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