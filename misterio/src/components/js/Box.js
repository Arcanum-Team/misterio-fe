import React from 'react';
import '../css/Box.css';

export default class Box extends React.Component {
	onClick(){

	}

	render() {
		return (
			/*<button className= "box" onClick={this.props.onClick}>
				{this.props.value}*/
			<button className= "box">
				{this.props.value}
			</button>
		)
	}
}