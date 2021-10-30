import React from 'react'
import "../css/JoinForm.css";
import "../css/Button.css";

class JoinForm extends React.Component {

	constructor(props) {
		super(props)
		this.joinClick = this.joinClick.bind(this)
		this.state = {
			name: ""
		}
	}

	joinClick(){
		this.props.history.push("../LobbyRoom/:id");
	}

	saveName = event => { 
		this.setState({name: event.target.value});
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
				<button className = "continue" type = "submit" onClick = {() => this.joinClick()}> Aceptar </button>
			</div>
		);
	}
}
export default JoinForm;