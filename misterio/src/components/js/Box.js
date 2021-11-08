import React from 'react';
import '../css/Box.css';
import Player from './Player.js';

export default class Box extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            player: ["", <Player color = "red"/>]
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(){
        let lastBox = document.getElementById(""+this.props.lastMovement)
        if(lastBox !== null){
            lastBox.removeChild(lastBox.firstChild)
        }
        this.setState({
            index: this.state.index === 0 ? 1 : 0
        })
        this.props.parentCallback(this.props.id);
    }

    render() {
        return (
            <button id = {this.props.id} className= {this.props.styling} onClick={this.handleClick}>
                {this.state.player[this.state.index]}
            </button>
        )
    }
}