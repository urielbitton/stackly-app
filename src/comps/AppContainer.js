import React from 'react'
import Sidebar from './Sidebar'
import Homecont from './Homecont'

function AppContainer() { 
  return (
    <div className="appcontainer">
      <Sidebar />
      <Homecont />
    </div>
  )
}

export default AppContainer