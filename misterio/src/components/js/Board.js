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
            enclosures: [],
            enc_name: ['COCHERA','ALCOBA','BIBLIOTECA','VESTIBULO','PANTEON','BODEGA','SALON','LABORATORIO'],
           	dice: 0,
        	moves: [1, 2, 3, 4]
        }
    }

	handleCallback = (lastBox) =>{
		this.setState({
			last_movement: lastBox
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
	        	});
	      	})
  	}

   	displayPosibleMoves(){
   		this.state.pos_a.map((x) => {
	   		if (this.state.moves.some(item => item !== x.id )) {
	           	x.disabled = true;
	   		}
	        x.setOpacity = "0.6";
	        x.style.setColor = "green";
	        console.log(x)
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
					<div className = {'e' + x.enclosure.name}>
						<Enclosure value = {this.state.enc_name[x.enclosure.id-1]}> </Enclosure>
					</div>
				)}
				<div className = "centro">
					<Enclosure value =""> </Enclosure>
				</div>
				<div className = "board-a">
					{pos_a.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} lastMovement={this.state.last_movement} parentCallback = {this.handleCallback} > </Box>)}
				</div>
				<div className = "board-d">
					{pos_d.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} lastMovement={this.state.last_movement} parentCallback = {this.handleCallback} > </Box>)}
				</div>
				<div className = "board-b">
					{pos_b.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} lastMovement={this.state.last_movement} parentCallback = {this.handleCallback} > </Box>)}
				</div>
				<div className = "board-c">
					{pos_c.map((x) => <Box styling = {x.attribute} id = {`${x.id}`} lastMovement={this.state.last_movement} parentCallback = {this.handleCallback} > </Box>)}
				</div>
				{this.displayPosibleMoves()}
			</div>
		)
	}
}