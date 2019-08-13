import React, {Component} from 'react';
import { API_ROOT, HEADERS } from '../../variables';
import { Link } from 'react-router-dom';

class ReplayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePlayAgain = () => {
    let { name, inviteCode } = this.props.userData;
    this.props.closeReplay();

    let option = {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({ name })
    };
    fetch(`${API_ROOT}/v1/games/${inviteCode}/players`, option)
      .then(response => response.json())
      .then(result => {
        this.props.handleUserInit(result, inviteCode);
      });
  };

  render() {
    return (
      <div className="overlay">
        <div className="dialog replay-dialog">
          <h2 className="replay-heading">
            {this.props.winner.toUpperCase()} team wins!
          </h2>
          <img
            className="winner-img"
            src={require(`../../images/${this.props.winner}.jpg`)}
            alt={`${this.props.winner}`}
          />
          <div className="replay-btns">
            <Link
              to="/"
              id="StartScreen"
              className="nav-item btn-default start-over-btn"
              onClick={this.props.closeReplay}
            >
              Start Over
            </Link>
            <Link
              to="/lobby"
              id="Lobby"
              className="nav-item btn-default replay-btn"
              onClick={this.handlePlayAgain}
            >
              Play Again!
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ReplayScreen;