import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
const shortid = require('shortid');

const Lobby = ({ players, inviteCode, isLobbyFull }) => {
  const renderJoinedPlayers = () => {
    let agents = [];
    let availKeys = [];

    for (let i = 0; i <= 3; i++) {
      if (players[i]) {
        agents.push(players[i].name)
      } else {
        agents.push(null);
        availKeys.push(i)
      }
    }

    return agents.map((a, index) => isAgent(a, index));
  };

  const isAgent = (agent, index) => {
    if (agent !== null) {
      return (
        <div className="agent" key={shortid.generate()}>
          <p key={shortid.generate()}>{agent.toUpperCase()}</p>
        </div>
      )
    } else {
      return (
        <div className="agent missing" key={shortid.generate()}>
          <p key={shortid.generate()}>{loadingDots()}</p>
        </div>
      )
    }
  }

  const loadingDots = () => {
    let dots = [];

    for (let i = 1; i < 6; i++ ) {
      dots.push(`dot${i}`);
    }

    return dots.map((d, ind) => 
      <span key={ind} id={d}>-</span>
    )
  }

  const renderCode = () => {
    return (
      <p>
        Invite Code:
        <CopyToClipboard text={inviteCode}>
          <code>
            {inviteCode}
            <i className="far fa-copy" />
          </code>
        </CopyToClipboard>
      </p>
    );
  }

  const message = players.length === 4 ? `Ready to start mission! Click CONTINUE...`
    : `Waiting for ${4 - players.length} more players`;
  
  const messageCls = players.length === 4 ? 'Active' : '';

  const button = players.length < 4 ? null
    : <Link className="btn-default continue-btn" to="/game">Continue</Link>;
  
  return (
    <div className="backdrop">
      <section className="Lobby">
        <div className="Lobby-head">
          <h2>LOBBY</h2>
          <span className="fade"></span>
        </div>
        <div className="Lobby-sub">
          <h3 className={`status ${messageCls}`}> 
            {message}
          </h3>
          {inviteCode && renderCode()}
        </div>
        <section className="roster">
          <h4>Current Agents:</h4>
          {renderJoinedPlayers()}
        </section>
        {button}
      </section>
    </div>
  )
}

export default Lobby;