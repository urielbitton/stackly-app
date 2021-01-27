import React from 'react'
import Notifications from './Notifications'

function NotifsPage() {
  return (
    <div className="notifspage apppage">
      <div class="pagetitles">
        <div class="pagetitlestxt">
          <h4>Notifications</h4>
          <h6></h6> 
        </div>
      </div>
      <Notifications amount={Infinity}/>
    </div>
  )
}

export default NotifsPage