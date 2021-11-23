import React from "react";
import Dice from "./Dice";
import "../css/RollDice.css";

class RollDice extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
          sides: [{one: 1},
            {two: 2},
            {three: 3},
            {four: 4},
            {five: 5},
            {six: 6}],
          dice: "1",
          rolling: false,
          alreadyRolled: false,
          totalMoves: 0,
        }
      }
    
    roll = () => {
        const newDice = this.state.sides[Math.floor(Math.random() * this.state.sides.length)];
        this.setState({
            dice: Object.values(newDice),
            rolling: true,
        });
        setTimeout(() => {
            this.setState((prevState) => ({...prevState, rolling: false, alreadyRolled: true}));
        }, 600);
        setTimeout(() => {
            this.doPut();
        }, 0.00000000001);
    };
        
    doPut = () =>{
        const data = {
            'game_id': this.props.gameId,
            'player_id': this.props.playerId,
            'dice': parseInt(this.state.dice)
        }
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(data)
        };
        fetch(
            "http://127.0.0.1:8000/api/v1/shifts/roll-dice", requestOptions)
        .then((res) => res.json())
        .then((json) => {
            this.props.parentCallback(json, data.dice);
        })       
    }

    componentWillReceiveProps(){
		this.setState({
			alreadyRolled : !this.props.showDice
		})
	}

    render () {
        return(
            <div className="roll-dice">
                <div className="rolldice-container">
                    <Dice number={String(this.state.dice)} rolling={this.state.rolling}/>
                </div>
                {!this.state.alreadyRolled &&
                    <button onClick={() => this.roll()} disabled={this.state.rolling}>
                        {this.state.rolling ? "Tirando..." : "Tirar dado"}
                    </button>
                }
            </div>
        );
    }
};

export default RollDice;

