import React from 'react';
import '../css/Enclosure.css';

export default class Enclosure extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.parentCallback(this.props.id);
    }

	render() {
		return (
			<button className= { this.props.playerPos ?
                (this.props.edis ? this.props.style + " edis" + " eplayer" : this.props.style + " eplayer") :
                (this.props.edis ? this.props.style + " edis" : this.props.style)}
                    onClick={this.handleClick}>
				{this.props.value}
			</button>
		)
	}
}