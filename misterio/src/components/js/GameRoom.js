import React from "react";
import '../css/HomePage.css';
import ListOfPlayers from './ListOfPlayers.js';
import ShowCards from './ShowCards.js';
import RollDice from './RollDice.js';
import FinishTurn from './FinishTurn.js';
import Board from './Board.js';
import Modal from '../js/Modal'
import '../css/SuspectModal.css';

class GameRoom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        players: [],
        turn: 0,
        modalSusActive: false,
        modalShowSusActive: false,
        modalAccActive: false,
        exceptionMessage:"",
        monstruos: [],
        victimas: [],
        recintos: [],
        monstruo: '',
        victima: '',
        recinto: '',
    };
  }
  
  handleCallback = (childData) =>{
    this.setState({turn: childData})
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
    console.log(message);
  }

  componentDidMount() {
    global.sh.subscribe((event) => this.onMessage(event))

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
              turn: 1
          });
      })
      // fetch(
      // "http://127.0.0.1:8000/api/v1/cards", requestOptions)
      // .then((res) => res.json())
      // .then((json) => {
      //     this.setState({
      //       monstruos: json.filter(x => x.type == "MONSTER"),
      //       victimas: json.filter(x => x.type == "VICTIM"),
      //       recintos: json.filter(x => x.type == "ENCLOSURE"),
      //     });
      // })
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
              {console.log(window.sessionStorage.getItem("player_id"))}
              <ShowCards playerId = {window.sessionStorage.getItem("player_id")}/>
            </div>
            <RollDice/>
            <ListOfPlayers players={this.state.players} turn={this.state.turn}/>
            <div className="playerOptions">
              <button className = "turnContinue" onClick={this.toggleSus}> Sospechar </button> 
              <button className = "turnContinue" onClick={this.toggleAcc}> Acusar </button>
              <FinishTurn parentCallback = {this.handleCallback} gameId={this.props.match.params.id}/>
            </div>
            <Board/>
        </div>

        {/*SOSPECHAR*/}
        <Modal active={this.state.modalSusActive} toggle={this.toggleSus.bind(this)}>
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
          <Modal active={this.state.modalShowSusActive} toggle={this.toggleShowSus.bind(this)}>
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
                    <div class={"scard__name " + this.state.recinto}>{this.state.victima}</div>
                  </button>
            </div>
          </Modal>:
            null
        }
        {/*ACUSAR*/}
        <Modal active={this.state.modalAccActive} toggle={this.toggleAcc.bind(this)}>
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
      </div>
    );
  }
}
// onClick = {this.handleSubmit.bind(this)}
export default GameRoom;