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
import Notifs from './Notifs'

function Homecont(props) {
  
  const {projects, clients} = useContext(StoreContext)

  const [update, setUpdate] = useState(0)
  const [time, setTime] = useState(3000)

  const oneproject = projects && projects.map(proj => {
    return <Route exact path={"/projects"+proj.id}> 
      <OneProject proj={proj} shownotif={(time) => setUpdate(prev => prev+1, setTime(time))}/>
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
            <Settings shownotif={(time) => setUpdate(prev => prev+1, setTime(time))} />
          </Route>
          {oneproject}
          {oneclient}
        </Switch>

        <Notifs update={update} time={time}/>
    </div> 
  )
} 

export default Homecont