import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../../variables'
import { Redirect } from 'react-router-dom';

class NewGame extends Component {
  constructor() {
    super()
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
    let { name, numPlayers, redirect } = this.state;
    if (redirect) { return <Redirect to='/lobby' /> };

    return (
      <div className="backdrop">
        <section className="StartScreen">
          <form 
            className="JoinGame"
            onSubmit={this.handleSubmit}
          >
            <h2>Creating a new game?</h2>
            <div>
              <label htmlFor="name">
                Choose your agent name
                </label>
              <input 
                name="name" 
                value={name} 
                onChange={ this.handleChange }
                type="text" 
                placeholder="Enter Name" />
            </div>
            <input 
              className="btn-default start-btn"
              type="submit" 
              disabled={ !name }
              value="CREATE GAME"
              onClick={this.handleSubmit}
            />
          </form>
        </section>
      </div>
    )
  }
}

export default NewGame;