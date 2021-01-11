import React, {useContext, useState, useEffect} from 'react'
import Circle from './Circle'
import { Inputs } from './Inputs'
import {StoreContext} from './StoreContext'
import firebase from 'firebase'
import {db} from './Fire'

function OneProject(props) { 

  const {setNotifs} = useContext(StoreContext)
  const {proj} = props

  const [userlist, setUserList] = useState([])
  const [project, setProject] = useState({})
  const [projlist, setProjList] = useState([])
  const [taskslist, setTasksList] = useState([])
  const [slide, setSlide] = useState(false)
  const [taskname, setTaskName] = useState('')
  const [taskdue, setTaskDue] = useState('')
  const [taskstatus, setTaskStatus] = useState('')
  const [taskupdates, setTaskUpdates] = useState([])
  const [tasknotes, setTaskNotes] = useState('')
  const [taskcolor, setTaskColor] = useState('#056dff')
  const [update, setUpdate] = useState(0)
  const [showadd, setShowAdd] = useState(false)
  const [taskprior, setTaskPrior] = useState('')
  const user = firebase.auth().currentUser

  const recentactivity = proj.activity && proj.activity.map(el => {
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
  const alltasks = proj.tasks && proj.tasks.map(el => {
    return <div className="taskrow" style={{background: el.taskcolor+"20"}}>
        <h4>{el.taskname}</h4>
        <div className="taskbox">
          <h6>Date Due: <span>{el.taskdue}</span></h6>
          <h6>Status <span style={{color: "var(--color)"}}>{el.taskstatus}</span></h6>
        </div>
        <div className="taskboxopts">
          <button onClick={() => slideDetails(el)}>Details</button>
          <i className="far fa-edit"></i>
          <i className="far fa-trash"></i>
        </div>
      </div>
  })
  const updatesrow = taskupdates && taskupdates.map(el => {
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
    setTaskName(el.taskname)
    setTaskDue(el.taskdue)
    setTaskUpdates(el.taskupdates)
    setTaskStatus(el.taskstatus)
    setTaskNotes(el.tasknotes)
    setTaskPrior(el.taskprior)
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
    let itemindex = taskupdates.indexOf(el)
    taskupdates.splice(itemindex,1)
    setUpdate(prev =>prev+1)
  }
  function addTask() {
    if(taskname.length) {
      let taskobj = {
        taskid: db.collection("users").doc().id,
        taskname,
        taskcolor,
        taskdue,
        taskprior,
        taskstatus,
        taskupdates
      }
      taskslist.push(taskobj)
      props.shownotif(4000) 
      setNotifs([{icon: 'fal fa-check-circle',text: 'The task has been added to your project.'}])
    }
  }
  function showAddFunc() {
    setShowAdd(!showadd)
    setTaskName('')
    setTaskDue('')
    setTaskUpdates('')
    setTaskStatus('')
    setTaskNotes('')
    setTaskPrior('')
  }
 
  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(doc => {
      const userlist = doc.data()
      setUserList(userlist)
      setProjList(userlist.projects)
    })
  },[])  
 
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid oneprojectcont">
          <div className="projecttoolbar">
            <h4><i className="far fa-calendar-alt"></i> Jan 15 2020</h4>
            <h3>Tasks</h3>
            <button onClick={() => showAddFunc()}>Add Task</button>
          </div>
          <div className="projectcontent">
            <div className="timelinecont">
              <hr/>
                {proj.tasks && proj.tasks.map(el => {
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
              <h4>{proj.name}</h4>
              <h6>{proj.client}</h6>
            </div>
            <div>
              <small>{proj.daysleft} days left</small>
              <small>Tasks: {proj.tasksnum}</small>
            </div>
          </div>
          <Circle percent={proj.progress} text={proj.progress+"%"} text2="Complete" color={proj.color} /> 
          <div className="realtimediv">
            <h5>Real-time updating</h5>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="sidecontent hidescroll">
            <h4>Recent Activity</h4>
            <h6>January 05 2021</h6>
            {proj.activity.length?recentactivity:<h4 className="noactivity">No Activity Yet...</h4>}

          </div> 
          <div className="actionsection">
            <button style={{background: proj.color}}>Contact Client</button>
          </div>
        </div>
      </div>

      <div className="tasksidecont" style={{right: slide?"0":"-550px"}}>
        <i className="fal fa-times" onClick={() => setSlide(!slide)}></i>
        <div className="titlecont">
          <h2>{taskname}</h2>
          <h6>Client: <span>{proj.client}</span></h6>
          <h6>Date Due: <span>{taskdue}</span></h6>
          <h6>Status: <span>{taskstatus}</span></h6>
          <h6>Notes</h6>
          <textarea spellCheck="false" placeholder="add notes to this task..." onChange={(e) => setTaskNotes(e.target.value)} value={tasknotes} />
        </div>
        <hr/>
        <div className="priorcont">
          <h5>Task Priority</h5>
          <div>
            <button disabled style={{display: taskprior==='low'?"block":"none"}} className={taskprior==='low'?"lowprior priorbtn activelowbtn":"lowprior priorbtn"}><i className="fas fa-star"></i>Low Priority</button>
            <button disabled style={{display: taskprior==='high'?"block":"none"}} className={taskprior==='high'?"highprior priorbtn activehighbtn":"highprior priorbtn"}><i className="fas fa-star"></i>High Priority</button>
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
            <Inputs title="Task title" placeholder="E.g. Install Plugins" onChange={(e) => setTaskName(e.target.value)} value={taskname} />
            <label>
              <h6>Task Status</h6>
              <select value={taskstatus} onChange={(e) => setTaskStatus(e.target.value)} >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <div className="switchbox">
              <h6>Task Color</h6>
              <Inputs type="color" onChange={(e) => setTaskColor(e.target.value)} value={taskcolor}/>  
            </div>
            <Inputs title="Date Due" type="date" onChange={(e) => setTaskDue(e.target.value)} value={taskdue} />
            <div className="addpriorcont">
              <button onClick={() => setTaskPrior('low')} className={taskprior==='low'?"lowprior priorbtn activelowbtn":"lowprior priorbtn"}><i className="fas fa-star"></i>Low Priority</button>
              <button onClick={() => setTaskPrior('high')} className={taskprior==='high'?"highprior priorbtn activehighbtn":"highprior priorbtn"}><i className="fas fa-star"></i>High Priority</button>
            </div>
            <label> 
              <h6>Notes</h6>
              <textarea placeholder="add notes to this task..." onChange={(e) => setTaskNotes(e.target.value)} value={tasknotes} />
            </label>
          </div>
          <button style={{padding:"10px 20px"}} onClick={() => addTask()}><i className="far fa-plus"></i>Add</button>
        </div>
      </div> 
 
    </div>
  )
}

export default OneProject