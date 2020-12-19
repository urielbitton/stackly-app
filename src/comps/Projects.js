import React, { useContext } from 'react'
import ProjectCard from './ProjectCard'
import { StoreContext } from './StoreContext'

function Projects(props) {

  const {projects} = useContext(StoreContext)
  
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
              <button><i className="far fa-plus"></i>Create Project</button>
            </div>
          </div>
          {projectsrow}
        </div>
        <div className="pageside">
          <h4>Recent Acitivity</h4>
        </div>
      </div>
    </div>
  )
}

export default Projects