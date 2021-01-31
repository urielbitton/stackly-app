import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import { StoreContext } from './StoreContext'
import ClientCard from './ClientCard'
import {Inputs} from './Inputs'
import Title from './Title'
import firebase from 'firebase'
import {db} from './Fire'

function Clients(props) {

  const {clients} = useContext(StoreContext)

  const [showadd, setShowAdd] = useState(false)
  const [section, setSection] = useState(1)
  const [cardColor, setCardColor] = useState('#056dff')


  return (
    <div className="clientspage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
          <div className="pagetitles">
            <div className="pagetitlestxt">
              <h4>Clients</h4>
              <h6>0 total</h6>  
            </div>
            <div className="actions">
              <div><i className="far fa-sliders-h"></i></div>
              {/*<Link to="/clients/addclient"><button onClick={() => setShowAdd(!showadd)}><i className="far fa-plus"></i>Create Client</button></Link>*/}
            </div>
          </div>
          
        </div>
      </div>

      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
      <div className="addsection" style={{left: section===1?"0":"-200%"}}>
        <Link to="/clients" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></Link>
        <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Create Client</h4></div>
        <div className="content hidescroll">
          <Inputs title="Full Name" placeholder="Jake Johnson"/>
          <Inputs title="Company Name" placeholder="Intellisense Inc."/>
          <Inputs title="Email" type="email" placeholder="jjohnson@gmail.com"/>
          <Inputs title="Phone Number" placeholder="514-677-0320"/>
          <Inputs title="Profession" placeholder="Interior Designer"/>
          <Inputs title="Card Color" type="color" value={cardColor} onchange={(val) => setCardColor(val)}/>
        </div>
        <button>Create</button>
        </div>
      </div>

      <Title title="Clients | Stackly App"/>
    </div>
  )
}

export default Clients