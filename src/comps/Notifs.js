import React, {useContext, useEffect, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {StoreContext} from './StoreContext'

function Notifs(props) {

  const {notifs} = useContext(StoreContext)
  const notifRef = useRef()
  const notifContRef = useRef()

  const recentnotifs = notifs.map(el => {
    return <div className="notifs" ref={notifRef}>
      <div>
        <i class={el.icon}></i>
        <p>{el.text}</p>
      </div>
      <Link to={el.link}><button style={{display: el.showbtn?"block":"none"}}>{el.btntxt}</button></Link>
      <i className="fal fa-times" onClick={() => hideNotif()}></i>
    </div>
  })    

  function hideNotif() {
    notifRef.current.style.opacity = '0'
    setTimeout(() => {
      notifRef.current.style.top = '30px'
    },50)
    setTimeout(() => {
      notifContRef.current.style.zIndex = '-1'
    }, 300) 
  }

  useEffect(() => {
    if(notifs[0].text !== undefined) {
      notifContRef.current.style.zIndex = '1000'
      notifRef.current.style.top = '0'
      notifRef.current.style.opacity = '1'
      setTimeout(() => { 
        notifRef.current.style.top = '30px'
        setTimeout(() => {
          notifRef.current.style.opacity = '0'
        },50)
        setTimeout(() => {
          notifContRef.current.style.zIndex = '-1'
        }, 300);
      }, props.time)
    }
  },[props.update,props.time])  

  return (
    <div className="notifscont" ref={notifContRef}>
      {recentnotifs}
    </div>
  ) 
}

export default Notifs