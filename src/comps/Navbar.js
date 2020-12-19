import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"

function Navbar() {

  const [shownew, setShowNew] = useState(false)

  return (
    <nav>
      <div className="logocont">
        <img src="https://i.imgur.com/wazsi0l.png" alt=""/>
        <h5>Stackly.</h5>
      </div>

      <div className="toolbar">
        <div className="newbox">
          <i className="far fa-plus"></i>
          <div className="newmenu"> 
            <Link to="/addproject"><h6><i class="fal fa-project-diagram"></i>Add Project</h6></Link>
            <Link to="/addclient"><h6><i class="fal fa-users"></i>Add Client</h6></Link>
          </div>
        </div>
        <div className="searchbox">
          <i className="far fa-search"></i>
        </div>
        <div className="msgbox">
          <i className="far fa-comments-alt"></i>
          <div className="notifcircle">5</div>
        </div>
        <div className="notifbox">
        <i className="far fa-bell"></i>
        <div className="notifcircle">13</div>
        </div>
        <div className="optionsbox">
          <i className="fas fa-th"></i>
        </div>
      </div>

    </nav>
  )
}

export default Navbar