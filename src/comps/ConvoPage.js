import React from 'react'
import Conversations from './Conversations'
import {Inputs} from './Inputs'

function ConvoPage(props) {
  return (
    <div className="convopage apppage">
      <div className="pagetitlestxt">
        <h4>Messages</h4> 
      </div> 
      <div className="convosgrid">
        <div className="sidebarconvos">
          <div className="sidebarconvoshead">
            <div>
              <h3>Messages</h3>
              <i class="fal fa-cog"></i>
            </div>
            <div>
              <Inputs />
            </div>
          </div>
          <Conversations amount={8} />
        </div>
        <div className="convoscontent">
            <div className="convohead">
              
            </div>
            <div className="convowindow"></div>
        </div>
      </div>
    </div>
  )
}

export default ConvoPage