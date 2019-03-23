import React, { Component } from 'react';
import './App.css';

class Player extends Component {
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
            <label className="connection-label" htmlFor="host-id">Input the ID provided by your host here and press connect.</label>
            <input className="connection-input" type="text" name="host-id" id="host-id" />
            <button className="connection-btn">Connect</button>
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
