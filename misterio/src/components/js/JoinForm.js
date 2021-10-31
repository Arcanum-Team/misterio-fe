import React from 'react'
import "../css/JoinForm.css";
import "../css/Button.css";

class JoinForm extends React.Component {

	constructor(props) {
		super(props)
		this.joinClick = this.joinClick.bind(this)
		this.state = {
			nickname: "",
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		
		const data = {'game_name': this.props.match.params.id, 'nickname': this.state.nickname}
		console.log(data);

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};
	
		fetch(
			"http://127.0.0.1:8000/api/v1/games/join", requestOptions)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			  this.props.history.push("../LobbyRoom/" + json.game.id);
			})
	
	  };

	saveName = event => { 
		this.setState({nickname: event.target.value});
	}

	render() {
		return ( 
			<div className = "jform-box">
				<h3 className = "jform-step"> Nombre de partida </h3>
				<form>
					<div className = "field1">
						<label> Inserte su nombre de jugador </label>
						<input type="text" placeholder="Nickname"
						value = {this.state.name} onChange = {this.saveName}/>
					</div>
				</form>
				<button className = "continue" type = "submit" onClick = {this.handleSubmit.bind(this)}> Aceptar </button>
			</div>
		);
	}
}
export default JoinForm;