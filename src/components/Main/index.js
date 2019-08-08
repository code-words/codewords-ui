import React from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from '../../variables';
import Score from './Score';
import Board from './Board';
import AgentInput from './AgentInput';
import AgentHUD from './AgentHUD';

const Main = props => {
  const form =
    props.isActive && props.isIntel ? (
      <AgentInput
        websocket={props.websocket}
        hintLogs={props.hintLogs}
        cable={props.cable}
        isActive={props.isActive}
      />
    ) : (
      <AgentHUD
        isActive={props.isActive}
        hint={props.hint}
        remainingAttempts={props.remainingAttempts}
        sendGuess={props.sendGuess}
      />
    );
      
  const determineActivePlayer= () => {
    let isCurrent = props.players.find(p =>{
      return p.id === props.currentPlayerId
        ? p.name
        : false;
    });

    return isCurrent ? isCurrent.name : false;
  }

  const determineActiveTeam = (color) => {
    switch(color) {
      case 'blue':
        let isBlue = props.players.find(p => 
          props.currentPlayerId === p.id
          && p.isBlueTeam
        );
        if (isBlue) return true
        break;
      case 'red':
        let isRed = props.players.find(p =>
          props.currentPlayerId === p.id
          && !p.isBlueTeam
        );
        if (isRed) return true;
        break;
      default: 
        console.log('error in determining team')
    }
  }

	const players = {
		blueIntel: props.players.find(p => p.isIntel && p.isBlueTeam),
		blueGuesser: props.players.find(p => !p.isIntel && p.isBlueTeam),
		redIntel: props.players.find(p => p.isIntel && !p.isBlueTeam),
		redGuesser: props.players.find(p => !p.isIntel && !p.isBlueTeam)
	};

	const scores = {
    blue: props.cardData.filter(c => c.flipped && c.type === 'blue').length,
    red: props.cardData.filter(c => c.flipped && c.type === 'red').length
	};

	return (
    <main className="Main">
      <ActionCableProvider url={API_WS_ROOT} socket={props.socket}>
        <Score
          team={"blue"}
          score={scores.blue}
          isTeamActive={determineActiveTeam('blue')}
          currentPlayer={determineActivePlayer()}
          players={[players.blueIntel.name, players.blueGuesser.name]}
        />
        <Board
          playerType={"intel"}
          userName={props.user.name}
          isActive={props.isActive}
          isIntel={props.isIntel}
          cardData={props.cardData}
          sendGuess={props.sendGuess}
        />
        <Score
          team={"red"}
          score={scores.red}
          isTeamActive={determineActiveTeam('red')}
          currentPlayer={determineActivePlayer()}
          players={[players.redIntel.name, players.redGuesser.name]}
        />
        <div className="offset" />
        {form}
        <div className="offset" />
      </ActionCableProvider>
    </main>
  );
};

export default Main;
