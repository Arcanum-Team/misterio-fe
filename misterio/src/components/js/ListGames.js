import React from "react";
import { useHistory } from "react-router-dom";
import '../css/Button.css';

function ListGames() {
  let history = useHistory();

  const handleClick = () =>{
    history.push("/ListOfGames");
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
