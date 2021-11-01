import React from "react";
import Card from './Card'
import StartGame from './StartGame';
import '../css/LobbyRoom.css';

class LobbyRoom extends React.Component {
  constructor(props) {
      super(props);
 
      this.state = {
          host: '',
          gameName:'',
          players: [],
          playerNum: 0,
      };
  }

  componentDidMount() {

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

    fetch(
        "http://127.0.0.1:8000/api/v1/games/" + this.props.match.params.id , requestOptions)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            gameName: json.name,  
            players: json.players,
            playerNum: json.player_count,
          })
        })
  }


  render(){
    const { players } = this.state.players;
    return (
      <div className="lcontainer">
          <h3 className = "gameName">
            {this.state.gameName}
          </h3>
          <p className = "lobby">
            Lobby
          </p>
          <div className="playersContainer">
            {this.state.players.map((player) => ( 
              <Card playerName = { player.nickname } />
            ))}
          </div>
          <StartGame className="startGameButton" GameId={this.props.match.params.id}/>
      </div>
    );
  }
}

export default LobbyRoom;
