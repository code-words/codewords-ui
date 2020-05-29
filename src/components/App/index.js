import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header';
import StartScreen from '../StartScreen';
import RuleList from '../RuleList';
import NewGame from '../NewGame';
import JoinGame from '../JoinGame';
import Lobby from '../Lobby';
import Main from '../Main';
import ErrorScreen from '../ErrorScreen';
import Cable from 'actioncable';
import ConfDialog from '../ConfDialog';
import ReplayScreen from '../ReplayScreen';
import { API_ROOT, API_WS_ROOT } from "../../variables/";


export class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {},
			invite_code: '',
      playerRoster: [],
      hintLogs: [],
      cardData: [],
      cable: {},
      isLobbyFull: false,
      currentPlayerId: null,
      remainingAttempts: null,
      winner: '',
      currentHint: {
        hintWord: '', 
        relatedCards: null
      },
      showDialog: false,
      confMsg: ''
    };
  }

  handleUserInit = (result, inviteCode) => {
    const { id, name, token } = result;
    localStorage.setItem("Token", token);
    const user = { id, name, token }
    // if (result.invite_code) this.setState({ invite_code: result.invite_code });
    this.setState({ user, invite_code: inviteCode || result.invite_code }, () => this.createCable(token));
  };

  updateHintLogs = data => {
    let hintLogs = this.state.hintLogs;
    hintLogs.push(data);
    this.setState({ hintLogs });
  };

  setPlayer = data => {
    const { playerRoster } = data;
    this.setState({ playerRoster }, () => {
      if (this.state.playerRoster.length === 4) {
        this.setState({ isLobbyFull: true })
      }
    })
  };

  setGame = async data => {
    const { cards, players, firstPlayerId } = data;
		const user = players.find(p => p.id === this.state.user.id);
		let cardData = cards;

		if (user.isIntel) {
			const res = await fetch(`${API_ROOT}/v1/intel?token=${this.state.user.token}`);
			cardData = await res.json();
			cardData = cardData.cards;
    }

    this.setState({
      playerRoster: players,
      currentPlayerId: firstPlayerId,
			cardData,
			user: { ...this.state.user, ...user }
    });
  };
  
  setHint = data => {
    const { hintWord, relatedCards, currentPlayerId } = data;
    const player = this.state.playerRoster
      .find(p => p.id === this.state.currentPlayerId);

    this.setState({ 
      currentPlayerId, 
      remainingAttempts: relatedCards + 1,
      currentHint: { hintWord, relatedCards}
    }, () => this.showConf(
      `${player.name} gave a hint: ${hintWord} (x${relatedCards})`
      )
    );
  }

  setGuess = data => {
    const player = this.state.playerRoster
      .find(p => p.id === this.state.currentPlayerId);

    const { card, currentPlayerId, remainingAttempts } = data;
    let cardData = [ ...this.state.cardData ];
    
    if (card) {
      const cardIdx = cardData.findIndex(i => i.id === card.id);
      cardData[cardIdx] = { ...cardData[cardIdx], ...card };

      this.setState(
        { cardData, currentPlayerId, remainingAttempts },
        this.showConf(
          `${player.name} ${this.isTurnNull(cardData, cardIdx)}!`
        )
      );
    } else {
      this.setState(
        { currentPlayerId, remainingAttempts },
        this.showConf(`${player.name} ${this.isTurnNull(cardData)}!`)
      );
    }

    this.clearHint(remainingAttempts);
  }

  isTurnNull = (cardData, cardIdx) => {
    if (cardIdx) {
      return `guessed ${cardData[cardIdx].word}`;
    } else {
      return `passed their extra guess`;
    }
  }

  clearHint = (remainingAttempts) => {
    if(remainingAttempts === 0 ) {
      this.setState({
        currentHint: {
          hintWord: '',
          relatedCards: null
        }
      });
    }
  }

  closeReplay = () => {
    this.setState({
      user: {},
      invite_code: '',
      playerRoster: [],
      hintLogs: [],
      cardData: [],
      cable: {},
      isLobbyFull: false,
      currentPlayerId: null,
      remainingAttempts: null,
      winner: "",
      currentHint: {
        hintWord: "",
        relatedCards: null
      },
      showDialog: false,
      confMsg: ""
    });
  }

  finishGame = (code) => {
    this.setState({invite_code: code});
  }

	dataSwitch = result => {
    const { type, data } = result;
		switch (type) {
			case 'player-joined':
				this.setPlayer(data);
				break;
			case 'game-setup':
				this.setGame(data);
				break;
      case 'hint-provided':
        this.setHint(data)
				break;
      case 'board-update':
        this.setGuess(data);
        break;
      case 'game-over':
        this.setGuess(data);
        this.finishGame(data.nextGame);
        setTimeout(() => this.setState({ winner: data.winningTeam}), 2500);
        break;
      case 'illegal-action':
        this.showConf(data.error);
        break;
			default:
				console.log('ERROR in Switch');
		}
  };
  
  showConf = msg => {
    setTimeout(() => this.setState({ showDialog: true, confMsg: msg }), 500);
    setTimeout(() => this.setState({ showDialog: false }), 2000);
  }

	createCable = token => {
		if (this.state.user.token === token) {
			let connection = Cable.createConsumer(`${API_WS_ROOT}/${token}`);

			this.cable = connection.subscriptions.create(
        { channel: 'GameDataChannel' },
				{
					connected: () => console.log('connected'),
					disconnected: () => console.log('disconnected'),
					rejected: () => console.log('rejected'),
          received: res => this.dataSwitch(JSON.parse(res.message)),
          sendHint: hint => this.cable.perform('send_hint', hint),
					sendGuess: guess => this.cable.perform('send_guess', guess)
				}
			);
			this.setState({ cable: this.cable });
		}
  };
  
  render() {
    const { showDialog, cardData, confMsg, user, invite_code } = this.state;

    const replay = !this.state.winner ? null : (
      <ReplayScreen
        winner={this.state.winner}
        userData={{ name: user.name, inviteCode: invite_code }}
        handleUserInit={this.handleUserInit}
        closeReplay={this.closeReplay}
      />
    );

    const dialog = showDialog ? <ConfDialog
      message={confMsg}
      replay={this.state.cable.sendGuess}
      over={cardData.find(c => c.type === 'assassin' && c.flipped)}
    /> : null;
      
		return (
      <div className="App">
        {dialog}
        {replay}
				<Header />
				<Switch>
					<Route exact path="/" component={StartScreen} />
					<Route exact path="/rules" component={RuleList} />
					<Route exact path="/new" render={
            /* istanbul ignore next */
            () => <NewGame handleUserInit={this.handleUserInit} />} />
					<Route exact path="/join" render={
            /* istanbul ignore next */
            () => <JoinGame handleUserInit={this.handleUserInit} />} />
					<Route
						exact
						path="/lobby"
						render={
              /* istanbul ignore next */
              () => (
							<Lobby
								players={this.state.playerRoster}
								inviteCode={this.state.invite_code}
								isLobbyFull={this.state.isLobbyFull}
							/>
						)}
					/>
					<Route
						exact
						path="/game"
						component={
              /* istanbul ignore next */
              () => (
							<Main
								token={this.state.user.token}
								hintLogs={this.state.hintLogs}
                cardData={this.state.cardData}
                hint={this.state.currentHint}
                remainingAttempts={this.state.remainingAttempts}
                isIntel={this.state.user.isIntel}
								isActive={this.state.user.id === this.state.currentPlayerId}
                cable={this.state.cable}
                user={this.state.user}
                currentPlayerId={this.state.currentPlayerId}
								players={this.state.playerRoster}
								sendGuess={this.cable.sendGuess}
							/>
						)}
					/>
					<Route component={ErrorScreen} />
				</Switch>
			</div>
		);
	}
}

export default App;
