import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"

function ProjectCard(props) {

  const {id, title, client, tasksnum, daysleft, progress, color, shadow} = props.proj

  return (
    <Link exact to={"/projects"+id}>
    <div className="projbox">
      <i class="far fa-ellipsis-v" onClick={(e) => e.preventDefault()}></i>
      <div className="iconcont" style={{boxShadow: `0 5px 10px ${shadow}`, background: color}}>
        <i class="far fa-paint-brush-alt"></i>
      </div> 
      <div>
        <h4>{title}</h4>
        <h6>{client}</h6>
      </div>
      <div className="clientcircle" style={{background: color}}>
        <small>ub</small>
      </div>
      <div className="progresscont">
        <div className="progtitles">
          <h6>Progess</h6>
          <h6>{progress}%</h6>
        </div>
        <div className="progtube">
          <div className="progfill" style={{width: progress+"%"}}></div>
        </div>
      </div>
      <div className="projinforow">
        <div><small><i class="far fa-tasks"></i>{tasksnum}</small></div>
        <small><i class="far fa-clock"></i>{daysleft} days left</small>
      </div>
    </div>
    </Link>
  )
}

export default ProjectCard