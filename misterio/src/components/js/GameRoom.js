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
    };
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
              players: json.players
          });
      })
  }

  render(){
    return (
      <div className= "HP">
        <div  className="HP-text">
            <RollDice/>
            <ListOfPlayers players={this.state.players}/>
            <FinishTurn/>
        </div>
    </div>
    );
  }
}

export default GameRoom;