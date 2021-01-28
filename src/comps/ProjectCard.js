import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"
import {db} from './Fire'
import firebase from 'firebase'

function ProjectCard(props) {

  const {projectid, name, client, tasks, daysleft, progress, color, shadow, icon} = props.proj
  const [pinned, setPinned] = useState(false)

  function pinUnpinProject(e) {
    e.preventDefault()
    db.collection('projects').doc(projectid).update({
      pinned: !pinned
    }) 
  }

  useEffect(() => {
    db.collection('projects').doc(projectid).onSnapshot(snap => {
      setPinned(snap.data().pinned)
    })
  },[])

  return (  
    <Link to={`/project/${projectid}`}>
    <div className="projbox">
      <i style={{color: pinned?"var(--color)":"#ccc"}} className="fal fa-map-pin" onClick={(e) => pinUnpinProject(e)}></i>
      <div className="iconcont" style={{boxShadow: `0 5px 10px ${shadow}`, background: color}}>
        <i className={`far ${icon}`}></i>
      </div> 
      <div>
        <h4>{name}</h4>
        <h6>{client.clientname}</h6>
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
        <div><small><i className="far fa-tasks"></i>{tasks.length} tasks</small></div>
        <small><i className="far fa-clock"></i>{daysleft} days left</small>
      </div>
    </div>
    </Link>
  )
}

export default ProjectCard