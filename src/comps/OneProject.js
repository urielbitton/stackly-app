import React, {useContext, useState} from 'react'
import Circle from './Circle'
import { Inputs } from './Inputs'
import {StoreContext} from './StoreContext'

function OneProject(props) { 

  const {setNotifs} = useContext(StoreContext)
  const {id, title, client, progress, tasksnum, tasks, daysleft, color, shadow, activity} = props.proj

  const [slide, setSlide] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [updates, setUpdates] = useState([])
  const [update, setUpdate] = useState(0)
  const [showadd, setShowAdd] = useState(false)

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
  const alltasks = tasks && tasks.map(el => {
    return <div className="taskrow">
        <h4>{el.name}</h4>
        <div className="taskbox">
          <h6>Date Added: <span>{el.date}</span></h6>
          <h6>Status <span style={{color: "var(--color)"}}>{el.status}</span></h6>
        </div>
        <div className="taskboxopts">
          <button onClick={() => slideDetails(el)}>Details</button>
          <i className="far fa-trash"></i>
        </div>
      </div>
  })
  const updatesrow = updates && updates.map(el => {
    return <div className="updatebox" data-update={update}>
      <div>
        <div className="clientcircle"><small>{el.person.split(' ')[0][0]}{el.person.split(' ')[1][0]}</small></div>
        <h5>{el.person}</h5>
        <h6>•&emsp;just now</h6>
      </div>
      <textarea disabled={!el.edit} value={el.text} onChange={(e) => {el.text = e.target.value;setUpdate(prev =>prev+1)}} style={{border: el.edit?"1px solid #ddd":"none", marginBottom: el.edit?"5px":"-5px"}}/>
      <div> 
        <small onClick={!el.edit?() => editUpdateText(el):() => saveUpdateText(el)}>{!el.edit?"Edit":"Save"}</small>
        <small onClick={() => deleteUpdate(el)}>Delete</small>
      </div>
    </div>
  })

  function slideDetails(el) {
    setSlide(!slide)
    setName(el.name)
    setDate(el.date)
    setUpdates(el.updates)
    setStatus(el.status)
  }
  function editUpdateText(el) {
    el.edit = !el.edit
    setUpdate(prev =>prev+1)
  }
  function saveUpdateText(el) {
    el.edit = !el.edit
    setUpdate(prev =>prev+1)
  }
  function deleteUpdate(el) {
    let itemindex = updates.indexOf(el)
    updates.splice(itemindex,1)
    setUpdate(prev =>prev+1)
  }
  function addTask() {
    props.shownotif(4000) 
    setNotifs([{icon: 'fal fa-check-circle',text: 'The task has been added to your project.'}])
  }
 
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid oneprojectcont">
          <div className="projecttoolbar">
            <h4><i className="far fa-calendar-alt"></i> Jan 15 2020</h4>
            <h3>Tasks</h3>
            <button onClick={() => setShowAdd(!showadd)}>Add Task</button>
          </div>
          <div className="projectcontent">
            <div className="timelinecont">
              <hr/>
                {tasks && tasks.map(el => {
                  return <div className="timecircle"></div>
                })}
            </div>
            {alltasks}
          </div>
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
            <button style={{background: color}}>Contact Client</button>
          </div>
        </div>
      </div>

      <div className="tasksidecont" style={{right: slide?"0":"-550px"}}>
        <i className="fal fa-times" onClick={() => setSlide(!slide)}></i>
        <div className="titlecont">
          <h2>{name}</h2>
          <h6>Client: <span>{client}</span></h6>
          <h6>Date Due: <span>{date}</span></h6>
          <h6>Status: <span>{status}</span></h6>
          <h6>Notes</h6>
          <textarea placeholder="add notes to this task..."/>
        </div>
        <hr/>
        <div className="priorcont">
          <h5>Task Priority</h5>
          <div>
            <button className="lowprior priorbtn"><i className="fas fa-star"></i>Low Priority</button>
            <button className="highprior priorbtn"><i className="fas fa-star"></i>High Priority</button>
          </div>
        </div>
        <hr/>
        <div className="updatescont">
          {updatesrow}
        </div>
        <hr/>
        <div className="postcont">
          <textarea placeholder="Add an update..."/>
          <button>Add Update</button>
        </div>
      </div>  

      <div className="addcover" style={{display: showadd?"block":"none"}}></div>
      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
        <div className="addsection">
          <a className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></a>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Add Task</h4></div>
          <div className="content hidescroll">
            <Inputs title="Task title" placeholder="E.g. Install Plugins"/>
            <Inputs title="Status" placeholder="E.g. Completed"/>
            <Inputs title="Date Due" type="date"/>
            <div className="addpriorcont">
              <button className="lowprior priorbtn"><i className="fas fa-star"></i>Low Priority</button>
              <button className="highprior priorbtn"><i className="fas fa-star"></i>High Priority</button>
            </div>
            <label> 
              <h6>Notes</h6>
              <textarea placeholder="add notes to this task..."/>
            </label>
          </div>
          <button style={{padding:"10px 20px"}} onClick={() => addTask()}><i className="far fa-plus"></i>Add</button>
        </div>
      </div> 

    </div>
  )
}

export default OneProject