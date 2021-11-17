import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import Circle from './Circle'
import { Inputs, Switchs } from './Inputs'
import {StoreContext} from './StoreContext'
import firebase from 'firebase'
import {db} from './Fire'
import SendInvite from './SendInvite'
import ElapsedTime from './ElapsedTime'
import {SendNotif} from './SendNotif'
import UserOpts from './UserOpts'
import DropFiles from './DropFiles'

function OneProject(props) { 

  const {setNotifs} = useContext(StoreContext)
  const {proj} = props
  
  const [userlist, setUserList] = useState([])
  const [slide, setSlide] = useState(false)
  const [taskid, setTaskId] = useState('')
  const [taskname, setTaskName] = useState('')
  const [taskdue, setTaskDue] = useState('')
  const [taskstatus, setTaskStatus] = useState('Not Started')
  const [taskupdates, setTaskUpdates] = useState([])
  const [tasknotes, setTaskNotes] = useState('')
  const [taskcolor, setTaskColor] = useState('#1cb7ff')
  const [taskcreatorid, setTaskCreatorId] = useState('')
  const [update, setUpdate] = useState(0)
  const [showadd, setShowAdd] = useState(false)
  const [showedit, setShowEdit] = useState(false)
  const [taskprior, setTaskPrior] = useState('')
  const [updtext, setUpdText] = useState('')
  const [tempUpdText, setTempUpdText] = useState('')
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
  const [showinv, setShowInv] = useState(false)
  const [notify, setNotify] = useState('')
  const [selectuserid, setSelectUserId] = useState('')
  const [clientActiveStatus, setClientActiveStatus] = useState()
  const [keyword, setKeyword] = useState('') 
  const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')
  const user = firebase.auth().currentUser
  const [editallow, setEditAllow] = useState(proj.creatorid === user.uid)
  const [notifsnum, setNotifsNum] = useState(0)
  const [inviteaccess, setInviteAccess] = useState(false)
  let history = useHistory()
  let timers
  let gendate = new Date().toDateString().slice(4)
   


  const alltasks = proj.tasks && proj.tasks.map(el => {
    return <div className="taskrowcont">
      <hr/>
      <div className="timecircle" style={{background: el.taskcolor}}></div>
      <div className="taskrow" style={{background: el.taskcolor+"20", opacity: el.taskstatus==='Completed'?"0.4":"1"}}>
        <h4>{shortenMsgs(el.taskname)}</h4>
        <div className="taskbox">
          <h6>Date Due: <span>{el.taskdue}</span></h6>
          <h6>Status <span style={{color: "var(--color)"}}>{el.taskstatus}</span></h6>
        </div>
        <div className="taskboxopts">
          <button onClick={() => slideDetails(el)}>Details</button>
          <i className="far fa-edit" onClick={() => editTask(el)}></i>
        </div>
      </div> 
    </div>
  }) 
  const recentactivity = proj.activity && proj.activity.slice(0).reverse().map(el => {
    return <div className="activitydiv" style={{paddingBottom:"15px"}}>
      <div className="actcont">
        <div className="clientcicrcle">
          <small>{el.actperson.split(' ')[0][0]}{el.actperson.indexOf(' ')> -1?el.actperson.split(' ')[1][0]:""}</small> 
        </div>
        <div>
          <h5>{el.actaction}: {el.acttext}</h5>
          <h6><ElapsedTime providedtime={el.actdate.toDate()}/></h6> 
        </div>
        </div>
        <i className="fal fa-angle-right activitybtn"></i>
        <div className="activitysidecont">
          <small>Created at: </small>
          <small>Added by: {el.actperson}</small>
        </div>
    </div> 
  })
  const updatesrow = taskupdates && taskupdates.slice(0).reverse().map(el => {
    return <div className="updatebox" data-update={update}>
      <div> 
        <div className="clientcircle"><small>{el.updateperson.split(' ')[0][0]}{el.updateperson.split(' ')[1][0]}</small></div>
        <h5>{el.updateperson}</h5>
        <h6>•&emsp;<span><ElapsedTime providedtime={el.updatedate.toDate()}/></span></h6>
      </div> 
      <textarea disabled={!el.edit} value={el.updatetext} onChange={(e) => {el.updatetext = e.target.value;setUpdate(prev => prev+1);setTempUpdText(e.target.value)}} style={{border: el.edit?"1px solid #ddd":"none", marginBottom: el.edit?"5px":"0px"}}/>
      <div style={{display: el.updatecreatorid===user.uid?"flex":"none"}}> 
        <small onClick={!el.edit?el.updatecreatorid===user.uid?() => editUpdateText(el):null:() => saveUpdateText(el)}>{!el.edit?"Edit":"Save"}</small>
        <small onClick={el.updatecreatorid===user.uid?() => deleteUpdate(el):null}>Delete</small>
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
    {class: "fa-project-diagram", title: "General"},
    {class: "fa-mobile", title: 'Mobile App'}
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
    setTempUpdText(el.updatetext)
    setUpdate(prev => prev+1) 
  }
  function saveUpdateText(el) {
    el.edit = !el.edit
    setUpdate(prev =>prev+1)
    proj.tasks && proj.tasks.forEach(el2 => {
      if(el2.taskid === taskid) {
        let taskindex = proj.tasks.indexOf(el2)
        let updateindex = taskupdates.indexOf(el)
        proj.tasks[taskindex].taskupdates[updateindex].updatetext = tempUpdText
        db.collection("projects").doc(proj.projectid).update(proj) 
      }  
    })
  }
  function deleteUpdate(el) {
    proj.tasks && proj.tasks.forEach(el2 => {
      if(el2.taskid === taskid) { 
        setTaskUpdates(el2.taskupdates)
        let taskindex = proj.tasks.indexOf(el2)  
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
          tasknotes,
          taskcreatorid: user.uid
        } 
        proj.tasks.push(taskobj)
        db.collection("projects").doc(proj.projectid).update(proj)  
        props.shownotif(4000) 
        setNotifs([{icon: 'fal fa-check-circle',text: 'The task has been added to your project.'}])
        createActivity('Added task',taskname) 
        SendNotif('New Task', 
        `${user.displayName} has added task '${taskname}' to your project '${proj.name}'.`,
         `project/${proj.projectid}`, 
         'View now',
         '#e04f4c',
         'fa-list-ul',
         notifsnum,
         proj.client.clientid
        ) 
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
          tasknotes,
          taskcreatorid: user.uid
        } 
        proj.tasks && proj.tasks.forEach(el => {
          if(el.taskid === taskid) {
            let taskindex = proj.tasks.indexOf(el)
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
      timers = setTimeout(() => { setShowAdd(!showadd)}, 30)
      openCloseAct()
      updateProgress() 
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
        updatedate: firebase.firestore.Timestamp.now(),
        updateperson: user.displayName,
        updatecreatorid: user.uid,
        edit: false
      }  
      proj.tasks && proj.tasks.forEach(el => {
        if(el.taskid === taskid) {
          setTaskUpdates(el.taskupdates)
          let taskindex = proj.tasks.indexOf(el)
          proj.tasks[taskindex].taskupdates.push(updateobj)
          db.collection("projects").doc(proj.projectid).update(proj) 
          createActivity('Added update',`on task '${proj.tasks[taskindex].taskname}'`)
        }  
      }) 
    } 
    setUpdText('')
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
    const projRef = db.collection("projects").doc(proj.projectid)
    projRef.delete() 
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
    setTaskCreatorId(el.taskcreatorid)
  }
  function deleteTask() {
    proj.tasks && proj.tasks.forEach(el => {
      if(el.taskid === taskid) {
        let taskindex = proj.tasks.indexOf(el)
        proj.tasks.splice(taskindex,1) 
        db.collection("projects").doc(proj.projectid).update(proj) 
      } 
    })  
    updateProgress()
    timers = setTimeout(() => { setShowAdd(!showadd)}, 30)
  }
  function updateProgress() {
    let tasksnum = proj.tasks.length
    let activetasksnum = proj.tasks.filter((task) => task.taskstatus === 'Completed').length
    let projprogress = Math.round((activetasksnum/tasksnum)*100)
    proj.progress = projprogress
    db.collection("projects").doc(proj.projectid).update(proj) 
  }
  function createActivity(action,text) {
    let actobj = {
      actperson: user.displayName,
      acttext: text,
      actaction: action,
      actdate: firebase.firestore.Timestamp.now()
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
  function inviteByUser() {
    db.collection('users').doc(selectuserid).onSnapshot(doc => {
      const useData = doc.data()
      let inviteobj = {projectid: proj.projectid, projectname: proj.name, inviter:user.displayName}
      if(selectuserid.length && !useData?.invites?.includes(proj.projectid)) {
        db.collection('users').doc(selectuserid).update({
          invites: firebase.firestore.FieldValue.arrayUnion(inviteobj) 
        }).then(doc => {
          setNotify('The selected user has been invited to your project.')
          setSelectUserId('') 
        })
      }
      else if(useData?.invites?.includes(proj.projectid)) {
        setNotify('This user has already been invited to your project. You can ask them to accept your invitation on their account.')
      }
      else {
        setNotify('Please select a user to invite to your project')
      }
    })
  }
  const usersrow = userlist && userlist.map(el => {
    if(pattern.test(el.userinfo.fullname.toLowerCase()) && el.uid !== user.uid)
    return <div className="usersrowdiv">
      <h6>{el.userinfo.fullname}<span>{el.userinfo.email}</span></h6>
      <button onClick={selectuserid===el.uid?() => setSelectUserId(''):() => setSelectUserId(el.uid)} style={{width: selectuserid===el.uid?"40px":""}}>{selectuserid===el.uid?<i className="fal fa-check"></i>:"Select"}</button>
    </div>   
  }) 
  function shortenMsgs(text) {
    if(text.length > 50) {
      let shortname = text.substring(0,50) + "..."
      return shortname
    }
    else {
      return text
    }
  }
  
  useEffect(() => { 
    db.collection('users').orderBy('userinfo.fullname','asc').onSnapshot(snap => {
      let users = []
      snap.forEach(use => {
        users.push(use.data())
      })
      setUserList(users)
    })
    db.collection('notifications').doc(user.uid).onSnapshot(snap => {
      setNotifsNum(snap.data()?.notifsnum)
    })
    db.collection('users').doc(proj.client.clientid===user.uid?proj.creatorid:proj.client.clientid).onSnapshot(snap => {
      setClientActiveStatus(snap.data()?.activestatus) 
    })
    //set activeicon in edit project container
    iconspack && iconspack.map(el => { 
      if(proj.icon === el.class) 
        setActiveIcon(iconspack.indexOf(el))
    })  
    openCloseAct()
    return() => {
      clearTimeout(timers) 
      setInviteAccess(false)
    }
  },[inviteaccess])
 
  return (
    <div className="oneprojectpage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid oneprojectcont">
          <div className="projecttoolbar">
            <h4><i className="far fa-calendar-alt"></i> {gendate}</h4>
            <h3>Tasks ({proj.tasks.length})</h3>
            <div>
              <button style={{display: editallow?"inline":"none"}} className="editprojbtn" onClick={editallow?() => showEditFunc():null}>Edit Project</button>
              <button onClick={() => showAddFunc()}>Add Task</button>
            </div>
          </div>
          <div className="projectcontent hidescroll">
            <div className="timelinecont">
              <hr/>
            </div>
            {proj.tasks.length?alltasks:<h4 className="notasksmsg">There are no tasks yet.</h4>}
          </div>
        </div> 
        <div className="pageside">
          <div className="pagesidebg"></div>
          <div className="titleshead">
            <div>
              <h4>{proj.name}</h4>
              <h6>Contractor:  
                <span className={proj.creatorid===user.uid?"":"useropts useroptsopen"}> {proj.creatorname}
                  <UserOpts left="auto" right="0" name={proj.creatorname} id={proj.creatorid} activestatus={clientActiveStatus}/>
                </span>
              </h6> 
              <h6>Client:  
                <span className={proj.creatorid!==user.uid?"":"useropts useroptsopen"}> {proj.client.clientname}
                  <UserOpts left="auto" right="0" name={proj.client.clientname} id={proj.client.clientid} activestatus={clientActiveStatus}/> 
                </span>
              </h6> 
            </div>
            <div>
              <small>Days left: {proj.daysleft}</small>
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
              <small style={{display: editallow?"block":"none"}} className="clearbtn" onClick={editallow?() => clearActivity():null}>Clear</small>
              :""}
            </div>
            <div className="sidecontentinner hidescroll">
              {proj.activity.length?recentactivity:<h4 className="noactivity">No Activity Yet...</h4>}
            </div>
          </div> 
          <div className="actionsection">
            {
              editallow?
              <button style={{background: proj.color, borderColor:proj.color, display:editallow?"block":"none"}} onClick={editallow?() => setShowInv(!showinv):null}>Invite Client</button>
              :""
            }
          </div>
        </div> 
      </div> 

      <div className="tasksidecont" style={{right: slide?"0":"-550px"}}>
        <i className="fal fa-times" onClick={() => setSlide(!slide)}></i>
        <div className="titlecont">
          <h2>{taskname}</h2>
          <h6>Client: <span>{proj.client.clientname}</span></h6> 
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
            <Inputs disabled={!addedit?taskcreatorid===user.uid?null:"disabled":""} title="Task title" placeholder="E.g. Install Plugins" onChange={(e) => setTaskName(e.target.value)} value={taskname} />
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
            <Inputs title="Date Due" disabled={!addedit?taskcreatorid===user.uid?null:"disabled":""} type="date" onChange={(e) => setTaskDue(e.target.value)} value={taskdue} />
            <div className="addpriorcont">
              {
                !addedit?taskcreatorid===user.uid?<>
                  <button onClick={() => setTaskPrior('low', setPriorPromise(0))} className={taskprior==='low'?"lowprior priorbtn activelowbtn":"lowprior priorbtn"}><i className="fas fa-star"></i>Low Priority</button>
                  <button onClick={() => setTaskPrior('high', setPriorPromise(0))} className={taskprior==='high'?"highprior priorbtn activehighbtn":"highprior priorbtn"}><i className="fas fa-star"></i>High Priority</button>
                </>:"":""
              }
            </div> 
            <label> 
              <h6>Notes</h6>
              <textarea placeholder="add notes to this task..." onChange={(e) => setTaskNotes(e.target.value)} value={tasknotes} />
            </label>
          </div>
          <div className="editprojbtngroup">
            <button style={{padding:"10px 20px"}} onClick={() => addTask()}><i className={addedit?"fal fa-plus":"fal fa-edit"}></i>{addedit?"Add":"Edit"}</button>
            <button style={{display:!addedit?taskcreatorid===user.uid?"block":"none":"",background:"var(--red)", borderColor:"var(--red)"}} onClick={taskcreatorid===user.uid?() => deleteTask():null}>Delete</button>
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
      
      <div className="addcover" style={{display: showinv?"block":"none"}}></div>
      <div className="addprojectcont" style={{bottom: showinv?"0":"-190%"}}>
        <div className="addsection">
          <a className="closeadd"><i className="fal fa-times" onClick={() => {setShowInv(!showinv);setSelectUserId('');setNotify('')}}></i></a>
          <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Invite Client</h4></div>
          <div className="content hidescroll">
            <SendInvite title="Invite client by email" inviteaccess={inviteaccess}/>
            <div className="sendinvitecont">
              <Inputs title="Invite client by user name" iconclass="fal fa-search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <div className="usersrowhead"><h6>User name - Email</h6><h6>Invite</h6></div>
              {usersrow}
              {
                selectuserid?<button onClick={() => inviteByUser()}>Invite User</button>:
                <button disabled style={{opacity: "0.3"}}>Invite User</button> 
              }
              <small>{notify}</small> 
            </div>
          </div> 
          <div className="editprojbtngroup">
            <button onClick={() => {setShowInv(!showinv);setSelectUserId('');setNotify('')}}>Done</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default OneProject