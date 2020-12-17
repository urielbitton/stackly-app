import React from 'react'
import Calendars from './Calendars'

function Home() {
  return (
    <div className="home apppage">
      <div className="apptitles">
        <h5>Overview</h5>
        <h6>An overview of your projects, clients and tasks.</h6>
      </div>

      <div className="homegrid">
        <div className="banner homebanner">
          <div className="bannertext">
            <h4>Good Morning, Uriel</h4>
            <h6>Check your recent notifications and tasks</h6>
            <div className="quicknotifs">
              <small><i className="fal fa-bell"></i>3 Notifications</small>
              <small><i className="fal fa-tasks"></i>5 Tasks</small>
            </div>
          </div>
          <img src="https://i.imgur.com/iOYuiob.png" alt=""/>
        </div>
        <div className="homeside">
          <Calendars />
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-rocket-launch"></i>
              <h4>Completed Projects<span>250</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div>
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-tasks"></i>
              <h4>Completed Tasks<span>480</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div>
          <div className="statusbox dashbox">
            <div className="iconcont">
              <i className="fal fa-user-friends"></i>
              <h4>Active Clients<span>250</span></h4>
            </div>
            <div className="view"><i className="far fa-angle-right"></i></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home