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
      color: '#056dff',
      shadow: 'rgba(48,210,252,0.4)', 
      tasks: [ 
        {name:"Landing Page",date: "Jan 06 2021",deadline: "Jan 06 2021", color:'default', status:'Completed', priority:'low'},
        {name:"Logo Design",date: "Jan 06 2021",deadline: "Jan 06 2021", color:'default', status:'In Progress', priority:'high'},
        {name:"Wordpress Install",date: "Jan 06 2021",deadline: "Jan 06 2021", color:'default', status:'In Progress', priority:'low', updates: [{text:"Just finished the UI design. Moving on to plugins.",date:"Jan 19 2021",person:"Uriel Bitton",edit:false}]},
      ],
      activity: [
        {person:'Uriel Bitton',task:'Designed landing page UI',time:'2 hours'},
        {person:'Hank Xavier',task:'Requested homepage redesign',time:'1 hour'},
      ],
      active: true,
    },
    {
      id: 2,
      title: 'Law Service',
      client: 'Zerdoun law',
      progress: 80,
      tasksnum: 12,
      daysleft: 5,
      color: '#bdeb34',
      shadow: 'rgba(189, 235, 52,0.4)',
      activity: [
        {person:'Cindy Bitton',task:'Reviewed Documents',time:'5 min'},
        {person:'Cindy Bitton',task:'Created appeal',time:'3 hours'},
        {person:'Jake Lander',task:'Sent documents',time:'6 hours'},
      ],
      active: true,
    },
    {
      id: 3,
      title: 'Interior Design',
      client: 'John Hopley',
      progress: 40,
      tasksnum: 4,
      daysleft: 20,
      color: '#ff0a64',
      shadow: 'rgba(255, 10, 100,0.4)',
      activity: [],
      active: true,
    }
  ])
  const [clients] = useState([
     {
       id: 1,
       name: "Uriel Bitton",
       profession: 'App Developer',
       projnum: 2,
       projectids: [],
     },
     {
      id: 2,
      name: "Cindy Bitton",
      profession: 'Attorney',
      projnum: 5,
      projectids: [],
    }
  ]) 
  const [notifs, setNotifs] = useState([
    {} 
  ]) 


  return (
    <StoreContext.Provider value={{projects, clients, notifs, setNotifs}}>
      {props.children}
    </StoreContext.Provider>
  )

}

export default StoreContextProvider