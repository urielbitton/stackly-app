import React from 'react'

export function Inputs(props) {
  return ( 
    <label className="labelinput">
      <h6>{props.title}</h6>
      <input placeholder={props.placeholder} type={props.type} value={props.value} onChange={(e) => props.onchange(e.target.value)}/>
    </label>
  )  
}  

export function Switchs(props) {
  return (   
    <div className="switchdiv"> 
    <h6>{props.title}</h6>    
    <label class="form-switch">
        <input type="checkbox" onChange={(e) => props.onchange(e.target.checked)} checked={props.checked}/>
        <i></i> 
    </label>  
    </div>
  )  
} 

