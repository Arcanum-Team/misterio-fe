import React from 'react';
import Box from './Box.js';
import Enclosure from './Enclosure.js';
import update from 'immutability-helper';
import '../css/Board.css';

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pos_a: [],
            pos_b: [],
            pos_c: [],
            pos_d: [],
			playersInEnc: [{enc:0,color:''},{enc:0,color:''},{enc:0,color:''},
                        {enc:0,color:''},{enc:0,color:''},{enc:0,color:''}],
			allPlayersPos:  this.props.playersPosition,
            enclosures: [],
            enc_name: ['COCHERA','ALCOBA','BIBLIOTECA','VESTIBULO','PANTEON','BODEGA','SALON','LABORATORIO']
        }
    }
	
	handleCallback = (new_box) =>{
		if(this.state.playersInEnc[this.props.myPlayer.order-1].enc !== 0){
			const data = {'game_id': window.sessionStorage.getItem("game_id"),
			'player_id': window.sessionStorage.getItem("player_id"),
			'box_id': new_box}
			
			const requestOptions = {
				method: 'PUT',
				mode: 'cors',
				headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify(data)
			};
			
			fetch("http://127.0.0.1:8000/api/v1/shifts/enclosure/exit", requestOptions)
			.then((res) => res.json())
			.then((json) => {
				this.setState(update(this.state, {
					playersInEnc: {
						[json.player.order - 1]: {
							$set: {
								enc: 0,
								color: ''
							}
						}
					}
				}));
				this.props.parentCallback([],json.player)
			})
		}else{
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
					this.props.parentCallback([],0)
				}
			})
		}
	}

	componentWillReceiveProps(){
		this.setState({
			allPlayersPos : this.props.playersPosition,
			playersInEnc: this.props.playersInEnc,
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
					allPlayersPos : this.props.playersPosition,
					playersInEnc: this.props.playersInEnc
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
					<Enclosure value = {x.enclosure.name} key={x.id}
						style = {'e' + x.enclosure.name} id = {`${x.id}`}
						edis = {this.props.possibleMoves.some(item => item === x.id )
						&& this.props.myPlayer.current_position !== null}
						playerPos = {this.state.playersInEnc.some(item => item.enc === x.enclosure.id )}
						playerInside = {this.state.playersInEnc.filter(item => item.enc === x.enclosure.id)}> 
					</Enclosure>
				)}
				<div className = "centro">
					<Enclosure value =""> </Enclosure>
				</div>
				<div className = "board-a">
					{pos_a.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} key={x.id}
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}
						playerInside = {this.state.allPlayersPos.filter(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-d">
					{pos_d.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} key={x.id}
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}
						playerInside = {this.state.allPlayersPos.filter(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-b">
					{pos_b.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} key={x.id}
						dis = {this.props.possibleMoves.some(item => item === x.id )}
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}
						playerInside = {this.state.allPlayersPos.filter(item => item.position === x.id )}> </Box>)}
				</div>
				<div className = "board-c">
					{pos_c.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} 
						parentCallback = {this.handleCallback} key={x.id}
						dis = {this.props.possibleMoves.some(item => item === x.id )} 
						playerPos = {this.state.allPlayersPos.some(item => item.position === x.id )}
						playerInside = {this.state.allPlayersPos.filter(item => item.position === x.id )}> </Box>)}
				</div>
			</div>
		)
	}
}