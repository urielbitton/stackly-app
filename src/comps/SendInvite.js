import React, { useState, useEffect, useRef } from 'react'
import firebase from 'firebase'
import {db} from './Fire'
import {Inputs} from './Inputs'
import { isPropsEqual } from '@fullcalendar/core'

function SendInvite(props) { 

  const [emailto, setEmailTo] = useState('')
  const [valid, setValid] = useState(false)
  const [notify, setNotify] = useState('')
  const [error, setError] = useState(false)
  const [shareid, setShareId] = useState(db.collection("users").doc().id)
  const user = firebase.auth().currentUser
  const inviteRef = useRef()

  function handleSend() { 
    const templateid = 'template_x8smust'
    sendFeedback(templateid, {from_name:user.displayName, email_to:emailto, projname:props.projname, shareid:props.projid})
  }
  function sendFeedback (templateid, variables) { 
    window.emailjs.send(
      'service_k0uqq1j', templateid,
      variables
      ).then(res => {
        setError(false)
        setNotify('Your invitation has been successfully sent! Once the user registers they will automatically be added to your project.')
      })
    .catch(err => {
      setError(true)
      setNotify('There was an error sending your invitation. Please try again later.', console.log(err))
    })
  } 
  function validateInput(email) {
    setNotify('')
    setEmailTo(email)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
      setValid(true)

    }
    else {
      setValid(false)
    }
  }
  function sendInvitation() {
    if(valid) {
      setError(false)
      setNotify('Project invitation will be sent')
      if(props.inviteaccess) {
        handleSend()
      }
    } 
    else { 
      setError(true)
      if(error)
        setNotify('The email address you provided is invalid. Please try again.')
    }
  }

  useEffect(() => {
    inviteRef.current.click()
  },[props.inviteaccess])

  return ( 
    <div className="sendinvitecont">
      <Inputs title={props.title} iconclass="fal fa-search" value={emailto} onChange={(e) => validateInput(e.target.value)}/>
      <button ref={inviteRef} onClick={() => sendInvitation()}>Send Invitation</button> 
      <small style={{color: error?"var(--red)":"var(--color)"}}>{notify}</small>
    </div>
  )
}

export default SendInvite