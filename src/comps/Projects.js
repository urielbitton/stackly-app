import React, { useContext, useState } from 'react'
import ProjectCard from './ProjectCard'
import { StoreContext } from './StoreContext'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {Inputs} from './Inputs'

function Projects(props) {

  const {projects} = useContext(StoreContext)

  const [showadd, setShowAdd] = useState(false)
  
  const projectsrow = projects && projects.map(proj => {
    return <ProjectCard proj={proj} key={proj.id} sendprojid={props.sendprojid}/>
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
        <div className="pageside">
          <h4>Recent Acitivity</h4>
        </div>
      </div>
      <div className="addcover" style={{display: showadd?"block":"none"}}></div>
      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
        <Link to="/projects" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></Link>
        <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Create Project</h4></div>
        <div className="content">
          <Inputs title="Project Name" placeholder="Web Development"/>
          <button>Add Client<i className="fal fa-plus"></i></button>
          <button>Add Tasks<i className="fal fa-plus"></i></button>
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
    </div>
  )
}

export default Projects