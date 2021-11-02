import React from "react";
import logo from '../../logo.png';
import '../css/HomePage.css';
import CreateGame from './CreateGame.js';
import ListGames from './ListGames.js';

function HomePage() {
  return (
    <div className= "HP">
        <p>
            <img src={logo} className="HP-logo" alt="logo" />
        </p>
        <div  className="HP-text">
            <CreateGame/>
            <ListGames/>
        </div>
    </div>
  );
}

export default HomePage;