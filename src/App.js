import React from "react";
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom"
import "./styles.css";
import AppContainer from './comps/AppContainer'

export default function App() {
  return (
    <div className="App">
      <Router>
        <AppContainer />
      </Router>
    </div>
  );
}
