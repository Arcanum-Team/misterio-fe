import React from "react";
import Card from './Card'
import StartGame from './StartGame';
import '../css/LobbyRoom.css';

function LobbyRoom() {
  return (
    <div className="lcontainer">
        <h3 className = "gameName">
          Nombre de Partida
        </h3>
        <p className = "lobby">
          Lobby
        </p>
        <div>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <StartGame/>
    </div>
  );
}

export default LobbyRoom;
