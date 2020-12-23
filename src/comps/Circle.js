import React from 'react'

function Circle(props) {
  return (
    <div className="progcircle" data-aos="percentage">
        <svg viewBox="0 0 36 36">
        <path className="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path className="circle" style={{stroke:props.color}} strokeDasharray={props.percent} d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="18.35" className="percentage" style={{fill:props.color}}>{props.text}</text>
        <text x="18" y="22.35" className="subtext" style={{fill:props.color}}>{props.text2}</text>
        </svg> 
    </div>
  ) 
}

export default Circle