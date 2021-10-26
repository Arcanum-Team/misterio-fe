import React from 'react'
import "../css/Button.css";
import JoinForm from './JoinForm';

import {useHistory} from "react-router-dom";

export default function JoinGame() { 
	let history = useHistory();

	const handleClick = () => {
		history.push("/JoinForm");
	}

	return (
		<div>
			<button className = "continue" onClick= {handleClick}> Unirse a Partida </button>
		</div>
	);
}
