import React from "react";
import { useHistory } from "react-router-dom";
import '../css/CreateGame.css';

function CreateGame() {
  let history = useHistory();

  const handleClick = () =>{
    history.push("/CreateForm");
  }

  return (                                                                                                                
    <div>
      <button className="boton" onClick= {handleClick}>
        Crear Partida
      </button>
    </div>
  );
}

export default CreateGame;
