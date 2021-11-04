import React from "react";
import { withRouter } from "react-router-dom";
import '../css/StartGame.css';

class StartGame extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(name) {
    const data = {'game_id': this.props.match.params.id, 'player_id': localStorage.getItem("host_id")}

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};
	
		fetch(
			"http://127.0.0.1:8000/api/v1/games/start", requestOptions)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			})
      
      
      this.props.history.push("../GameRoom/" + name);
	}

	render(){
		return (
			<div>
				<button className = "sboton" onClick= {() =>this.handleClick(this.props.GameId)}>
          			Iniciar Partida
        		</button>
			</div>
		);
	}
	
}
export default withRouter(StartGame);


