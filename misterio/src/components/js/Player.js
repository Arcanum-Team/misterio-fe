import React, { Component } from 'react'
import '../css/Player.css';

export default class Player extends Component {
    render() {
        return (
            <div className={"player-" + this.props.color}/>
        )
    }
}
