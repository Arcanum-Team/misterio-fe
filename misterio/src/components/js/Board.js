import React from 'react';
import Box from './Box.js';
import Enclosure from './Enclosure.js';
import '../css/Board.css';


export default class Board extends React.Component {
	render() {
		const pos_a = ["e","n","n","n","d","n","t","n","n","n","u","n","n","t","n","d","n","n","n","e"];
		const pos_b = ["e","n","l","n","n","n","t","n","n","n","lw","n","n","t","n","l","n","n","n","e"];
		const pos_c = ["e","n","n","n","r","n","t","n","n","n","rw","n","n","t","n","n","r","n","n","e"];
		const pos_d = ["e","n","n","u","n","n","trd","n","n","n","d","n","n","trd","n","n","u","n","n","e"];
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
					{pos_a.map((x) => <Box styling = {x}> </Box>)}
				</div>
				<div className = "board-b">

					{pos_b.map((x) => <Box styling = {x} value = {x}> </Box>)}
				</div>
				<div className = "board-c">
					{pos_c.map((x) => <Box styling = {x} value = {x}> </Box>)}
				</div>

				<div className = "vestibulo">
					<Enclosure value = "vestibulo"> </Enclosure>
				</div>
				<div className = "centro">
					<Enclosure value =""> </Enclosure>
				</div>
				<div className = "panteon">
					<Enclosure value = "panteon"> </Enclosure>
				</div>

				<div className = "board-d">
					{pos_d.map((x) => <Box styling = {x} value = {x}> </Box>)}
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