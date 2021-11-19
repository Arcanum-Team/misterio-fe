import React from 'react';
import '../css/Box.css';
import Player from './Player.js';
import ReactDOM from 'react-dom';

export default class Box extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        let lastBox = document.getElementById(this.props.lastMovement)
        if(lastBox !== null){
            if(lastBox.firstChild != null){
                ReactDOM.unmountComponentAtNode(lastBox)
            }
        }
        let currentBox = document.getElementById(this.props.id)
        const player = <Player color = "red"/>
        ReactDOM.render(player, currentBox)

        this.props.parentCallback(this.props.id);
    }

    newMoves(){
        let currentBox = document.getElementById(this.props.id)
    }

    render() {
        return (
            <button id = {this.props.id} className= {this.props.dis ? this.props.styling + " dis" : this.props.styling} onClick={this.handleClick}>
            </button>
        )
    }
}