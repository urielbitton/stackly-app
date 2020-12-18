import React from 'react'
import Calendars from './Calendars'
import Charts from "./Chart"

function Home() {
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
              <h4>Good Morning, Uriel</h4>
              <h6>Check your recent notifications and tasks</h6>
              <div className="quicknotifs">
                <small><i className="fal fa-bell"></i>3 Notifications</small>
                <small><i className="fal fa-tasks"></i>5 New Tasks</small>
              </div>
            </div>
            <img src="https://i.imgur.com/iOYuiob.png" alt=""/>
          </div>
          <div className="dashgraph dashbox">
            <Charts type="bar-chart" /> 
          </div>
          <div className="dashbox tasksbox">
            <h5>Latest Tasks</h5>
            <div className="taskhead">
              <h6>Task</h6>
              <h6>Client</h6>
              <h6>Stage</h6>
              <h6>Date</h6>
              <h6>Status</h6>
              <h6>Details</h6>
            </div>
            <div className="taskrow">
              <h6>Redesign Website</h6>
              <h6>Cindy Bitton</h6>
              <h6>Development</h6>
              <h6>Jan 09 2021</h6>
              <h6>Not Done</h6>
              <h6><i class="far fa-ellipsis-h"></i></h6>
            </div>
          </div>
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
          <div className="updatesbox dashbox"></div>
        </div>
      </div>

    </div>
  )
}

export default Home