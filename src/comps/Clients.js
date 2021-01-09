import React, {useContext, useState} from 'react'
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom"
import { StoreContext } from './StoreContext'
import ClientCard from './ClientCard'
import {Inputs} from './Inputs'

function Clients(props) {

  const {clients} = useContext(StoreContext)

  const [showadd, setShowAdd] = useState(false)
  const [section, setSection] = useState(1)
  const [cardColor, setCardColor] = useState('')

  const clientsrow = clients && clients.map(cli => {
    return <ClientCard cli={cli} key={cli.id} sendclientid={props.sendclientid}/>
  })
  console.log(cardColor)

  return (
    <div className="clientspage apppage">
      <div className="pagegrid">
        <div className="pagemaingrid">
          <div className="pagetitles">
            <h4>Clients</h4>
            <div className="actions">
              <div><i className="far fa-sliders-h"></i></div>
              <Link to="/clients/addclient"><button onClick={() => setShowAdd(!showadd)}><i className="far fa-plus"></i>Create Client</button></Link>
            </div>
          </div>
          {clientsrow} 
        </div>
      </div>

      <div className="addprojectcont" style={{bottom: showadd?"0":"-190%"}}>
      <div className="addsection" style={{left: section===1?"0":"-200%"}}>
        <Link to="/clients" className="closeadd"><i className="fal fa-times" onClick={() => setShowAdd(!showadd)}></i></Link>
        <div className="titles"><img src="https://i.imgur.com/wazsi0l.png" alt=""/><h4>Create Client</h4></div>
        <div className="content">
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

    </div>
  )
}

export default Clients