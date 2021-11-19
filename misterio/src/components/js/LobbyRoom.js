import React from "react";
import LobbyPlayer from './LobbyPlayer'
import StartGame from './StartGame';
import '../css/LobbyRoom.css';
import ReactDOM from 'react-dom';

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

  onMessage(message){
    if(message.type === "JOIN_PLAYER"){
      this.setState({
        players: message.data.players
      })
    }else if(message.type === "START_GAME"){
      this.props.history.push("../GameRoom/" + message.data.game.id);
    }
  }
  
  // sendMessage(){

  // }

  componentDidMount() {
    global.sh.subscribe((event) => this.onMessage(event))

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

    fetch(
        "http://127.0.0.1:8000/api/v1/games/" + this.props.match.params.id , requestOptions)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          this.setState({
            gameName: json.game.name,  
            players: json.players,
            playerNum: json.player_count
          })
        })
  }
  
  render(){
    return (
      <div className="lcontainer">
          <h3 className = "gameName">
            {this.state.gameName}
          </h3>
          <p className = "lobby">
            Lobby
          </p>
          <div id="playersContainer" className="playersContainer">
            {this.state.players.map((player) => ( 
              <LobbyPlayer playerName = { player.nickname } />
            ))}
          </div>
          {window.sessionStorage.getItem("host_id")!= null && <StartGame className="startGameButton" GameId={this.props.match.params.id}/>}
      </div>
    );
  }
}

export default LobbyRoom;
