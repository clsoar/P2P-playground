import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Host from './Host.js';
import Player from './Player.js';
import Landing from './Landing.js';

class App extends Component {
  render() {
    return (
      <Router>
        <button className="Landing-button">
          <Link to="/">Home</Link>
        </button>
        <button className="host-button">
          <Link to="/Host/">Host</Link>
        </button>
        <button className="player-button">
          <Link to="/Player/">Player</Link>
        </button>

        <Route exact path="/" component={Landing} />
        <Route path="/Host/" component={Host} />
        <Route path="/Player/" component={Player} />

      </Router>

    );
  }
}

export default App;
