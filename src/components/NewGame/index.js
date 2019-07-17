import React, { Component } from 'react';
import {API_ROOT, HEADERS} from '../../variables'

class NewGame extends Component {
  constructor() {
    super()
    this.state= {
      name: '',
      numPlayers: 4
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
    .then(result => this.props.handleWebSocket(result))

  }

  render() {
    let { name, numPlayers } = this.state;
    return (
      <div className="backdrop">
        <section className="StartScreen">
          <form 
            className="JoinGame"
            onSubmit={this.handleSubmit}
          >
            <h2>Creating a new game?</h2>
            <div>
              <label for="name">
                Choose your agent name
                </label>
              <input 
                name="name" 
                value={name} 
                onChange={ this.handleChange }
                type="text" 
                placeholder="Enter Name" />
            </div>
            <div>
              <label for="numPlayers">
                Number of players
              </label>
              <select
                name="numPlayers"
                onChange={this.handleChange}
                value={numPlayers}
              >
                <option>2</option>
                <option>4</option>
                <option>6</option>
              </select>
            </div>
            <input 
              className="gameSubmit" 
              type="submit" 
              disabled={!name || !numPlayers}
              value="CREATE GAME"/>
          </form>
        </section>
      </div>
    )
  }
}

export default NewGame;