import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Projects from './Projects'
import Clients from './Clients'
import MyTasks from './MyTasks'
import AddProject from './AddProject'
import AddClient from './AddClient'
import Settings from './Settings'

function Homecont() {
  return (
    <div className="homecont">
      <Navbar />
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
        <Route path="/addproject"> 
          <AddProject />
        </Route>
        <Route path="/addclient"> 
          <AddClient />
        </Route>
        <Route path="/settings"> 
          <Settings />
        </Route>
      </Switch>
      
    </div>
  )
} 

export default Homecont