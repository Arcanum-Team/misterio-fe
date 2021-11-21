import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import ShowCards from './ShowCards.js';
import RollDice from './RollDice.js';
import FinishTurn from './FinishTurn.js';
import Board from './Board.js';
import Modal from '../js/Modal'
import '../css/SuspectModal.css';
import SocketHandler from './SocketHandler'
import update from 'immutability-helper';

class GameRoom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        players: [],
        currentPlayer: {},
        turn: 0,
        dice: 1,
        possibleMoves: [],
        modalSusActive: false,
        modalSorting: true,
        modalShowSusActive: false,
        modalAccActive: false,
        exceptionMessage:"",
        monstruos: [],
        victimas: [],
        recintos: [],
        monstruo: '',
        victima: '',
        recinto: '',
        allPlayersPos: [],
        all:
    };
  }
  
  handleDCallback = (json, dice) =>{
    this.setState({
      possibleMoves: json,
      dice: dice
    })
  }

  handlePCallback = (childData) =>{
    this.setState({
      possibleMoves: childData
    })
  }

  toggleSus = () => {
    this.setState({
      modalSusActive: !this.state.modalSusActive
    })
  }

  toggleShowSus = () => {
    this.setState({
      modalShowSusActive: !this.state.modalShowSusActive,
      modalSusActive: !this.state.modalSusActive
    })
    setTimeout(() => {
      this.setState({
        modalShowSusActive: !this.state.modalShowSusActive
      })
    }, 6000)
  }

  toggleAcc = () => {
    this.setState({
      modalAccActive: !this.state.modalAccActive
    })
  }

  saveMonster = event => { 
      this.setState({monstruo: event.target.value});
  }

  saveVictim = event => { 
      this.setState({victima: event.target.value});
  }
  saveEnclosure = event => { 
      this.setState({recinto: event.target.value});
  }

  onMessage(message){
    console.log(message)
    if(message.type === "PLAYER_NEW_POSITION"){
      this.setState(update(this.state, {
        allPlayersPos: {
            [message.data.player.order - 1]: {
                $set: {
                  order: message.data.player.order,
                  color: "green",
                  position: message.data.player.current_position.id
                }
            }
        }
      }));
      console.log(this.state.allPlayersPos);
    }else if(message.type === "ASSIGN_SHIFT"){
      this.setState({
        turn: message.data.game.turn
      })
    }
  }

  componentDidMount() {
    if(global.sh !== undefined){
      global.sh.subscribe((event) => this.onMessage(event))
    }else{
      global.sh = new SocketHandler();
      global.sh.connect(window.sessionStorage.getItem("game_id"), window.sessionStorage.getItem("player_id"));
      global.sh.subscribe((event) => this.onMessage(event))
    }

    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };

    fetch(
      "http://127.0.0.1:8000/api/v1/games/" + this.props.match.params.id, requestOptions)
      .then((res) => res.json())
      .then((json) => {
          this.setState({
              players: [].concat(json.players).sort((a, b) => a.order > b.order ? 1 : -1),
              turn: 1,
              currentPlayer: json.players.filter((player) => player.id === window.sessionStorage.getItem("player_id"))[0],
          });
          json.players.map((player) => {
            this.setState({
              allPlayersPos: this.state.allPlayersPos.concat({
                order: player.order,
                color: "green",
                position: player.current_position.id 
              }).sort((a, b) => a.order > b.order ? 1 : -1)
            })
          })
      })
    fetch(
      "http://127.0.0.1:8000/api/v1/cards", requestOptions)
      .then((res) => res.json())
      .then((json) => {
          this.setState({
            monstruos: json.filter(x => x.type === "MONSTER"),
            victimas: json.filter(x => x.type === "VICTIM"),
            recintos: json.filter(x => x.type === "ENCLOSURE"),
          });
      })
    setTimeout(() => {
      this.setState({
        modalSorting: false
      })
    }, 1300)
  }

  render(){
    const { monstruos } = this.state;
    const { victimas } = this.state;
    const { recintos } = this.state;
    return (
      <div className= "HP">
        <div className="HP-text">
            <div className="scene">
              {/* poner el id del jugador "dueño" del ws */}
              <ShowCards playerId = {window.sessionStorage.getItem("player_id")}/>
            </div>
            {this.state.currentPlayer.order == this.state.turn &&
            <>
              <RollDice parentCallback = {this.handleDCallback} playerId = {window.sessionStorage.getItem("player_id")} gameId={this.props.match.params.id}/>
              <div className="playerOptions">
                <button className = "turnContinue" onClick={this.toggleSus}> Sospechar </button> 
                <button className = "turnContinue" onClick={this.toggleAcc}> Acusar </button>
                <FinishTurn gameId={this.props.match.params.id}/>
              </div>
            </>
            }
            <ListOfPlayers players={this.state.players} turn={this.state.turn}/>
            <Board possibleMoves = {this.state.possibleMoves} parentCallback = {this.handlePCallback}
                    dice = {this.state.dice} playersPosition = {this.state.allPlayersPos}/>
        </div>
        {/*SOSPECHAR*/}
        <Modal active={this.state.modalSusActive}>
          <div className="dropdown">
              <div className="mod-confirm"> Elija el monstruo 
                  <select className="form-select" onChange = {this.saveMonster}>
                    <option disabled hidden selected >Monstruo...</option>
                    {monstruos.map((monster) => 
                    <option>{monster.name}</option>)}
                  </select>
              </div>
          </div>
          <div class="dropdown">
              <div className="mod-confirm"> Elija la victima 
                  <select className="form-select" onChange = {this.saveVictim}>
                    <option disabled hidden selected >Victima...</option>
                    {victimas.map((victim) => 
                    <option>{victim.name}</option>)}
                  </select>
              </div>
              <button className = "aceptar" type = "submit" onClick={this.toggleShowSus}> Aceptar </button>
              <button className = "cancelar" type = "submit" onClick={this.toggleSus}> Cancelar </button>
          </div>
        </Modal>
        {/*MOSTRAR SOSPECHA*/}
        {this.state.modalShowSusActive ?
          <Modal active={this.state.modalShowSusActive}>
            <div class="dropdown">
                <div className="mod-confirm"> La sospecha realizada es:
                </div>
                  <button class="scard">
                    <div className="scard__type">Monstruo</div>
                    <div class={"scard__name " + this.state.monstruo}>{this.state.monstruo}</div>
                  </button>
                  <button class="scard">
                    <div className="scard__type">victima</div>
                    <div class={"scard__name " + this.state.victima}>{this.state.victima}</div>
                  </button>
                  <button class="scard">
                    <div className="scard__type">recinto</div>
                    <div class={"scard__name " + this.state.recinto}> RECINTO </div>
                  </button>
            </div>
          </Modal>:
            null
        }
        {/*ACUSAR*/}
        <Modal active={this.state.modalAccActive}>
          <div className="dropdown">
            <div className="mod-confirm"> Elija el recinto definitivo
                <select className="form-select" onChange = {this.saveEnclosure}>
                  <option disabled hidden selected >Recinto...</option>
                  {recintos.map((recinto) => 
                  <option>{recinto.name}</option>)}
                </select>
            </div>
          </div>
          <div className="dropdown">
              <div className="mod-confirm"> Elija el monstruo definitivo
                  <select className="form-select" onChange = {this.saveMonster}>
                    <option disabled hidden selected >Monstruo...</option>
                    {monstruos.map((monster) => 
                    <option>{monster.name}</option>)}
                  </select>
              </div>
          </div>
          <div class="dropdown">
              <div className="mod-confirm"> Elija la victima definitiva
                  <select className="form-select" onChange = {this.saveVictim}>
                    <option disabled hidden selected  >Victima...</option>
                    {victimas.map((victim) => 
                    <option>{victim.name}</option>)}
                  </select>
              </div>
              <button className = "aceptar" type = "submit" onClick={this.toggleAcc}> Aceptar </button>
              <button className = "cancelar" type = "submit" onClick={this.toggleAcc}> Cancelar </button>
          </div>
        </Modal>
      {/*REPARTIR*/}
        <Modal active={this.state.modalSorting}>
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-body text-center">
                <h4> Repartiendo Cartas!</h4>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default GameRoom;