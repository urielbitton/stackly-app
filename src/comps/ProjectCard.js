import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"

function ProjectCard(props) {

  const {projectid, name, client, tasksnum, daysleft, progress, color, shadow, icon} = props.proj

  return (  
    <Link to={`/project/${projectid}`}>
    <div className="projbox">
      <i className="far fa-ellipsis-v" onClick={(e) => e.preventDefault()}></i>
      <div className="iconcont" style={{boxShadow: `0 5px 10px ${shadow}`, background: color}}>
        <i className={`far ${icon}`}></i>
      </div> 
      <div>
        <h4>{name}</h4>
        <h6>{client}</h6>
      </div>
      <div className="clientcircle" style={{background: color}}>
        <small>ub</small>
      </div>
      <div className="progresscont">
        <div className="progtitles">
          <h6>Progress</h6>
          <h6>{progress}%</h6>
        </div>
        <div className="progtube">
          <div className="progfill" style={{width: progress+"%"}}></div>
        </div>
      </div>
      <div className="projinforow">
        <div><small><i className="far fa-tasks"></i>{tasksnum}</small></div>
        <small><i className="far fa-clock"></i>{daysleft} days left</small>
      </div>
    </div>
    </Link>
  )
}

export default ProjectCard