import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import RollDice from './RollDice.js';

function HomePage() {
  return (
    <div className= "HP">
        <div  className="HP-text">
            <RollDice/>
            <ListOfPlayers/>
        </div>
    </div>
  );
}

export default HomePage;