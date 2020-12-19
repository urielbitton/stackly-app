import React, {createContext, useState} from 'react'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const [projects] = useState([
    {
      id: 1,
      title: 'Web Design',
      client: 'Intellisense Inc.',
      progress: 60,
      tasksnum: 8,
      daysleft: 7,
      color: '#35b6fa',
      shadow: 'rgba(48,210,252,0.4)',
    }
  ])
  const [clients] = useState([
     
  ])



  return (
    <StoreContext.Provider value={{projects, clients}}>
      {props.children}
    </StoreContext.Provider>
  )

}

export default StoreContextProvider