import React, { Component } from 'react';
import './App.css';
import Peer from 'peerjs';

 var conn = null;

class Player extends Component {


    static defaultProps = {
      peer: new Peer(null, {
          debug: 2
      })
    }

    state = {
      peer: new Peer(null, {
          debug: 2
      }),
      conn: null,
      players: [],
      hostId: ''
    }

    handleInput(event) {
      this.setState({hostId: event.target.value});

    }

    handleSubmit(event) {
      console.log("A host ID was submitted");
      event.preventDefault();
      this.join();

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
        console.log("ID: " + this.props.peer.id);


      });

      this.props.peer.on('disconnected', () => {
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
        conn = null;
        //handle connection message
        console.log('Connection destroyed');
      });

      this.state.peer.on('error', (err) => {
        console.log(err);
        alert(''+ err);
      })
    }

    componentDidMount() {

      this.initialize();
    }

    join = () => {
      //close old connection
      if(conn) {
        conn.close();
      }
      // Create connection to destination peer specified in the input field
      conn = this.state.peer.connect(this.state.hostId, {
          reliable: true
      });

      conn.on('open', () => {
        //handle connection messages
        console.log("Connected to: " + conn.peer);
      // Check URL params for comamnds that should be sent immediately
      var command = this.getUrlParam("command");
      if (command) {
        conn.send(command);
      }
    });
    // Handle incoming data
    conn.on('data', function (data) {
        console.log("data received", data);
        switch (data) {

            default:
                console.log(data);
                //addMessage("<span class=\"peerMsg\">Peer: </span>" + data);
                break;
        };
        this.addMessage("<span class=\"peerMsg\">Peer:</span> " + data);
        console.log("message sent");
        });
        conn.on('close', function () {
          //handle connection message
          console.log("connection closed");
        });

      }

      getUrlParam = (name) => {
          name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
          var regexS = "[\\?&]" + name + "=([^&#]*)";
          var regex = new RegExp(regexS);
          var results = regex.exec(window.location.href);
          if (results == null)
              return null;
          else
              return results[1];
      }

      signal = (sigName) => {
         if (conn.open) {
             conn.send(sigName);
             console.log(sigName + " signal sent");
             this.addMessage("Player" + sigName);
         }
     }

     addMessage = (msg) => {
       let now = new Date();
       let h = now.getHours();
       let m = addZero(now.getMinutes());
       let s = addZero(now.getSeconds());

       if (h > 12)
           h -= 12;
       else if (h === 0)
           h = 12;

       function addZero(t) {
           if (t < 10)
               t = "0" + t;
           return t;
       };

       let message = <div class="msg-time">{+ h + ":" + m + ":" + s + " - " + msg}</div>;
       console.log(message);

     }


  render() {
    return (
      <div className="Player">
        <header className="Player-header">
          <h1>
            Player Page
          </h1>
        </header>
        <main className="main">
          <section className="connection-info">
            <form className="connect-form" onSubmit={(evt) => this.handleSubmit(evt)}>
              <label className="connection-label" htmlFor="host-id">Input the ID provided by your host here and press connect.</label>
              <input
                className="connection-input"
                type="text"
                name="host-id"
                id="host-id"
                value={this.state.hostId}
                onChange={(evt) => this.handleInput(evt)}
                />
              <input className="connection-btn" type="submit" value="Connect" />
            </form>
            <div className="connection-status">Connection Status: </div>
            <div className="player-status"></div>
          </section>
          <section className="data-section">
            <div className="game-status">Game Status: </div>
            <div className="game-progress-started hidden">In progress</div>
            <div className="game-progress-waiting">Waiting for Host</div>
            <input className="message-input" type="text" id="sendMessageBox" placeholder="Enter a message..." />
            <button className="send-message" id="sendButton">Send</button>
            <button className="clear-messages" id="clearMsgsButton">Clear Msgs (Local)</button>
            <button className="send-win">Send Win</button>
            <button className="send-lose">Send Lose</button>
          </section>

        </main>
      </div>
    );
  }
}

export default Player;
