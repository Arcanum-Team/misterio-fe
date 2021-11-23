import React from 'react'
import "../css/Button.css";
import { useHistory } from "react-router-dom";

function JoinGame({gameName, password}) {

	let history = useHistory();
	
	const handleClick = () => {
		history.push("../JoinForm/" + gameName);
		window.sessionStorage.setItem("hasPassword", password);
	}

	return (
		<div>
			<button className = "btn btn-dark" onClick= {() =>handleClick()}> Unirse a Partida </button>
		</div>
	);	
}
export default JoinGame;