import React, {useContext} from 'react'
import Circle from './Circle'
import {StoreContext} from './StoreContext'

function OneProject({proj}) {

  const {projects} = useContext(StoreContext)
  const {id, title, client, progress, tasksnum, daysleft, color, shadow, activity} = proj

  const recentactivity = activity && activity.map(el => {
    return <div className="activitydiv">
      <div className="actcont">
        <div className="clientcicrcle">
          <small>{el.person.split(' ')[0][0]}{el.person.split(' ')[1][0]}</small>
        </div>
        <div>
          <h5>{el.task}</h5>
          <h6>{el.time}</h6>
        </div>
        </div>
        <i className="fal fa-angle-right activitybtn"></i>
    </div> 
  })
 
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
        </div>
        <div className="pageside">
          <div className="pagesidebg"></div>
          <div className="titleshead">
            <div>
              <h4>{title}</h4>
              <h6>{client}</h6>
            </div>
            <div>
              <small>{daysleft} days left</small>
              <small>Tasks: {tasksnum}</small>
            </div>
          </div>
          <Circle percent={progress} text={progress+"%"} text2="Complete" color={color} /> 
          <div className="realtimediv">
            <h5>Real-time updating</h5>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="sidecontent hidescroll">
            <h4>Recent Activity</h4>
            <h6>January 05 2021</h6>
            {activity.length?recentactivity:<h4 className="noactivity">No Activity Yet...</h4>}

          </div> 
          <div className="actionsection">
            <button>Contact Client</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneProject