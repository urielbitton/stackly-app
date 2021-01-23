import React, { useState } from 'react'
import {Inputs} from './Inputs'
import { StartConvo } from './StartConvo'

function UserOpts(props) {

  const {id, name} = props
  const [showinput, setShowInput] = useState(false)
  const [message, setMessage] = useState('')

  return ( 
    <div className="useroptscont" style={{right: props.right, left: props.left}}>
      <div>
        <div className="pimg">{props.name?props.name.split(' ')[0][0]:""}{props.name?props.name.split(' ')[1][0]:""}</div>
        <h5>{props.name}</h5> 
      </div>
      <div>
        <small style={{color: showinput?"var(--color)":""}} onClick={() => setShowInput(!showinput)}><i className="fal fa-paper-plane"></i>{showinput?"Cancel":"Send Message"}</small>
        <div className="form" style={{display: showinput?"flex":"none"}}>
          <Inputs onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Write a message..."/>
          <span onClick={message.length?() => StartConvo(id, name, message):null}>Send</span>
        </div>
        <small><i className="fal fa-user-plus"></i>Add Contact</small>
        <small><i className="fal fa-project-diagram"></i>Invite to Project</small>
      </div>
      <button className="viewprofbtn">View Profile</button>
    </div>
  )
}

export default UserOpts