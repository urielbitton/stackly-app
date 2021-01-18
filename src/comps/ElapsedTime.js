import React, {useState, useEffect} from 'react'

function ElapsedTime(props) {
 
  const [elapsedTime, setElapsedTime] = useState('')

  function msToTime(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    if(hours < 1) {
      if(minutes < 1)
        return "A few seconds ago"
      else if (minutes === 1)
        return "A minute ago"
      else 
        return minutes+" minutes ago"
    }
    else if(hours === 1) 
      return "One hour ago"
    else 
      return hours+" hours ago"
  } 

  useEffect(() => {
    var storedDate = new Date(props.providedtime)
    var nowDate = new Date()
    var elapsedTime = nowDate.getTime() - storedDate.getTime()
    setElapsedTime(msToTime(elapsedTime))
  },[])

  return <>{elapsedTime}</>
}

export default ElapsedTime