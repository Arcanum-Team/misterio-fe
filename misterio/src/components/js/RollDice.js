import React, {useState} from "react";
import Dice from "./Dice";
import "../css/RollDice.css";

const RollDice = ({sides}) =>{
    
    const[state, setState] = useState({
        dice: "1",
        rolling: false,
        totalMoves: 0,
    });

    const {dice, rolling, totalMoves} = state;

    const roll = () => {
        const newDice = sides[Math.floor(Math.random() * sides.length)];
        const moves = Object.values(newDice);
        setState({
            dice: Object.values(newDice),
            rolling: true,
            totalMoves: moves[0],
        });
        setTimeout(() => {
            setState((prevState) => ({...prevState, rolling: false}));
        }, 1000);
    };

    return(
        <>
        <div className="roll-dice">
            <div className="rolldice-container">
                <Dice number={String(dice)} rolling={rolling}/>
            </div>
            <button onClick={roll} disabled={rolling}>
                {rolling ? "Tirando..." : "Tirar dado"}
            </button>
            <h2 className="totalMoves"> Numero: {totalMoves}</h2>
        </div>
        </>
    );
};

RollDice.defaultProps = {
    sides: [
        {one: 1},
        {two: 2},
        {three: 3},
        {four: 4},
        {five: 5},
        {six: 6},
    ],
}

export default RollDice;
