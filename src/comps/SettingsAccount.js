import React, { useContext, useEffect, useState } from 'react'
import {Inputs} from './Inputs'
import { StoreContext } from './StoreContext'
import firebase from 'firebase'
import {db} from './Fire'
import Title from './Title'

function SettingsAccount(props) {

  const {setNotifs} = useContext(StoreContext)

  const [userlist, setUserList] = useState([])
  const [userinfo, setUserInfo] = useState([])
  const [uploaded, setUploaded] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [company, setCompany] = useState('')
  const [jobtitle, setJobtitle] = useState('')
  const [profimg, setProfImg] = useState('')
  const [deleteword, setDeleteWord] = useState('')
  const user = firebase.auth().currentUser

  function uploadImg() {
    let file = document.querySelector(".uploadpiclogo").files[0]
    if(file.size <= 2097152) {
      setUploaded(!uploaded) 
      let reader = new FileReader()
      reader.onloadend = function(){
        setProfImg(reader.result) 
      } 
      if(file) {
        reader.readAsDataURL(file)
      } 
    }
    else {
      props.shownotif(4000)
      setNotifs([{icon: 'fal fa-exclamation-circle',text: 'Image is too large (max. 2MB).'}])
    }
  } 
  function saveImg() {
    setUploaded(!uploaded)
    saveData()
    props.shownotif(4000)
    setNotifs([{icon: 'fal fa-save',text: 'Your profile image has been saved.'}])
  }
  function saveAccount() {
    saveData()
    props.shownotif(4000)
    setNotifs([{icon: 'fal fa-save',text: 'Your account settings have been saved.'}])
  }
  function removeProfImg() {
    setUploaded(false)
    setRemoved(!removed)
    setProfImg('')
  }
  function saveData() {
    user.updateProfile({
      displayName: fname+" "+lname,
    }) 
    user.updateEmail(email)
    let userObj = {
      fullname: fname+" "+lname,
      email,
      phone,
      city,
      country,
      company,
      jobtitle,
      profimg,
    } 
    db.collection('users').doc(user.uid).update({
      userinfo: userObj
    }) 
  }
  function deleteAccount() {
    if(deleteword === fname.toLowerCase()) {
      db.collection('users').doc(user.uid).delete()
      user.delete().then(() => {
        console.log('Account has been deleted.')
      }).catch((error) => {
        props.shownotif(4000)
        setNotifs([{icon: 'fal fa-exclamation-circle',text: 'An error has occured. Please try again.'}])
      })
    }
  } 

  useEffect(() => {
    db.collection('users').doc(user.uid).onSnapshot(use => {
      const userlist = use.data()
      setUserList(userlist)     
      setUserInfo(userlist.userinfo)
      setFname(userlist.userinfo.fullname.split(' ')[0])
      setLname(userlist.userinfo.fullname.split(' ')[1])
      setEmail(userlist.userinfo.email)
      setPhone(userlist.userinfo.phone)
      setCity(userlist.userinfo.city)
      setCountry(userlist.userinfo.country)
      setCompany(userlist.userinfo.company)
      setJobtitle(userlist.userinfo.jobtitle)
      setProfImg(userlist.userinfo.profimg)
    })
  },[])

  return (
    <div className="settingsaccount">
      <h2>Account</h2>
      <div className="settingsgrid">
        <div className="profcont">
          <img src={profimg.length?profimg:"https://i.imgur.com/yxij2KH.jpg"} alt=""/>
          {
            !uploaded?
            <label>
              <input type="file" className="uploadpiclogo" onChange={() => uploadImg()}/>
              <div className="uploadbtn">Upload</div> 
            </label>:
            <button className="saveimgbtn" onClick={() => saveImg()}>Save</button>
          }
          <button onClick={!removed?() => removeProfImg():() => {saveData();setRemoved(!removed)}}>{!removed?"Remove":"Save"}</button>
        </div>
        <hr/>
        <Inputs title="First Name" placeholder="E.g. John" value={fname} onChange={(e) => setFname(e.target.value)} />
        <Inputs title="Last Name" placeholder="E.g. Hopley" value={lname} onChange={(e) => setLname(e.target.value)} />
        <Inputs title="Email" placeholder="E.g. jhopley@stackly.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Inputs title="Phone Number" placeholder="E.g. 5140399015" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Inputs title="City" placeholder="E.g. Montreal" value={city} onChange={(e) => setCity(e.target.value)} />
        <Inputs title="Country" placeholder="E.g. Canada" value={country} onChange={(e) => setCountry(e.target.value)} />
        <Inputs title="Company Name" placeholder="E.g. Jsense Inc." value={company} onChange={(e) => setCompany(e.target.value)} />
        <Inputs title="Job Title" placeholder="E.g. Web Developer" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} />
        <button className="settingsbtn" onClick={() => saveAccount()}>Save Changes</button>
        <hr/>
        <div className="removeacccont">
          <div>
            <h6>Delete Account</h6>
            <small>If you delete your account, all your data will be lost.</small>
            <Inputs placeholder={`Type in '${fname.toLowerCase()}' to delete your account.`} value={deleteword} onChange={(e) => setDeleteWord(e.target.value)} />
          </div>
          <button disabled={deleteword===fname.toLowerCase()?false:true} style={{opacity: deleteword===fname.toLowerCase()?"1":"0.3"}} onClick={deleteword===fname.toLowerCase()?() => deleteAccount():null}>Delete Account</button>
        </div> 
        <div className="spacer"></div>
      </div>

      <Title title="My Account | Stackly App"/> 
    </div>
  )
}

export default SettingsAccount