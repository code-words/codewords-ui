import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header";
import StartScreen from "../StartScreen";
import RuleList from "../RuleList";
import NewGame from "../NewGame";
import JoinGame from "../JoinGame";
import Lobby from "../Lobby";
import Main from "../Main";
import ErrorScreen from "../ErrorScreen";
import Cable from "actioncable";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      invite_code: '',
      playerRoster: [],
      hintLogs: [],
      cardData: []
    };
  }

  handleUserInit = (result) => {
    const { id, name, token } = result;
    const user = { id, name, token };

    if (result.invite_code) this.setState({ invite_code: result.invite_code });

    this.setState({ user }, () => this.createCable(token));
  };

  updatehintLogs = (data) => {
    let hintLogs = this.state.hintLogs;
    hintLogs.push(data);
    this.setState({ hintLogs });
  };

  setPlayer = (data) => {
    const { playerRoster } = data;
    console.log('The Deets',data);
    this.setState({ playerRoster })
  };

  setGame = async data => {
    const { cards, players } = data;
    const user = players.find(p => p.id === this.state.user.id);
    let cardData = cards;
    
    if (user.isIntel) {
      const res = await fetch(`/api/v1/intel?token=${this.state.user.token}`);
      console.log(res)
      cardData = await res.json();
      console.log(cardData)
    } 

    this.setState({
      cardData,
      user: { ...this.state.user, ...user },
      playerRoster: players
    });
  }

  dataSwitch = result => {
    const { type, data } = result;

    switch (type) {
      case "player-joined":
        console.log("WE HAVE A PLAYER");
        this.setPlayer(data);
        // Set game info [cards, teams, etc]
        break;
      case 'game-setup':
        this.setGame(data);
        break;
      case "player-hint":
        // Did a player give a hint?
        // this.setHint(data);
        // What is the hint and how many cards does it relate to?
        // Render hint to all players
        // Switch active player to Spy of same team
        break;
      case "player-guess":
        // Did a player click on a card?
        // this.setGuess(res);
        // Flip card
        // if this.state.words === guess
        // Process correct guess
        // Assign points to correct team
        // Decrement remaining guesses
        // See if they are out of guesses
        // If not, next team's turn
        // If yes, next guess
        break;
      default:
        console.log("ERROR in Switch");
    }
  };

  createCable = token => {
    if (this.state.user.token === token) {
      let cable = Cable.createConsumer(`ws://localhost:3000/cable/${token}`);

      this.hints = cable.subscriptions.create(
        { channel: 'GameDataChannel' },
        {
          connected: () => console.log("connected"),
          disconnected: () => console.log("disconnected"),
          rejected: () => console.log("rejected"),
          received: res => this.dataSwitch(JSON.parse(res.message)),
          create: hintContent => this.perform("create", {content: "hello"})
        }
      )
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={StartScreen} />
          <Route exact path="/rules" component={RuleList} />
          <Route
            exact
            path="/new"
            render={() => <NewGame handleUserInit={this.handleUserInit} />}
          />
          <Route
            exact
            path="/join"
            render={() => <JoinGame handleUserInit={this.handleUserInit} />}
          />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/game" component={() => <Main cardData= { this.state.cardData }/>} />
          <Route component={ErrorScreen} />
          <Route path="/" render={() => <Main
            token={this.state.user.token}
            hintLogs={this.state.hintLogs}
            cardData={this.state.cardData}
          />} />
        </Switch>
      </div>
    );
  }
}

export default App;
