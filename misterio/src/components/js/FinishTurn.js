import React from 'react'
import "../css/FinishTurn.css";


class FinishTurn extends React.Component { 

	handleSubmit = event => {
		event.preventDefault();
		
		const data = {'game_id': this.props.gameId}
		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};
	
		fetch(
			"http://127.0.0.1:8000/api/v1/games/pass_turn", requestOptions)
			.then((res) => res.json())
			.then((json) => {
				this.props.parentCallback(json.turn);
			})
	
	  };

  render () {
	return (
		<div>
			<button className = "turnContinue" onClick = {this.handleSubmit.bind(this)}> Terminar Turno </button>
		</div>
	);
  }
}

export default FinishTurn;
