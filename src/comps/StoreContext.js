import React, {createContext, useState} from 'react'

export const StoreContext = createContext()

const StoreContextProvider = (props) => {

  const [convinfo, setConvInfo] = useState({
    unreadmsgs: 0
  })
  const [notifs, setNotifs] = useState([
    {} 
  ]) 


  return (
    <StoreContext.Provider value={{notifs, setNotifs, convinfo, setConvInfo}}>
      {props.children}
    </StoreContext.Provider>
  )

}

export default StoreContextProvider