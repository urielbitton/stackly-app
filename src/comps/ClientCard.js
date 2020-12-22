import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from "react-router-dom"

function ClientCard(props) {

  const {id, name, profession, project, projnum} = props.cli 

  return ( 
    <Link to={"/client"+id} onClick={() => props.sendclientid(id)}>
    <div className="projbox"> 
      <i class="far fa-ellipsis-v" onClick={(e) => e.preventDefault()}></i>
      <div className="iconcont" style={{boxShadow: `0 5px 10px rgba(48,210,252,0.4)`, background: "var(--color)"}}>
        <i class="fal fa-user"></i>
      </div> 
      <div>
        <h4>{name}</h4>
        <h6>{profession}</h6>
      </div>
      <div className="clientdetails">
        <small><i class="far fa-list-ol"></i>{projnum} projects</small>
      </div>
    </div>
    </Link>
  )
}

export default ClientCard