import React from 'react';
import detective from '../detective.png';
import '../css/LobbyPlayer.css';

class LobbyPlayer extends React.Component {
    render(){
        return (
            <div class="image-area">
        <div class="img-wrapper">
            <img src={detective} alt="detective" />
            <h2> {this.props.playerName} </h2>
        </div>
    </div>
    );
  }
}

export default LobbyPlayer;
