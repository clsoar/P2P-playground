import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Peer from "peerjs";
import Host from './Host.js';
import Player from './Player.js';
import Landing from './Landing.js';

/*
var lastPeerId = null;
var peer = null; // Own peer object
var peerId = null;
var conn = null;
var recvId = document.getElementById("receiver-id");
var status = document.getElementById("status");
var players = [];
*/



/**
 * Create the Peer object for our end of the connection.
 *
 * Sets up callbacks that handle any events related to our
 * peer object.
 */
 /*function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
        debug: 2
    });

    peer.on('open', function (id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
        recvId.innerHTML = "ID: " + peer.id;
        status.innerHTML = "Awaiting connection...";
    });
    peer.on('connection', function (c) {
        // Allow only a single connection
      /*  if (conn) {
            c.on('open', function() {
                c.send("Already connected to another client");
                setTimeout(function() { c.close(); }, 500);
            });
            return;
        }*/
/*
        conn = c;
        players.push(conn);
        console.log("Connected to: " + conn.peer);
        status.innerHTML = "Connected"
        //ready();
        console.log(players);
    });
    peer.on('disconnected', function () {
        status.innerHTML = "Connection lost. Please reconnect";
        console.log('Connection lost. Please reconnect');

        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function() {
        conn = null;
        status.innerHTML = "Connection destroyed. Please refresh";
        console.log('Connection destroyed');
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};
*/

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
