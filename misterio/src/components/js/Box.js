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
        if(this.state.index === 0) {
            this.setState({
                index: 1
            })
        } else {
            this.setState({
                index: 0
            })
        }
    }

    render() {
        return (
            <button id = {this.props.id} className= {this.props.styling} onClick={this.handleClick}>
                {this.state.player[this.state.index]}
            </button>
        )
    }
}