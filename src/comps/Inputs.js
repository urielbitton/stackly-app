import React from 'react'

export function Inputs(props) {
  return ( 
    <label className="labelinput">
      <h6>{props.title}</h6>
      <i className={props.iconclass}></i>
      <input style={{paddingR: props.iconclass?"40px":"10px"}} placeholder={props.placeholder} type={props.type} value={props.value} onChange={(e) => props.onChange(e)}/>
    </label>
  )   
}  

export function Switchs(props) {
  return (   
    <div className="switchdiv"> 
    <h6>{props.title}</h6>    
    <label className="form-switch">
        <input type="checkbox" onChange={(e) => props.onChange(e)} checked={props.checked}/>
        <i></i> 
    </label>  
    </div>
  )  
} 

