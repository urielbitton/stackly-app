import React from 'react'
import {Switchs} from './Inputs'
import Title from './Title'

function SettingsGeneral() {
  return (
    <div className="settingsgeneral">
      <h2>Preferences</h2>
      <div className="settingsgrid switchgrid">
        <h5>General</h5>
        <div><h6>Enable dark mode</h6><Switchs /></div>
      </div>

      <Title title="Preferences | Stackly App"/>
    </div>
  )
}

export default SettingsGeneral