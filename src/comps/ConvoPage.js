import React from 'react'
import Conversations from './Conversations'

function ConvoPage(props) {
  return (
    <div className="convopage apppage">
      <Conversations amount={8} />
    </div>
  )
}

export default ConvoPage