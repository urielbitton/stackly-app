import React from 'react'
import {Helmet} from "react-helmet"

function Title(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  )
} 

export default Title