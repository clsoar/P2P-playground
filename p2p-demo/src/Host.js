import React, { Component } from 'react';
import './App.css';

class Host extends Component {
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
            <div id="receiver-id" className="receiver-id">None</div>
            <ol className="connected=players">Connected Players:
              <li className="no-players player-list-item" id="no-players">Waiting for players to connect</li>
            </ol>
          </section>
          <section className="data-section">
            <button className="begin-game">
              Begin Game
            </button>
            <input className="message-input" type="text" id="sendMessageBox" placeholder="Enter a message..." />
            <button className="send-message" id="sendButton">Send</button>
            <button className="clear-messages" id="clearMsgsButton">Clear Msgs (Local)</button>
            <button className="show-score">Show Scores</button>
          </section>
        </main>

      </div>



    );
  }
}

export default Host;
