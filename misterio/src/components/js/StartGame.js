import React from "react";
import { useHistory } from "react-router-dom";
import '../css/StartGame.css';

function StartGame() {
  let history = useHistory();

  const handleClick = () =>{
    history.push("/GameRoom");
  }

  return (                                                                                                                
    <div>
      <button className="sboton" onClick= {handleClick}>
        Iniciar Partida
      </button>
    </div>
  );
}

export default StartGame;
