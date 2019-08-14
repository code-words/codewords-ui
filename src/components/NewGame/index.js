import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../../variables'
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

class NewGame extends Component {
  constructor(props) {
    super(props)
    this.state= {
      name: '',
      redirect: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let option ={
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify({name: this.state.name})
    }
    fetch(`${API_ROOT}/v1/games`, option)
    .then(response => response.json())
    .then(result => { this.props.handleUserInit(result) })

    this.setState({redirect: true})
  }

  render() {
    let { name, redirect } = this.state;
    if (redirect) { return <Redirect to='/lobby' /> };

    return (
      <div className="backdrop">
        <section className="StartScreen">
          <i
            className="fas fa-arrow-alt-circle-left"
            onClick={() => this.props.history.goBack()}
          />
          <form className="JoinGame" onSubmit={this.handleSubmit}>
            <h2>Creating a new game?</h2>
            <div>
              <label htmlFor="name">Choose your agent name</label>
              <input
                name="name"
                value={name}
                maxLength="15"
                onChange={this.handleChange}
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <input
              className="btn-default start-btn"
              type="submit"
              disabled={!name}
              value="CREATE GAME"
              onClick={this.handleSubmit}
            />
          </form>
        </section>
      </div>
    );
  }
}

NewGame.propTypes = {
  handleUserInit: PropTypes.func
}

export default withRouter(NewGame);