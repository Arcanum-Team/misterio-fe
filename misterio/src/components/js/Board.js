import React from 'react';
import Box from './Box.js';
import Enclosure from './Enclosure.js';
import '../css/Board.css';


export default class Board extends React.Component {
	render() {
		// const pos_a = ["E","","","","a","","P","","","","a","","","P","","a","","","","E"];
		const pos_a = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
		const pos_b = ["E","","a","","","","P","","","","a","","","P","","a","","","","E"];
		const pos_c = ["E","","","","a","","P","","","","a","","","P","","","a","","","E"];
		const pos_d = ["E","","","a","","","P","","","","a","","","P","","","a","","","E"];
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
					{/*{pos_a.map((x) => <Box value = {pos_a[x-1]}> </Box>)}*/}
					{pos_a.map((x) => <Box value = {pos_a[x]}> </Box>)}
				</div>
				{console.log(pos_a[2])}
				<div className = "board-b">

					{pos_a.map((x) => <Box value = {pos_a[x]}> </Box>)}
				</div>
				<div className = "board-c">
					{pos_c.map((x) => <Box value = {pos_c[x-1]}> </Box>)}
				</div>

				<div className = "vestibulo">
					<Enclosure value = "vestibulo"> </Enclosure>
				</div>
				<div className = "panteon">
					<Enclosure value = "panteon"> </Enclosure>
				</div>

				<div className = "board-d">
					{pos_d.map((x) => <Box value = {pos_d[x-1]}> </Box>)}
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