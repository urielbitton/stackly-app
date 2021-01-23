import React from 'react'

function UserOpts(props) {
  return ( 
    <div className="useroptscont" style={{right: props.right, left: props.left}}>
      <div>
        <div className="pimg">{props.name?props.name.split(' ')[0][0]:""}{props.name?props.name.split(' ')[1][0]:""}</div>
        <h5>{props.name}</h5> 
      </div>
      <div>
        <small><i className="fal fa-paper-plane"></i>Send Message</small>
        <small><i className="fal fa-user-plus"></i>Add Contact</small>
        <small><i className="fal fa-project-diagram"></i>Invite to Project</small>
      </div>
    </div>
  )
}

export default UserOpts