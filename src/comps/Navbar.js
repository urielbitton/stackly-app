import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs, Switchs} from './Inputs'

function Navbar(props) {

  const [shownew, setShowNew] = useState(false)
  const [darkmode, setDarkmode] = useState(false)

  return (
    <nav>
      <div className="logocont">
        <img src="https://i.imgur.com/wazsi0l.png" alt=""/>
        <h5>Stackly</h5>
      </div>

      <div className="toolbar">
        <div className="newbox boxmenu">
          <i className="far fa-plus"></i>
          <div className="slidemenu"> 
            <Link to="/projects/addproject"><h6><i class="fal fa-project-diagram"></i>Create Project</h6></Link>
            <Link to="/clients/addclient"><h6><i class="fal fa-users"></i>Create Client</h6></Link>
          </div>
        </div>
        <div className="searchbox boxmenu">
          <i className="far fa-search"></i>
          <div className="slidemenu">
            <div className="searchdiv">
              <i class="far fa-search"></i><Inputs />
            </div>
          </div>
        </div> 
        <div className="msgbox boxmenu">
          <i className="far fa-comments-alt"></i>
          <div className="notifcircle">5</div>
          <div className="slidemenu">
            dd
          </div>
        </div>
        <div className="notifbox boxmenu">
        <i className="far fa-bell"></i>
        <div className="notifcircle">13</div>
        <div className="slidemenu">
            dd
          </div>
        </div>
        <div className="optionsbox boxmenu">
          <i className="fas fa-th"></i>
          <div className="slidemenu"> 
            <a href="#"><h6><i class="fas fa-moon"></i>Dark Mode</h6><Switchs onchange={(val) => {props.darkmode(val);setDarkmode(!darkmode)}} checked={darkmode}/></a>
            <Link to="/support"><h6><i class="fas fa-question-circle"></i>Support</h6></Link>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar