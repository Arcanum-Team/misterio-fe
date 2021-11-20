import React from 'react';
import '../css/Enclosure.css';

export default class Enclosure extends React.Component {
	onClick(){

	}

	render() {
		return (
			<button className= {this.props.edis ? this.props.style + " edis" : this.props.style}
				id = {this.props.id} >
				{this.props.value}
			</button>
		)
	}
}