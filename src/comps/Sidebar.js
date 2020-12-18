import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, NavLink } from "react-router-dom"

function Sidebar() {

  const [slideprof, setSlideProf] = useState(false)

  return (
    <div className="sidebar">
      <div className="profcont" style={{height: slideprof?"300px":""}}>
        <img src="https://i.imgur.com/JWVZJyP.jpg" alt=""/>
        <div onClick={() => setSlideProf(prev => !prev)}>
          <h4>Uriel Bitton</h4>
          <h6>App Developer</h6>
          <i className="far fa-angle-right"></i> 
        </div>
      </div> 

      <div className="menu">
          <NavLink exact to="/" activeClassName="activelink"><h6><i class="fal fa-home-alt"></i>Overview</h6></NavLink>
          <NavLink to="/projects" activeClassName="activelink"><h6><i class="fal fa-project-diagram"></i>Projects</h6></NavLink>
          <NavLink to="/clients" activeClassName="activelink"><h6><i class="fal fa-users"></i>Clients</h6></NavLink>
          <NavLink to="/mytasks" activeClassName="activelink"><h6><i class="fal fa-tasks"></i>My Tasks</h6></NavLink>
          <NavLink to="/settings" activeClassName="activelink"><h6><i class="fal fa-cog"></i>Settings</h6></NavLink>
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
        <i class="fal fa-sparkles spark1"></i>
        <i class="fal fa-sparkles spark2"></i>
        <i class="fal fa-sparkles spark3"></i>
        <img src="https://i.imgur.com/8i8FRix.png" alt=""/>
        <h6>Get your projects done lightning fast with our mobile app, coming soon.</h6>
      </div>

    </div> 
  )
}

export default Sidebar