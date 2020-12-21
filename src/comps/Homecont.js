import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useLocation} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import Settings from './Settings'
import OneProject from './OneProject'

function Homecont(props) {
  
  const [projid, setProjId] = useState('')

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
              <Clients />
            </Route>
            <Route path="/mytasks"> 
              <MyTasks />
            </Route>
            <Route path="/settings"> 
              <Settings />
            </Route>
            <Route path={"/projects"+projid}> 
              <OneProject />
            </Route>
          </Switch>
      
    </div> 
  )
} 

export default Homecont