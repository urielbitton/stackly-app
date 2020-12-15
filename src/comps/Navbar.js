import React from 'react'

function Navbar() {
  return (
    <nav>
      <div className="logocont">
        <img src="https://i.imgur.com/wazsi0l.png" alt=""/>
        <h5>Stackly.</h5>
      </div>

      <div className="toolbar">
        <div className="searchbox">
          <i className="far fa-search"></i>
        </div>
        <div className="msgbox">
          <i className="far fa-comments-alt"></i>
        </div>
        <div className="notifbox">
        <i className="far fa-bell"></i>
        </div>
        <div className="optionsbox">
          <i className="fas fa-th"></i>
        </div>
      </div>
    </nav>
  )
}

export default Navbar