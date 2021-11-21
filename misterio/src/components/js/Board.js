import React from 'react';
import Box from './Box.js';
import Enclosure from './Enclosure.js';
import '../css/Board.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pos_a: [],
            pos_b: [],
            pos_c: [],
            pos_d: [],
			allPlayersPos:  this.props.playersPosition,
            enclosures: [],
            enc_name: ['COCHERA','ALCOBA','BIBLIOTECA','VESTIBULO','PANTEON','BODEGA','SALON','LABORATORIO']
        }
    }

	handleCallback = (new_box) =>{
		const data = {'game_id': window.sessionStorage.getItem("game_id"),
					'player_id': window.sessionStorage.getItem("player_id"),
					"next_box_id": new_box,
					"dice_value": this.props.dice}

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};

		fetch("http://127.0.0.1:8000/api/v1/shifts/move", requestOptions)
		.then((response) => {
			if(response.ok){
				this.props.parentCallback([])
			}
		})
	}

	EnclosureCallbackIn = (new_box) =>{
		this.props.parentCallback([])
		this.setState({
			playerPosition: new_box,
		})
		const data = {'game_id': window.sessionStorage.getItem("game_id"),
					'player_id': window.sessionStorage.getItem("player_id")}

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};

		fetch("http://127.0.0.1:8000/api/v1/enclosure/enter", requestOptions)
		.then((response) => {
			if(response.ok){
			}
		})
		this.handleCallback(new_box)
	}

	EnclosureCallbackOut = (new_box) =>{
		this.props.parentCallback([])
		this.setState({
			playerPosition: new_box,
		})
		const data = {'game_id': window.sessionStorage.getItem("game_id"),
					'player_id': window.sessionStorage.getItem("player_id")}

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};

		fetch("http://127.0.0.1:8000/api/v1/enclosure/exit", requestOptions)
		.then((response) => {
			if(response.ok){
			}
		})
	}

	componentWillReceiveProps(){
		this.setState({
			allPlayersPos : this.props.playersPosition
		})
	}

	componentDidMount() {
	    const requestOptions = {
	      method: 'GET',
	      mode: 'cors',
	      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
	    };

	    fetch(
	        "http://127.0.0.1:8000/api/v1/board" , requestOptions)
	        .then((res) => res.json())
	        .then((json) => {
	            this.setState({
	                pos_a: json[0].boxes,
	                pos_b: json[1].boxes,
	                pos_c: json[2].boxes,
	                pos_d: json[3].boxes,
	                enclosures: json[0].boxes.filter((x)=> x.enclosure !== null).concat(
	                			json[1].boxes.filter((x)=> x.enclosure !== null)).concat(
	                			json[2].boxes.filter((x)=> x.enclosure !== null)).concat(
	                			json[3].boxes.filter((x)=> x.enclosure !== null)),
					allPlayersPos : this.props.playersPosition
	        	});
	      	})
  	}

	render() {
		const pos_a = this.state.pos_a;
		const pos_b = this.state.pos_b;
		const pos_c = this.state.pos_c;
		const pos_d = this.state.pos_d;
		const enclosures = this.state.enclosures;
		return (
			<div className= "game-board">
				{enclosures.map((x) =>
					<Enclosure value = {x.enclosure.name} 
						style = {'e' + x.enclosure.name} id = {`${x.id}`}
						parentCallback = {this.EnclosureCallbackIn} 
						parentCallback = {this.EnclosureCallbackOut} 
						edis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.playerPosition == x.id}> 
					</Enclosure>
				)}
				<div className = "centro">
					<Enclosure value =""> </Enclosure>
				</div>
				<div className = "board-a">
					{pos_a.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} 
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-d">
					{pos_d.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} 
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-b">
					{pos_b.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} 
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-c">
					{pos_c.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} 
						dis = {this.props.possibleMoves.some(item => item === x.id )} 
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}> </Box>)}
				</div>
			</div>
		)
	}
}