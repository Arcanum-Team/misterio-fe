import React from 'react'
import "../css/Button.css";
import { withRouter } from "react-router-dom";

class JoinGame extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(name) {
		this.props.history.push("../JoinForm/" + name);
	}

	render(){
		return (
			<div>
				<button className = "btn btn-dark" onClick= {() =>this.handleClick(this.props.gameName)}> Unirse a Partida </button>
			</div>
		);
	}
	
}
export default withRouter(JoinGame);