import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="profcont">
        <img src="https://i.imgur.com/fl9TijM.png" alt=""/>
        <div>
          <h4>Uriel Bitton</h4>
          <h6>App Developer</h6>
          <i className="far fa-angle-right"></i> 
        </div>
      </div> 

      <div className="menu">
        <div className="menuitem">
          <Link to="/"><h6><i class="far fa-home-alt"></i>Overview</h6></Link>
        </div>
        <div className="menuitem">
        <Link to="/"><h6><i class="far fa-project-diagram"></i>Projects</h6></Link>
        </div>
        <div className="menuitem">
        <Link to="/"><h6><i class="far fa-users"></i>Clients</h6></Link>
        </div>
        <div className="menuitem">
        <Link to="/"><h6><i class="far fa-tasks"></i>My Tasks</h6></Link>
        </div>
        <div className="menuitem">
        <Link to="/"><h6><i class="far fa-cog"></i>Settings</h6></Link>
        </div>
      </div>

      <div className="spacer"></div>
      <div>
        <button><i className="far fa-plus"></i>New Project</button>
      </div>

    </div> 
  )
}

export default Sidebar