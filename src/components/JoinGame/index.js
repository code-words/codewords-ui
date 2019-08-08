import React, { Component } from 'react';
import { API_ROOT, HEADERS } from "../../variables";
import { Redirect } from "react-router-dom";

class JoinGame extends Component {
  constructor() {
    super()
    this.state = {
      inviteCode: "",
      name: "",
      redirect: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, inviteCode } = this.state;

    let option = {
      headers: HEADERS,
      method: "POST",
      body: JSON.stringify({ name })
    };
    fetch(`${API_ROOT}/v1/games/${inviteCode}/players`, option)
      .then(response => response.json())
      .then(result => { this.props.handleUserInit(result) });

    this.setState({ redirect: true });
  }

  handleChange = (e) => {
    const { name, value } = e.target; 
    this.setState({ [name]: value })
  }

  render() {
    if (this.state.redirect) { return <Redirect to='/lobby' /> };

    return (
      <div className="backdrop">
        <section className="StartScreen">
          <form className="JoinGame" onSubmit={this.handleSubmit}>
            <h2>Friends started a game?</h2>
            <div>
              <label htmlFor="inviteCode">Please enter invite code</label>
              <input
                name="inviteCode"
                value={this.state.inviteCode}
                type="text"
                placeholder="Enter Invite Code"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="name">Choose your agent name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Name"
                maxLength="15"
                onChange={this.handleChange}
              />
            </div>
            <input
              className="btn-default start-btn"
              type="submit"
              value="SUBMIT"
              disabled={!this.state.inviteCode || !this.state.name}
            />
          </form>
        </section>
      </div>
    );
  }
}

export default JoinGame;