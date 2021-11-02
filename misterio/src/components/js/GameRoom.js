import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import Card from './Card.js';
import RollDice from './RollDice.js';
import FinishTurn from './FinishTurn.js';
import Accuse from './Accuse.js';
import Suspect from './Suspect.js';
import Board from './Board.js';

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
            <div className="scene">
              <Card C="c1"/>
              <Card C="c2"/>
              <Card C="c3"/>
              <Card C="c4"/>
              <Card C="c5"/>
              <Card C="c6"/>
              <Card C="c7"/>
              <Card C="c8"/>
              <Card C="c9"/>
            </div>
            <div className="playerOptions">
              <Suspect/>
              <Accuse/>
              <FinishTurn parentCallback = {this.handleCallback} gameId={this.props.match.params.id}/>
            </div>
            <Board/>
        </div>
    </div>
    );
  }
}

export default GameRoom;