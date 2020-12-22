import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useLocation} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import Settings from './Settings'
import OneProject from './OneProject'
import OneClient from './OneClient'

function Homecont(props) {
  
  const [projid, setProjId] = useState('')
  const [clientid, setClientId] = useState('')

  return ( 
    <div className="homecont">
      <Navbar darkmode={props.darkmode}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/projects"> 
              <Projects sendprojid={(id) => setProjId(id)} />
            </Route>
            <Route path="/clients"> 
              <Clients sendclientid={(id) => setClientId(id)} />
            </Route>
            <Route path="/mytasks"> 
              <MyTasks />
            </Route>
            <Route path="/settings"> 
              <Settings />
            </Route>
            <Route exact path={"/projects"+projid}> 
              <OneProject />
            </Route>
            <Route path={"/clients"+clientid}> 
              <OneClient />
            </Route>
          </Switch>
      
    </div> 
  )
} 

export default Homecont