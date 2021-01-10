import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link, NavLink} from "react-router-dom"
import SettingsAccount from './SettingsAccount'
import SettingsGeneral from './SettingsGeneral'
import Help from './Help'
import Support from './Support'

function Settings(props) {
  return (
    <div className="settingspage apppage">
      <div className="settingsnav">
        <h2>Settings</h2>
        <div className="menu">
          <NavLink exact to="/settings" activeClassName="activesettlink">Account</NavLink>
          <NavLink exact to="/settings/general" activeClassName="activesettlink">Preferences</NavLink>
          <hr/>
          <NavLink exact to="/settings/support" activeClassName="activesettlink">Support</NavLink>
          <NavLink exact to="/settings/help" activeClassName="activesettlink">Help Center</NavLink>
        </div>
      </div>
      <div className="settingspagecont">
        <Switch>
          <Route exact path="/settings">
            <SettingsAccount shownotif={props.shownotif} />
          </Route>
          <Route path="/settings/general">
            <SettingsGeneral shownotif={props.shownotif} />
          </Route>
          <Route path="/settings/help">
            <Help shownotif={props.shownotif} />
          </Route>
          <Route path="/settings/support">
            <Support shownotif={props.shownotif} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Settings