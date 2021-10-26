import React from "react";
import { useHistory } from "react-router-dom";
import '../css/CreateGame.css';
import GameRoom from './GameRoom.js';

function ListGames() {
  let history = useHistory();

  const handleClick = () =>{
    // history.push("/ListOfGames");
    history.push("/GameRoom");
  }

  return (                                                                                                                
    <div>
      <button className="boton" onClick= {handleClick}>
        Listar Partidas
      </button>
    </div>
  );
}

export default ListGames;
