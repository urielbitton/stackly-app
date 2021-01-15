import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import Circle from './Circle'
import { Inputs, Switchs } from './Inputs'
import {StoreContext} from './StoreContext'
import firebase from 'firebase'
import {db} from './Fire'

function OneProject(props) { 

  const {setNotifs} = useContext(StoreContext)
  const {proj} = props
  
  const [userlist, setUserList] = useState([])
  const [projlist, setProjList] = useState([])
  const [shareids, setShareIds] = useState([])
  const [slide, setSlide] = useState(false)
  const [taskid, setTaskId] = useState('')
  const [taskname, setTaskName] = useState('')
  const [taskdue, setTaskDue] = useState('')
  const [taskstatus, setTaskStatus] = useState('Not Started')
  const [taskupdates, setTaskUpdates] = useState([])
  const [tasknotes, setTaskNotes] = useState('')
  const [taskcolor, setTaskColor] = useState('#1cb7ff')
  const [update, setUpdate] = useState(0)
  const [showadd, setShowAdd] = useState(false)
  const [showedit, setShowEdit] = useState(false)
  const [taskprior, setTaskPrior] = useState('')
  const [projindex, setProjIndex] = useState('')
  const [updtext, setUpdText] = useState('')
  const [tasklist, setTaskList] = useState(proj.tasks)
  const [tempUpdText, setTempUpdText] = useState('')
  const [updatesList, setUpdatesList] = useState([])
  const [projname, setProjName] = useState('')
  const [daysleft, setDaysLeft] = useState('')
  const [projcat, setProjCat] = useState('')
  const [projactive, setProjActive] = useState('')
  const [projcolor, setProjColor] = useState('')
  const [projicon, setProjIcon] = useState('')
  const [projprogress, setProjProgress] = useState('')
  const [activeicon, setActiveIcon] = useState('')
  const [addedit, setAddEdit] = useState(true)
  const [priorpromise, setPriorPromise] = useState()
  const user = firebase.auth().currentUser
  let date = new Date()
  let updatetime = formatDate(new Date())
  let formatdate = date.toString().split(' ').slice(1,4).toString().replaceAll(',',' ')
  let history = useHistory()


  const alltasks = proj.tasks && proj.tasks.map(el => {
    return <div className="taskrow" style={{background: el.taskcolor+"20"}}>
        <h4>{el.taskname}</h4>
        <div className="taskbox">
          <h6>Date Due: <span>{el.taskdue}</span></h6>
          <h6>Status <span style={{color: "var(--color)"}}>{el.taskstatus}</span></h6>
        </div>
        <div className="taskboxopts">
          <button onClick={() => slideDetails(el)}>Details</button>
          <i className="far fa-edit" onClick={() => editTask(el)}></i>
        </div>
      </div> 
  }) 
  const recentactivity = proj.activity && proj.activity.slice(0).reverse().map(el => {
    return <div className="activitydiv" style={{paddingBottom:"15px"}}>
      <div className="actcont">
        <div className="clientcicrcle">
          <small>{el.actperson.split(' ')[0][0]}</small> 
        </div>
        <div>
          <h5>{el.actaction}: {el.acttext}</h5>
          <h6>{el.actdate}</h6>
        </div>
        </div>
        <i className="fal fa-angle-right activitybtn"></i>
        <div className="activitysidecont">
          <small>Created at: {el.acttime}, {el.actdate}</small>
          <small>Added by: {el.actperson}</small>
        </div>
    </div> 
  })
  const updatesrow = taskupdates && taskupdates.slice(0).reverse().map(el => {
    return <div className="updatebox" data-update={update}>
      <div> 
        <div className="clientcircle"><small>{el.updateperson.split(' ')[0][0]}{el.updateperson.split(' ')[1][0]}</small></div>
        <h5>{el.updateperson}</h5>
        <h6>•&emsp;<span>{el.updatedate.toString()}</span></h6>
      </div>
      <textarea disabled={!el.edit} value={el.updatetext} onChange={(e) => {el.updatetext = e.target.value;setUpdate(prev => prev+1);setTempUpdText(e.target.value)}} style={{border: el.edit?"1px solid #ddd":"none", marginBottom: el.edit?"5px":"0px"}}/>
      <div> 
        <small onClick={!el.edit?() => editUpdateText(el):() => saveUpdateText(el)}>{!el.edit?"Edit":"Save"}</small>
        <small onClick={() => deleteUpdate(el)}>Delete</small>
      </div>
    </div>
  })
  const iconspack = [
    {class:'fa-paint-brush-alt',title:'Design'},
    {class: "fa-icons", title:'Entertainment'},
    {class: "fa-laptop-code", title: "Development"},
    {class: "fa-dollar-sign", title:"Finance"},
    {class: "fa-shield-check", title:"Security"},
    {class: "fa-cloud-upload", title: "Cloud System"},
    {class: "fa-project-diagram", title: "General"}
  ]
  const iconsrow = iconspack && iconspack.map(el => {
    return <i className={activeicon===iconspack.indexOf(el)?`activeicon fal ${el.class}`:`fal ${el.class}`} title={el.title} key={el.title} onClick={() => setProjIcon(el.class, setActiveIcon(iconspack.indexOf(el)))}></i>
  })

  function slideDetails(el) {
    setSlide(!slide) 
    setTaskId(el.taskid)
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
    tasklist && tasklist.forEach(el2 => {
      if(el2.taskid === taskid) {
        let taskindex = tasklist.indexOf(el2)
        let updateindex = taskupdates.indexOf(el)
        proj.tasks[taskindex].taskupdates[updateindex].updatetext = tempUpdText
        db.collection("projects").doc(proj.projectid).update(proj) 
      }  
    })
  }
  function deleteUpdate(el) {
    tasklist && tasklist.forEach(el2 => {
      if(el2.taskid === taskid) {
        setTaskUpdates(el2.taskupdates)
        let taskindex = tasklist.indexOf(el2)  
        let updateindex = taskupdates.indexOf(el)
        proj.tasks[taskindex].taskupdates.splice(updateindex,1)
        db.collection("projects").doc(proj.projectid).update(proj) 
      } 
    })
  }
  function addTask() {
    if(taskname.length) {
      if(addedit) { //if adding a task
        let taskobj = {
          taskid: db.collection("users").doc().id,
          taskname,
          taskcolor,
          taskdue,
          taskprior,
          taskstatus,
          taskupdates,
          tasknotes
        }
        proj.tasks.push(taskobj)
        db.collection("projects").doc(proj.projectid).update(proj)  
        props.shownotif(4000) 
        setNotifs([{icon: 'fal fa-check-circle',text: 'The task has been added to your project.'}])
        createActivity('Added task',taskname) 
      }
      else { //if editing a task
        let taskobj = {
          taskid,
          taskname,
          taskcolor,
          taskdue,
          taskprior,
          taskstatus,
          taskupdates,
          tasknotes
        } 
        tasklist && tasklist.forEach(el => {
          if(el.taskid === taskid) {
            let taskindex = tasklist.indexOf(el)
            proj.tasks[taskindex] = taskobj
            db.collection("projects").doc(proj.projectid).update(proj) 
          } 
        })
        props.shownotif(4000) 
        setNotifs([{icon: 'fal fa-check-circle',text: 'The current task has been saved.'}])
        if(priorpromise===0) 
          createActivity('Changed','Task priority to Low')
        else if(priorpromise===1)
          createActivity('Changed','Task priority to High')

      }
      setTaskName('')
      setTaskPrior('')
      setTaskColor('#056dff')
      setTaskStatus('Not Started')
      setTaskDue('')
      setTaskNotes('') 
      setTimeout(() => { setShowAdd(!showadd)}, 30)
      openCloseAct()
    }
    else {
      props.shownotif(4000) 
      setNotifs([{icon: 'fal fa-exclamation-circle',text: 'Task name cannot be empty.'}])
    }
  }
  function showAddFunc() {
    setAddEdit(true)
    setShowAdd(!showadd)
    setTaskName('')
    setTaskDue('')
    setTaskUpdates([])
    setTaskStatus('')
    setTaskNotes('')
    setTaskPrior('')
  }
  function showEditFunc() {
    setShowEdit(!showedit)
    setProjName(proj.name)
    setDaysLeft(proj.daysleft)
    setProjCat(proj.category)
    setProjActive(proj.active)
    setProjColor(proj.color)
    setProjIcon(proj.icon)
    setProjProgress(proj.progress)
  }
  function addUpdate() {
    if(updtext.length) {
      let updateobj = {
        updateid: db.collection("users").doc().id,
        updatetext: updtext,
        updatedate: updatetime,
        updateperson: user.displayName,
        edit: false
      }  
      tasklist && tasklist.forEach(el => {
        if(el.taskid === taskid) {
          setTaskUpdates(el.taskupdates)
          let taskindex = tasklist.indexOf(el)
          tasklist[taskindex].taskupdates.push(updateobj)
          db.collection("projects").doc(proj.projectid).update(proj) 
          createActivity('Added update',`on task '${tasklist[taskindex].taskname}'`)
        }  
      }) 
    } 
    setUpdText('')
  }
  function formatDate(date) {
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0'+minutes : minutes
    var strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }
  function markComplete() {
    proj.progress = 100
    db.collection("projects").doc(proj.projectid).update(proj) 
  }
  function saveProject() {
    proj.name = projname
    proj.active = projactive
    proj.category = projcat
    proj.daysleft = daysleft
    proj.icon = projicon
    proj.progress = projprogress
    proj.color = projcolor
    db.collection("projects").doc(proj.projectid).update(proj) 
    setShowEdit(!showedit)
    props.shownotif(4000)
    setNotifs([{icon: 'fal fa-check-circle',text: `Project '${proj.name}' has been saved`}])
    createActivity('Edited','Project details')
  }
  function deleteProject() {
    projlist.splice(projindex,1)
    db.collection("projects").doc(proj.projectid).update(proj) 
    history.push('/projects')
  }
  function editTask(el) {
    setAddEdit(false)
    setShowAdd(!showadd)
    setTaskId(el.taskid)
    setTaskName(el.taskname)
    setTaskDue(el.taskdue)
    setTaskUpdates(el.taskupdates)
    setTaskStatus(el.taskstatus)
    setTaskNotes(el.tasknotes)
    setTaskPrior(el.taskprior)
  }
  function deleteTask() {
    tasklist && tasklist.forEach(el => {
      if(el.taskid === taskid) {
        let taskindex = tasklist.indexOf(el)
        tasklist.splice(taskindex,1) 
        db.collection("projects").doc(proj.projectid).update(proj) 
      } 
    }) 
    setTimeout(() => { setShowAdd(!showadd)}, 30)
  }
  function createActivity(action,text) {
    let actobj = {
      actperson: user.displayName,
      acttext: text,
      actdate: formatdate,
      actaction: action,
      acttime: updatetime
    }
    proj.activity.push(actobj)
    db.collection("projects").doc(proj.projectid).update(proj) 
  }
  function clearActivity() {
    proj.activity = []
    db.collection("projects").doc(proj.projectid).update(proj) 
  }
  function openCloseAct() {
    //open/close activitydivs
    document.querySelectorAll('.activitydiv i').forEach(el => {
      el.onclick = () => {
        if(el.closest('.activitydiv').style.paddingBottom === '15px') {
          document.querySelectorAll('.activitydiv').forEach(el => {
            el.style.paddingBottom = '15px'
            el.closest('.activitydiv').querySelector('.activitysidecont').style.opacity = '0'
            el.querySelector('i').style.transform = 'rotate(0deg)'
          })
          el.closest('.activitydiv').style.paddingBottom = '65px'
          el.style.transform = 'rotate(90deg)'
          el.closest('.activitydiv').querySelector('.activitysidecont').style.opacity = '1'
        }
        else {
          el.closest('.activitydiv').style.paddingBottom = '15px'
          el.style.transform = 'rotate(0deg)'
          el.closest('.activitydiv').querySelector('.activitysidecont').style.opacity = '0'
        }
      }
    })
  }
  
  useEffect(() => {
    db.collection('projects').doc('projects').onSnapshot(doc => {
      const projects = doc.data()
      setProjList(projects)  
      projects && projects.forEach(el => {
        if(el.projectid === proj.projectid) {  
          tasklist && tasklist.forEach(el => { 
            if(el.taskid === taskid) { 
              let taskindex = tasklist.indexOf(el)
              setUpdatesList(tasklist[taskindex].taskupdates)
            } 
          })
        }
      }) 
    }) 
    //set activeicon in edit project container
    iconspack && iconspack.map(el => {
      if(proj.icon === el.class) 
        setActiveIcon(iconspack.indexOf(el))
    }) 
    openCloseAct()
  },[])
  
 
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid oneprojectcont">
          <div className="projecttoolbar">
            <h4><i className="far fa-calendar-alt"></i> Jan 15 2020</h4>
            <h3>Tasks</h3>
            <div>
              <button className="editprojbtn" onClick={() => showEditFunc()}>Edit Project</button>
              <button onClick={() => showAddFunc()}>Add Task</button>
            </div>
          </div>
          <div className="projectcontent">
            <div className="timelinecont">
              <hr/>
                {proj.tasks && proj.tasks.map(el => {
                  return <div className="timecircle"></div>
                })}
            </div>
            {proj.tasks.length?alltasks:<h4 className="notasksmsg">You have no tasks.</h4>}
          </div>
        </div>
        <div className="pageside">
          <div className="pagesidebg"></div>
          <div className="titleshead">
            <div>
              <h4>{proj.name}</h4>
              <h6>Client Name</h6>
            </div>
            <div>
              <small>{proj.daysleft} days left</small>
              <small>Tasks: {proj.tasks.length}</small>
            </div>
          </div>
          <Circle percent={proj.progress} text={proj.progress+"%"} text2="Complete" color={proj.color} /> 
          <div className="realtimediv">
            <h5>Real-time updating</h5>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="sidecontent hidescroll">
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>
                <h4>Recent Activity</h4>
                <h6>January 05 2021</h6>
              </div>
              {proj.activity.length?
              <small className="clearbtn" onClick={() => clearActivity()}>Clear</small>
              :""}
            </div>
            <div className="sidecontentinner hidescroll">
              {proj.activity.length?recentactivity:<h4 className="noactivity">No Activity Yet...</h4>}
            </div>
          </div> 
          <div className="actionsection">
            <button style={{background: proj.color, borderColor:proj.color}} onClick={() => markComplete()}>Mark Complete</button>
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
        <div className="updatescont" data-update={update}>
          {updatesrow}
        </div>
        <hr/>
        <div className="postcont">
          <textarea placeholder="Add an update..." onChange={(e) => setUpdText(e.target.value)} value={updtext}/>
          <button onClick={() => addUpdate()}>Add Update</button>
        </div>
      </div> 

      <div className="addcover" style={{display: showadd?"block":"none"}}></div>
      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
        <div className="addsection">
          <a className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></a>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>{addedit?"Add":"Edit"} Task</h4></div>
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
              <button onClick={() => setTaskPrior('low', setPriorPromise(0))} className={taskprior==='low'?"lowprior priorbtn activelowbtn":"lowprior priorbtn"}><i className="fas fa-star"></i>Low Priority</button>
              <button onClick={() => setTaskPrior('high', setPriorPromise(0))} className={taskprior==='high'?"highprior priorbtn activehighbtn":"highprior priorbtn"}><i className="fas fa-star"></i>High Priority</button>
            </div>
            <label> 
              <h6>Notes</h6>
              <textarea placeholder="add notes to this task..." onChange={(e) => setTaskNotes(e.target.value)} value={tasknotes} />
            </label>
          </div>
          <div className="editprojbtngroup">
            <button style={{padding:"10px 20px"}} onClick={() => addTask()}><i className={addedit?"fal fa-plus":"fal fa-edit"}></i>{addedit?"Add":"Edit"}</button>
            <button style={{background:"var(--red)", borderColor:"var(--red)"}} onClick={() => deleteTask()}>Delete</button>
          </div>
        </div>
      </div> 

      <div className="addcover" style={{display: showedit?"block":"none"}}></div>
      <div className="addprojectcont" style={{bottom: showedit?"0":"-190%"}}>
        <div className="addsection">
          <a className="closeadd"><i className="fal fa-times" onClick={() => setShowEdit(!showedit)}></i></a>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Edit Project</h4></div>
          <div className="content hidescroll">
            <Inputs title="Project Name" placeholder="E.g. Web Development" onChange={(e) => setProjName(e.target.value)} value={projname} />
            <Inputs title="Days Left" onChange={(e) => setDaysLeft(e.target.value)} value={daysleft}/> 
            <label>
              <h6>Category</h6>
              <select value={projcat} onChange={(e) => setProjCat(e.target.value)} >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Financial">Financial</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Media">Media</option>
                <option value="General Services">General Services</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <Inputs title="Progress" onChange={(e) => setProjProgress(e.target.value)} value={projprogress} />
            <div className="switchbox">
              <h6>Active</h6> 
              <Switchs onChange={(e) => setProjActive(e.target.checked)} selected={projactive} checked={projactive}/>
            </div>
            <div className="switchbox">
              <h6>Project Color</h6>
              <Inputs type="color" onChange={(e) => setProjColor(e.target.value)} value={projcolor}/>  
            </div>
            <div className="switchbox iconpick">
              <h6>Project Icon</h6> 
              <div className="iconspack">
                {iconsrow}
              </div>
            </div>
          </div> 
          <div className="editprojbtngroup">
            <button onClick={() => saveProject()}>Save</button>
            <button onClick={() => deleteProject()} style={{background: "var(--red)", borderColor:"var(--red)"}}>Delete Project</button>
          </div>
        </div>
      </div>  
 
    </div>
  )
}

export default OneProject