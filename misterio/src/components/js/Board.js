import React from 'react';
import Box from './Box.js';
import Enclosure from './Enclosure.js';
import '../css/Board.css';


export default class Board extends React.Component {
	render() {
		const pos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
		return (
			<div className= "game-board">
				<div className = "cochera">
					<Enclosure value = "cochera"> </Enclosure>
				</div>
				<div className = "alcoba">
					<Enclosure value = "alcoba"> </Enclosure>
				</div>
				<div className = "biblioteca">
					<Enclosure value = "biblioteca"> </Enclosure>
				</div>

				<div className = "board-a">
					{pos.map((x) => <Box value = {pos[x-1]}> </Box>)}
				</div>
				<div className = "board-b">

					{pos.map((x) => <Box value = {pos[x-1]}> </Box>)}
				</div>
				<div className = "board-c">
					{pos.map((x) => <Box value = {pos[x-1]}> </Box>)}
				</div>

				<div className = "vestibulo">
					<Enclosure value = "vestibulo"> </Enclosure>
				</div>
				<div className = "panteon">
					<Enclosure value = "panteon"> </Enclosure>
				</div>

				<div className = "board-d">
					{pos.map((x) => <Box value = {pos[x-1]}> </Box>)}
				</div>

				<div className = "bodega">
					<Enclosure value = "bodega"> </Enclosure>
				</div>
				<div className = "salon">
					<Enclosure value = "salon"> </Enclosure>
				</div>
				<div className = "laboratorio">
					<Enclosure value = "laboratorio"> </Enclosure>
				</div>
			</div>
		)
	}
}