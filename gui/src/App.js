import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomeLogin from './components/HomeLogin.js'
import Register from './components/Register.js'


function App() {
  return (
    <div className="App" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Router >
      <Switch>
        <Route exact path='/' component={HomeLogin} />
        <Route path='/register' component={Register} />
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
