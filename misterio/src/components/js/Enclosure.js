import React from 'react';
import '../css/Enclosure.css';

export default class Enclosure extends React.Component {
	onClick(){

	}

	render() {
		return (
			/*<button className= "enclosure" onClick={this.props.onClick}>
				{this.props.value}*/
			<button className= "enclosure">
				{this.props.value}
			</button>
		)
	}
}