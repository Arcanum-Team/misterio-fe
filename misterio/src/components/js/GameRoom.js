import React from "react";
import Board from './Board.js';
import Modal from '../js/Modal'
import RollDice from './RollDice.js';
import ShowCards from './ShowCards.js';
import FinishTurn from './FinishTurn.js';
import SocketHandler from './SocketHandler'
import ListOfPlayers from './ListOfPlayers.js';
import '../css/HomePage.css';
import '../css/GameRoom.css';
import '../css/SuspectModal.css';
import update from 'immutability-helper';

class GameRoom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        players: [],
        playersInEnc: [0,0,0,0,0,0],
        currentPlayer: {},
        entries: [5,11,16,23,31,36,45,51,57,64,71,77],
        turn: 0,
        dice: 1,
        possibleMoves: [],
        showDice: true,
        modalSusActive: false,
        modalSorting: true,
        modalShowSusActive: false,
        modalAccActive: false,
        modalInfActive: false,
        exceptionMessage:"",
        entryButton: false,
        monstruos: [],
        victimas: [],
        recintos: [],
        monstruo: '',
        victima: '',
        recinto: '',
        allPlayersPos: [],
        reportItems: [],
    };
    this.saveCheckNo = this.saveCheckNo.bind(this);
    this.saveCheckYes = this.saveCheckYes.bind(this);
    this.saveCheckMaybe = this.saveCheckMaybe.bind(this);
  }
  
  handleDCallback = (json, dice) =>{
    this.setState({
      possibleMoves: json,
      dice: dice
    })
  }

  handleBCallback = (emptyMoves, player) =>{
    this.setState({
      possibleMoves: emptyMoves,
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

  EnclosureIn = () =>{
    const data = {'game_id': window.sessionStorage.getItem("game_id"),
          'player_id': window.sessionStorage.getItem("player_id")}

    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

    fetch("http://127.0.0.1:8000/api/v1/shifts/enclosure/enter", requestOptions)
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            currentPlayer: json.player,
            possibleMoves: []
      });
    })
  }

  enterEnclosure = () => {
    this.setState({
      entryButton: false
    })
    this.EnclosureIn()
  }
  
  toggleInf = () => {
    this.setState({
      modalInfActive: !this.state.modalInfActive
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
    if(message.type === "PLAYER_NEW_POSITION" || message.type === "ENCLOSURE_EXIT"){
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
      if(message.data.player.id == window.sessionStorage.getItem("player_id"))
        this.setState({
          currentPlayer: message.data.player,
          entryButton: false
        });
        if(this.state.entries.some(entry => entry == message.data.player.current_position.id 
          && message.type === "PLAYER_NEW_POSITION")){
          this.setState({
            entryButton: true
          });
        }
        if(message.type === "ENCLOSURE_EXIT"){
          if(message.data.player.order != 0){
            this.setState(update(this.state, {
              playersInEnc: {
                  [message.data.player.order - 1]: {
                      $set: 0
                  }
              }
            }));
          }
        }else{
          this.setState({
            showDice: false
          });
        }
    }else if(message.type === "ASSIGN_SHIFT"){
      if(message.data.player.id == window.sessionStorage.getItem("player_id")){
        this.setState({
          currentPlayer: message.data.player,
          entryButton: false,
          showDice: true
        });
        if(message.data.player.current_position ===null){
          this.setState({
            possibleMoves: [].concat(message.data.player.enclosure.doors.map((door) => {return door.id})),
          });
        } else if(this.state.entries.some(entry => entry == message.data.player.current_position.id)){
          this.setState({
            entryButton: true
          })
        }
      }else{
        this.setState({
          possibleMoves: [],
          entryButton: false
        });
      }
      this.setState({
        turn: message.data.game.turn
      })
    }else if(message.type === "ENCLOSURE_ENTER"){
      this.setState(update(this.state, {
        allPlayersPos: {
            [message.data.player.order - 1]: {
                $set: {
                  order: message.data.player.order,
                  color: "green",
                  position: null
                }
            }
        }
      }));
      this.setState(update(this.state, {
        playersInEnc: {
            [message.data.player.order - 1]: {
                $set: message.data.player.enclosure.id
            }
        }
      }));
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
            turn: json.game.turn,
            currentPlayer: json.players.filter((player) => player.id === window.sessionStorage.getItem("player_id"))[0],
        });
        json.players.map((player) => {
          if(player.current_position !== null){
            this.setState({
              allPlayersPos: this.state.allPlayersPos.concat({
                order: player.order,
                color: "green",
                position: player.current_position.id 
              }).sort((a, b) => a.order > b.order ? 1 : -1)
            })
          }else{
            this.setState(update(this.state, {
              playersInEnc: {
                  [player.order - 1]: {
                      $set: player.enclosure.id
                  }
              }
            }));
          }
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
            reportItems: [].concat(json.map((x)=> {return {name: x.name, yes: false, no: false, maybe: false}}))
          });
      })
    setTimeout(() => {
      this.setState({
        modalSorting: false
      })
    }, 1300)
    setTimeout(() => {
      if(this.state.currentPlayer.current_position === null &&
        this.state.currentPlayer.order === this.state.turn){
        this.setState({
          possibleMoves: [].concat(this.state.currentPlayer.enclosure.doors.map((door) => {return door.id}))
        })
      }
    }, 1000)
  }
  saveCheckNo(name, yes, no, maybe) {
    var index = this.state.reportItems.findIndex(function(c) { 
        return c.name == name; 
    });
    this.setState(update(this.state, {
      reportItems: {
        [index]: {
          $set: {
            name: name, yes: yes, no: !no, maybe: maybe,
          }
        }
      }
    }))

  }
  saveCheckMaybe(name, yes, no, maybe) {
    var index = this.state.reportItems.findIndex(function(c) { 
        return c.name == name; 
    });
    this.setState(update(this.state, {
      reportItems: {
        [index]: {
          $set: {
            name: name, yes: yes, no: no, maybe: !maybe,
          }
        }
      }
    }))
  }

  saveCheckYes(name, yes, no, maybe) {
    var index = this.state.reportItems.findIndex(function(c) { 
        return c.name == name; 
    });
    this.setState(update(this.state, {
      reportItems: {
        [index]: {
          $set: {
            name: name, yes: !yes, no: no, maybe: maybe,
          }
        }
      }
    }))
  }


  render(){
    const { monstruos } = this.state;
    const { victimas } = this.state;
    const { recintos } = this.state;
    const { reportItems } = this.state;
    return (
      <div className= "HP">
        <div className="HP-text">
            <div className="scene">
              {/* poner el id del jugador "dueño" del ws */}
              <ShowCards playerId = {window.sessionStorage.getItem("player_id")}/>
            </div>
            {this.state.currentPlayer.order === this.state.turn &&
            <>
              {this.state.currentPlayer.current_position !== null && 
                <RollDice parentCallback = {this.handleDCallback} playerId = {window.sessionStorage.getItem("player_id")} 
                gameId={this.props.match.params.id} showDice = {this.state.showDice}/>
              }
              <div className="playerOptions">
                {this.state.currentPlayer.current_position === null &&
                  <button className = "turnContinue" onClick={this.toggleSus}> Sospechar </button> 
                }
                <button className = "turnContinue" onClick={this.toggleAcc}> Acusar </button>
                <FinishTurn gameId={this.props.match.params.id}/>
              </div>
            </>
            }
            <div className="otherPlayerOptions">
              {this.state.entryButton && this.state.currentPlayer.order === this.state.turn &&
                <button className = "entrarRecinto" onClick={this.enterEnclosure}> Entrar a Recinto </button>
              }
              <button className = "informeBoton" onClick={this.toggleInf}> Informe </button>
              <button className = "chatBoton" > Chat </button>
            </div>
            <ListOfPlayers players={this.state.players} turn={this.state.turn}/>
            <Board possibleMoves = {this.state.possibleMoves} parentCallback = {this.handleBCallback}
                    dice = {this.state.dice} playersPosition = {this.state.allPlayersPos}
                    entryEnable = {this.state.entryButton} myPlayer = {this.state.currentPlayer}
                    playersInEnc = {this.state.playersInEnc}/>
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
      {/*INFORME*/}
        <Modal active={this.state.modalInfActive}>
          <th className= "first-row" scope="col">Si</th>
          <th className= "topping" scope="col">No</th>
          <th className= "topping" scope="col">Capaz</th>
          <div className="informeScroll">
            {reportItems.map(item => (
              <tr className= "topping">
                <td className="first-column" > 
                  {item.name}
                </td>
                <td className="rowtype">
                  <input type="checkbox" class="Checkbox" checked={item.yes}
                    onChange={() => this.saveCheckYes(item.name, item.yes, item.no, item.maybe)}/>
                </td>
                <td className="rowtype">
                  <input type="checkbox" class="Checkbox" checked={item.no}
                    onChange={() => this.saveCheckNo(item.name, item.yes, item.no, item.maybe)}/>
                </td>
                <td className="rowtype">
                  <input type="checkbox" class="Checkbox" checked={item.maybe}
                    onChange={() => this.saveCheckMaybe(item.name, item.yes, item.no, item.maybe)}/>
                </td>
              </tr>
            ))}
          </div>
          <button className = "aceptarInforme" onClick={this.toggleInf}> Aceptar </button>
        </Modal>
      </div>
    );
  }
}
export default GameRoom;