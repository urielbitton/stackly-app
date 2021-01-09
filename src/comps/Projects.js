import React, { useContext, useState } from 'react'
import ProjectCard from './ProjectCard'
import { StoreContext } from './StoreContext'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs} from './Inputs'

function Projects(props) {

  const {projects} = useContext(StoreContext)

  const [showadd, setShowAdd] = useState(false)
  const [section, setSection] = useState(1)
  
  const projectsrow = projects && projects.map(proj => {
    return <ProjectCard proj={proj} key={proj.id} />
  })

  return (
    <div className="projectspage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
          <div className="pagetitles">
            <h4>Projects</h4>
            <div className="actions">
              <div><i className="far fa-sliders-h"></i></div>
              <Link to="/projects/addproject"><button onClick={() => setShowAdd(!showadd)}><i className="far fa-plus"></i>Create Project</button></Link>
            </div>
          </div>
          {projectsrow} 
        </div>
      </div>
      <div className="addcover" style={{display: showadd?"block":"none"}}></div>
      
      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
        <div className="addsection" style={{left: section===1?"0":"-200%"}}>
        <Link to="/projects" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></Link>
        <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Create Project</h4></div>
        <div className="content hidescroll">
          <Inputs title="Project Name" placeholder="Web Development"/>
          <button onClick={() => setSection(2)}>Add Client<i className="fal fa-plus"></i></button>
          <button onClick={() => setSection(3)}>Add Tasks<i className="fal fa-plus"></i></button>
          <Inputs title="Days Left" type="number" placeholder="30"/>
          <label>
            <h6>Category</h6>
            <select>
                <option>Design</option>
                <option>IT/Development</option>
                <option>Marketing</option>
                <option>Financial</option>
                <option>Legal</option>
                <option>Entertainment</option>
                <option>Media</option>
                <option>General Services</option>
                <option>Other</option>
            </select>
          </label>
        </div>
        <button>Create</button>
        </div>
        <div className="clientsection" style={{left: section===1?"400px":section===2?"0":"400px"}}>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Add Client</h4></div>
          <i className="fal fa-angle-left" onClick={() => setSection(1)}></i>
          <div className="content">
            <Inputs title="Find a Client" iconclass="fal fa-search"/>
          </div>
          <button onClick={() => setSection(1)}>Done</button>
        </div>
        <div className="taskssection" style={{left: section===1?"400px":section===3?"0":"400px"}}>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Add Tasks</h4></div>
          <i className="fal fa-angle-left" onClick={() => setSection(1)}></i>
          <div className="content">

          </div>
          <button onClick={() => setSection(1)}>Done</button>
        </div>
      </div>  
    </div>
  )
}

export default Projects