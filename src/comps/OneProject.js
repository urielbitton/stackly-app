import React from 'react'
import Circle from './Circle'

function OneProject() {
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
        </div>
        <div className="pageside">
          <div className="pagesidebg"></div>
          <h4>Website Design</h4>
          <h6>Intellisense Inc.</h6>
          <Circle percent="45" text="45%" text2="Complete" /> 
          <div className="realtimediv">
            <h5>Real-time updating</h5>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="sidecontent">
            <h4>Recent Activity</h4>
            <h6>January 05 2021</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneProject