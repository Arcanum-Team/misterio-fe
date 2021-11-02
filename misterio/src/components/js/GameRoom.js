import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import RollDice from './RollDice.js';
import FinishTurn from './FinishTurn.js';

class GameRoom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        players: [],
        turn: 0
    };
  }

  handleCallback = (childData) =>{
    this.setState({turn: childData})
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };

    fetch(
      "http://127.0.0.1:8000/api/v1/games/" + this.props.match.params.id, requestOptions)
      .then((res) => res.json())
      .then((json) => {
          this.setState({
              players: [].concat(json.players).sort((a, b) => a.order > b.order ? 1 : -1),
              turn: 1
          });
      })
  }

  render(){
    return (
      <div className= "HP">
        <div className="HP-text">
            <RollDice/>
            <ListOfPlayers players={this.state.players} turn={this.state.turn}/>
            <FinishTurn parentCallback = {this.handleCallback} gameId={this.props.match.params.id}/>
        </div>
    </div>
    );
  }
}

export default GameRoom;