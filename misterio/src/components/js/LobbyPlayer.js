import React from 'react';
import detective from '../../drawable/detective.png';
import '../css/LobbyPlayer.css';

class LobbyPlayer extends React.Component {
    render(){
        return (
            <div className="image-area">
        <div className="img-wrapper">
            <img src={detective} alt="detective" />
            <h2> {this.props.playerName} </h2>
        </div>
    </div>
    );
  }
}

export default LobbyPlayer;
