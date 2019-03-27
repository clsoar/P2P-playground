import React, { Component } from 'react';
import './App.css';
import Peer from 'peerjs';

//var lastPeerId = null;


class Host extends Component {


  state = {
    peer: new Peer(null, {
      debug: 2
    }),
    conn: null,
    players: [],
    message: ''
  }

  initialize = () => {
    // Create own peer object with connection to shared PeerJS server
    //  this.setState({

    //  })


    this.state.peer.on('open', (id) => {
      // Workaround for peer.reconnect deleting previous id
      // modified for react, vanilla JS credit to: https://github.com/jmcker/Peer-to-Peer-Cue-System
      /*if (this.state.peer.id === null) {
          console.log('Received null id from peer open');
          this.setState({peer.id: lastPeerId});
      } else {
          lastPeerId = this.props.peer.id;
      }*/

      //handle connection message
      console.log("ID: " + this.state.peer.id);
      this.setState({})

    });

    this.state.peer.on('connection', (c) => {
      console.log(c)
      this.setState({ conn: c });
      let players = [...this.state.players];
      players.push(this.state.conn);
      this.setState({ players });
      console.log("Connected to: " + this.state.conn.peer);
      this.ready()
      console.log(this.state.players);
    });

    this.state.peer.on('disconnected', () => {
      //handle connection message
      console.log("Connection lost. Please reconnect");


      // Workaround for peer.reconnect deleting previous id
      // modified for react, vanilla JS credit to: https://github.com/jmcker/Peer-to-Peer-Cue-System
      /*this.setState({
        peer.id: lastPeerId;
      })
      peer._lastServerId = lastPeerId;*/
      this.state.peer.reconnect();
    });

    this.state.peer.on('close', () => {
      this.setState({ conn: null });
      //handle connection message
      console.log('Connection destroyed');
    });

    this.state.peer.on('error', (err) => {
      console.log(err);
      alert('' + err);
    })
  }

  ready = () => {
    this.state.conn.on('data', (data) => {
      console.log("Data received: ", data);
    })

    this.state.conn.on('close', () => {
      console.log("connection reset, awaiting connection...");
      this.setState({ conn: null });
      //this is a PeerJS method that is not registering as available
      //start(true);
    })
  }

  componentDidMount() {

    this.initialize();
  }

  sendMessage = (message) => {
    this.state.players.forEach(conn => {
      conn.send(message);
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="Host">
        <header className="Host-header">
          <h1>Host Page</h1>
        </header>
        <main className="main">
          <section className="connection-info">
            <div className="id-instructions">Use this ID for players to connect to host.</div>
            <div id="receiver-id-label" className="receiver-id-label">ID: </div>
            <div id="receiver-id" className="receiver-id">{this.state.peer.id}</div>
            <ol className="connected=players">Connected Players:
              {
                (this.state.players.length === 0) ?
                  <li className="no-players" id="no-players">Waiting for players to connect</li>
                  :
                  this.state.players.map((player) =>
                    <li className="player-list-item" key={player.id.toString()}>{player.id}</li>
                  )
              }

            </ol>
          </section>
          <section className="data-section">
            <button className="begin-game">
              Begin Game
            </button>
            <input className="message-input" name='message' type="text" id="sendMessageBox" placeholder="Enter a message..." onChange={this.handleInputChange} />
            <button className="send-message" id="sendButton"
              onClick={() => {
                this.sendMessage(this.state.message)
              }}>Send</button>
            <button className="clear-messages" id="clearMsgsButton">Clear Msgs (Local)</button>
            <button className="show-score">Show Scores</button>
          </section>
        </main>

      </div>



    );
  }
}

export default Host;
