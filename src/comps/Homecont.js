import React, { useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link, useLocation} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import AddProject from './AddProject'
import AddClient from './AddClient'
import Settings from './Settings'
import OneProject from './OneProject'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function Homecont(props) {
  
  const [projid, setProjId] = useState('')
  let location = useLocation()

  return ( 
    <div className="homecont">
      <Navbar />
        <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
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
            <Route path="/addproject"> 
              <AddProject />
            </Route>
            <Route path="/addclient"> 
              <AddClient />
            </Route>
            <Route path="/settings"> 
              <Settings />
            </Route>
            <Route path={"/projects"+projid}> 
              <OneProject />
            </Route>
          </Switch>
          </CSSTransition>
        </TransitionGroup>
      
    </div>
  )
} 

export default Homecont