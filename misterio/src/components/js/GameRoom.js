import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import RollDice from './RollDice.js';
import FinishTurn from './FinishTurn.js';

function HomePage() {
  return (
    <div className= "HP">
        <div  className="HP-text">
            <RollDice/>
            <ListOfPlayers/>
            <FinishTurn/>
        </div>
    </div>
  );
}

export default HomePage;