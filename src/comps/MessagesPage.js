import React from 'react'
import Messages from './Messages'

function MessagesPage() {
  return (
    <div className="messagespage apppage">
      <Messages amount={8}/>
    </div>
  )
}

export default MessagesPage