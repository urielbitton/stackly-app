import React, { useState, useContext } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useLocation} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import Settings from './Settings'
import OneProject from './OneProject'
import OneClient from './OneClient'
import {StoreContext} from './StoreContext'

function Homecont(props) {
  
  const {projects, clients} = useContext(StoreContext)

  const oneproject = projects && projects.map(proj => {
    return <Route exact path={"/projects"+proj.id}> 
      <OneProject proj={proj}/>
    </Route>
  }) 
  const oneclient = clients && clients.map(cli => {
    return <Route path={"/clients"+cli.id}> 
      <OneClient cli={cli}/>
    </Route>
  })

  return ( 
    <div className="homecont">
      <Navbar darkmode={props.darkmode}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/projects"> 
              <Projects />
            </Route>
            <Route path="/clients"> 
              <Clients />
            </Route>
            <Route path="/mytasks"> 
              <MyTasks />
            </Route>
            <Route path="/settings"> 
              <Settings />
            </Route>
            {oneproject}
            {oneclient}
          </Switch>
      
    </div> 
  )
} 

export default Homecont