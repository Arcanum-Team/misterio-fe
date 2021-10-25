import React from "react";
import logo from '../../logo.png';
import '../css/HomePage.css';

function HomePage() {
  return (
    <div className= "HP">
        <p>
            <img src={logo} className="HP-logo" alt="logo" />
        </p>
        <div  className="HP-text">
            <b className="boton">
                Crear Partida
            </b>
            <b className="boton">
                Listar Partidas
            </b>
        </div>
    </div>
  );
}

export default HomePage;