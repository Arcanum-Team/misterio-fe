import React from "react";
import "../css/Dice.css";
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'

const Dice = ({number, rolling}) =>{
    return(
        <i className={`dice bi bi-dice-${number} ${rolling && "shaking"}`}/>
    );
};

export default Dice;
