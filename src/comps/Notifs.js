import React, {useContext, useEffect, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import {StoreContext} from './StoreContext'

function Notifs(props) {

  const {notifs} = useContext(StoreContext)
  const notifRef = useRef()
  const notifContRef = useRef()

  const recentnotifs = notifs.map(el => {
    return <div className="notifs" ref={notifRef} key={el.text}>
      <div>
        <i className={el.icon}></i>
        <p>{el.text}</p>
      </div>
      {/*<Link to={el.link}><button style={{display: el.showbtn?"block":"none"}}>{el.btntxt}</button></Link>*/}
      <i className="fal fa-times" onClick={() => hideNotif()}></i>
    </div>
  })    

  function hideNotif() {
    let timers
    notifRef.current.style.opacity = '0'
    timers = setTimeout(() => {
      notifRef.current.style.top = '30px'
    },50)
    timers = setTimeout(() => {
      notifContRef.current.style.zIndex = '-1'
    }, 300) 
  }

  useEffect(() => {
    let timers
    if(notifs[0].text !== undefined) {
      notifContRef.current.style.zIndex = '1000'
      notifRef.current.style.top = '0'
      notifRef.current.style.opacity = '1'
      timers = setTimeout(() => { 
        notifRef.current.style.top = '30px'
        timers = setTimeout(() => {
          notifRef.current.style.opacity = '0'
        },50)
        timers = setTimeout(() => {
          notifContRef.current.style.zIndex = '-1'
        }, 300);
      }, props.time) 
    }
    return() => {
      clearTimeout(timers)
    }
  },[props.update,props.time])  

  return (
    <div className="notifscont" ref={notifContRef}>
      {recentnotifs}
    </div>
  ) 
}

export default Notifs