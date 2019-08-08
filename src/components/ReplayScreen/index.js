import React from 'react';
import { Link } from 'react-router-dom';

const ReplayScreen = props => {
  return (
    <div className="overlay">
      <div className="dialog replay-dialog">
        <h2 className="replay-heading">{props.winner.toUpperCase()} team wins!</h2>
        <img className="winner-img" src={require(`../../images/${props.winner}.jpg`)} />
        <div className="replay-btns">
          <Link to="/" className="nav-item btn-default start-over-btn" onClick={props.closeReplay}>
            Start Over
          </Link>
          <Link to="/" className="nav-item btn-default replay-btn" onClick={props.closeReplay}>
            Play Again!
          </Link>
          </div>
      </div>
    </div>
  );
};

export default ReplayScreen;