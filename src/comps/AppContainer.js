import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Homecont from './Homecont'

function AppContainer() { 

  const [fold, setFold] = useState(false)

  return (
    <div className={fold?"appcontainer foldappcontainer":"appcontainer"}>
      <Sidebar foldsidebar={() => setFold(!fold)} />
      <Homecont />
    </div>
  )
}

export default AppContainer