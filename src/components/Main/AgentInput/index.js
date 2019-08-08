import React, { Component } from "react";

class AgentInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hintWord: '',
			numCards: 1,
			hintLogs: []
		};
  }
  
  componentDidMount = () => {
    let hintLogs = this.props.hintLogs;

    this.setState({ hintLogs });
  };

	handleChange = e => {
    const { name, value } = e.target;
    
		this.setState({ [name]: value });
	};

	handleSendEvent(e) {
		e.preventDefault();
		const { hintWord, numCards } = this.state;
		let hint = { hintWord: hintWord.toLowerCase(), numCards };

		this.props.cable.sendHint(hint);
		this.setState({ hintWord: '', numCards: 1 });
	}

	renderChatLog() {
		// return this.state.hintLogs.map((chat) => {
		//   return (
		//     <li key={`chat_${chat.id}`}>
		//       <span className='chat-message'>{ chat.content }</span>
		//       <span className='chat-created-at'>{ chat.created_at }</span>
		//     </li>
		//   );
		// })
	}

	handleChatInputKeyPress(event) {
		if (event.key === 'Enter') this.handleSendEvent(event);
  }
  // updateCurrentChatMessage({target}) {
  //     this.setState({
  //       hint: target.value
  //     });
  // }

	// updateCurrentChatMessage({target}) {
	//     this.setState({
	//       hint: target.value
	//     });
	// }

	render() {
		return (
			<form className="AgentInput" onSubmit={e => this.handleSendEvent(e)}>
				{/* <ul className='chat-logs'>
          { this.renderChatLog() }
        </ul> */}
				<div className="hint-entries">
					<label htmlFor="hintWord">Hint:</label>
					<input
						name="hintWord"
						onKeyPress={e => this.handleChatInputKeyPress(e)}
            value={this.state.hint}
            maxLength="15"
						onChange={e => this.handleChange(e)}
						type="text"
						placeholder="Enter your hint..."
						className="chat-input"
					/>
					<label htmlFor="num-input">Quantity:</label>
					<input
						className="num-input"
						name="numCards"
						type="number"
						value={this.state.numCards}
						onChange={this.handleChange}
					/>
          <button
            onClick={e => this.handleSendEvent(e)}
            className="btn-default send-btn"
            disabled={!this.state.hintWord || !this.state.numCards}
          >
						Send
					</button>
				</div>
			</form>
		);
	}

}

export default AgentInput;
