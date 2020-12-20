import React from 'react'

function Circle(props) {
  return (
    <div class="progcircle" data-aos="percentage">
        <svg viewBox="0 0 36 36">
        <path class="circle-bg" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <path class="circle" strokeDasharray={props.percent} d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"></path>
        <text x="18" y="18.35" class="percentage">{props.text}</text>
        <text x="18" y="22.35" class="subtext">{props.text2}</text>
        </svg> 
    </div>
  ) 
}

export default Circle