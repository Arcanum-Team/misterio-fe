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
import '../css/Chat.css';

class GameRoom extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        players: [],
        playersInEnc: [{enc:0,color:''},{enc:0,color:''},{enc:0,color:''},
                      {enc:0,color:''},{enc:0,color:''},{enc:0,color:''}],
        currentPlayer: {},
        entries: [5,11,16,23,31,36,45,51,57,64,71,77],
        turn: 0,
        dice: 1,
        possibleMoves: [],
        showDice: true,
        modalSalem: false,
        modalSusActive: false,
        modalShowAccResActive : false,
        modalShowWinner : false,
        modalSorting: false,
        modalShowSusActive: false,
        modalAccActive: false,
        modalChatActive: false,
        modalInfActive: false,
        showSalem: '',
        modalResponseSuspect: false,
        modalCardResponseSuspect: false,
        exceptionMessage:"",
        entryButton: false,
        monstruos: [],
        victimas: [],
        recintos: [],
        monstruo: '',
        victima: '',
        recinto: '',
        accusationResult: {isWinner: null, playerName: ""}, //isWinner null if it's not either winner or loser, true for winner, false for loser
        ableToPlay: true, // Everyone is able to play unless they do an incorrect accusation
        allPlayersPos: [],
        reportItems: [],
        playerCards: [],
        suspectMatchCards: [],
        messages: [],
        messageToBeSent:"",
        noMessages: true
    };
    this.inputMessageRef= React.createRef();
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

  getPlayerCardsCallback = (cards) => {
    this.setState({
      playerCards: cards
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
  
  toggleResponseSuspect = () => {
    this.setState({
      modalResponseSuspect: !this.state.modalResponseSuspect
    })
  }

  toggleCardResponseSuspect = () => {
    this.setState({
      modalCardResponseSuspect: !this.state.modalCardResponseSuspect
    })
    setTimeout(() => {
      this.setState({
        modalCardResponseSuspect: !this.state.modalCardResponseSuspect
      })
      const dataPass = {'game_id': window.sessionStorage.getItem("game_id"), 'player_id': window.sessionStorage.getItem("player_id")}
      const requestOptionsTurn = {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(dataPass)
      };
    
      fetch("http://127.0.0.1:8000/api/v1/shifts/pass", requestOptionsTurn)
    }, 6000)
  }

  toggleShowSus = () => {
    this.setState({
      modalShowSusActive: !this.state.modalShowSusActive
    })
    setTimeout(() => {
      this.setState({
        modalShowSusActive: !this.state.modalShowSusActive
      })
    }, 6000)
  }

  answerSuspicion = (selectedCard) => {
    const data = {
      'game_id': window.sessionStorage.getItem("game_id"), 
      'from_player': this.state.suspectPlayersId.reachedPlayerId, 
      'to_player': this.state.suspectPlayersId.playerMadeSuspect,
      'card': selectedCard.id
    }

    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

    fetch("http://127.0.0.1:8000/api/v1/shifts/send_suspect_card", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        this.toggleResponseSuspect();
    })
  }

  modalShowAccResActive = () => {
    setTimeout(() => {
      this.setState({
        modalShowAccResActive: !this.state.modalShowAccResActive
      })
    }, 1000)
    setTimeout(() => {
      this.setState({
        modalShowAccResActive: !this.state.modalShowAccResActive,
      })
    }, 6000)
  }

  modalShowWinner = () => {
    setTimeout(() => {
      this.setState({
        modalShowWinner: !this.state.modalShowWinner
      })
    }, 6000)
    setTimeout(() => {
      this.setState({
        modalShowWinner: !this.state.modalShowWinner,
      })
    }, 10000)
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
    window.sessionStorage.setItem("report_items", JSON.stringify(this.state.reportItems))
  }

  saveMonster = event => { 
      this.setState({monstruo: event.target.value});
  }
  
  toggleChat = () => { 
      this.setState({modalChatActive: !this.state.modalChatActive});
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
                  color: message.data.player.color,
                  position: message.data.player.current_position.id
                }
            }
        }
      }));
      if(message.data.player.id === window.sessionStorage.getItem("player_id"))
        this.setState({
          currentPlayer: message.data.player,
          entryButton: false
        });
        if(this.state.entries.some(entry => entry === message.data.player.current_position.id 
          && message.type === "PLAYER_NEW_POSITION")){
          this.setState({
            entryButton: true
          });
        }
        if(message.type === "ENCLOSURE_EXIT"){
          if(message.data.player.order !== 0){
            this.setState(update(this.state, {
              playersInEnc: {
                  [message.data.player.order - 1]: {
                      $set: {
                        enc: 0,
                        color: ''
                      }
                  }
              }
            }));
          }
        }else{
          if(message.data.player.current_position.attribute === "TRAP"){
            const dataPass = {'game_id': window.sessionStorage.getItem("game_id"), 'player_id': window.sessionStorage.getItem("player_id")}
            const requestOptionsTurn = {
              method: 'PUT',
              mode: 'cors',
              headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify(dataPass)
            };
          
            fetch("http://127.0.0.1:8000/api/v1/shifts/pass", requestOptionsTurn)
            
          }
          this.setState({
            showDice: false
          });
        }
    }else if(message.type === "ASSIGN_SHIFT"){
      if(message.data.player.id === window.sessionStorage.getItem("player_id")){
        this.setState({
          currentPlayer: message.data.player,
          entryButton: false,
          showDice: true
        });
        if(message.data.player.current_position ===null){
          this.setState({
            possibleMoves: [].concat(message.data.player.enclosure.doors.map((door) => {return door.id})),
          });
        } else if(this.state.entries.some(entry => entry === message.data.player.current_position.id)){
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
    }else if(message.type === "SUSPECT"){
        this.setState({
          monstruo:  this.state.monstruos.filter((monstruo)=> monstruo.id === message.data.monster_id)[0].name,
          victima:  this.state.victimas.filter((victima)=> victima.id === message.data.victim_id)[0].name,
          recinto:  this.state.recintos.filter((recinto)=> recinto.id === message.data.enclosure_id)[0].name,
        })
        if(message.data.reached_player_id === window.sessionStorage.getItem("player_id")){
          this.setState({
            suspectMatchCards: this.state.playerCards.filter((card)=> card.id === message.data.monster_id || card.id === message.data.victim_id || card.id === message.data.enclosure_id),
            suspectPlayersId: {reachedPlayerId: message.data.reached_player_id, playerMadeSuspect: message.data.player_id } 
          })
          setTimeout(() => {
            this.toggleResponseSuspect();
          }, 6000)
        }
        this.toggleShowSus()
    }else if(message.type === "ACCUSE"){
        this.setState({
          accusationResult: {
            isWinner: !message.data.player.loser,
            playerName: message.data.player.nickname
          }
        })
        this.modalShowAccResActive();
        if(!message.data.result){
          this.setState(update(this.state, {
            allPlayersPos: {
                [this.state.turn - 1]: {
                    $set: {
                      order: 0,
                      color: "",
                      position: 0
                    }
                }
            }
          }));
          if(message.data.player_win !== null){
            this.setState({
              winnerResult: {
                name: message.data.player_win.nickname,
                color: message.data.player_win.color,
              }
            })
            this.modalShowWinner();
            setTimeout(() => {
              this.setState({
                modalShowWinner: !this.state.modalShowWinner
              })
              window.sessionStorage.clear()
              global.sh.disconnect();
              this.props.history.push("../");
            }, 10000)
          }else{
            this.setState({
              turn: message.data.next_player_turn.order
            })
          }
        }else{
          setTimeout(() => {
            window.sessionStorage.clear()
            global.sh.disconnect();
            this.props.history.push("../");
          }, 6000)
          
        }
        if(window.sessionStorage.getItem("player_id") === message.data.player_id){
          this.setState({
            ableToPlay: message.data.result
          })
        
      }
    }else if(message.type === "ENCLOSURE_ENTER"){
      this.setState(update(this.state, {
        allPlayersPos: {
            [message.data.player.order - 1]: {
                $set: {
                  order: message.data.player.order,
                  color: message.data.player.color,
                  position: null
                }
            }
        }
      }));
      this.setState(update(this.state, {
        playersInEnc: {
            [message.data.player.order - 1]: {
                $set: {
                  enc: message.data.player.enclosure.id,
                  color: message.data.player.color
                }
            }
        }
      }));
    }else if(message.type === "SUSPECT_RESPONSE"){
      this.setState({
        responseCard: {
          cardName: this.state.allGameCards.filter((card)=> card.id === message.data.card)[0].name,
          cardType: this.state.allGameCards.filter((card)=> card.id === message.data.card)[0].cardType
        }
      })
      this.toggleCardResponseSuspect();
    }else if(message.type === "CHAT"){
      this.setState({
          messages: this.state.messages.concat({
              player: message.data.nickname,
              text: message.data.message
          }),
          noMessages: false
      })
      setTimeout(() => {
        window.sessionStorage.setItem("messages", JSON.stringify(this.state.messages))
      }, 1000)
    }
  }

  showSalem = () =>{
    const data = {
        'game_id': window.sessionStorage.getItem("game_id"),
        'player_id': window.sessionStorage.getItem("player_id"),
    }
    const deck = this.state.monstruos.concat(this.state.victimas.concat(this.state.recintos))
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
    fetch(
      "http://127.0.0.1:8000/api/v1/shifts/execute_witch", requestOptions)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        showSalem: deck.filter((card)=> card.id === json.card)[0].name
      })
    })       
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
        const myPlayer = json.players.filter((player) => player.id === window.sessionStorage.getItem("player_id"))[0]
        this.setState({
          players: [].concat(json.players).sort((a, b) => a.order > b.order ? 1 : -1),
          turn: json.game.turn,
          currentPlayer: myPlayer,
        });
        if(!myPlayer.witch && window.performance) {
          if (performance.navigation.type !== 1) {
            this.setState({
              modalSorting: true,
            })
            setTimeout(() => {
              this.setState({
                modalSorting: false,
                modalSalem: true
              })
            }, 1000)
            setTimeout(() => {
              this.setState({
                modalSalem: false
              })
            }, 5000)
          }
        }else{
          setTimeout(() => {
            this.showSalem()
          }, 1000)
          this.setState({
            modalSalem: true,
          })
          setTimeout(() => {
            this.setState({
              modalSalem: false
            })
          }, 6000)
        }
        json.players.forEach((player) => {
          if(player.current_position !== null){
            this.setState({
              allPlayersPos: this.state.allPlayersPos.concat({
                order: player.order,
                color: player.color,
                position: player.current_position.id 
              }).sort((a, b) => a.order > b.order ? 1 : -1)
            })
          }else {
            this.setState(update(this.state, {
              playersInEnc: {
                  [player.order - 1]: {
                    $set: {
                      enc: player.enclosure.id,
                      color: player.color
                    }
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
            allGameCards: json,
          });
      })
      if(window.sessionStorage.getItem("report_items") !== null){
        this.setState({
          reportItems: JSON.parse(window.sessionStorage.getItem("report_items"))
        })
      }
      if(window.sessionStorage.getItem("messages") !== null){
        this.setState({
          messages: JSON.parse(window.sessionStorage.getItem("messages")),
          noMessages: false
        })
      }
    setTimeout(() => {
      if(window.sessionStorage.getItem("report_items") === null){
        this.setState({
          reportItems: [].concat(this.state.allGameCards.map((x)=> {return {name: x.name, yes: false, no: false, maybe: false}}))
        })
      }
      if(this.state.currentPlayer.current_position === null &&
        this.state.currentPlayer.order === this.state.turn){
        this.setState({
          possibleMoves: [].concat(this.state.currentPlayer.enclosure.doors.map((door) => {return door.id}))
        })
      }
    }, 2000)
  }

  saveCheckNo(name, yes, no, maybe) {
    var index = this.state.reportItems.findIndex(function(c) { 
        return c.name === name; 
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
        return c.name === name; 
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

  makeAccusation = event =>{
    event.preventDefault();
    this.toggleAcc();
		const data = {
      "game_id": window.sessionStorage.getItem("game_id"),
      "player_id": window.sessionStorage.getItem("player_id"),
      "monster_id": this.state.monstruos.filter((monstruo)=> monstruo.name === this.state.monstruo)[0].id,
      "victim_id": this.state.victimas.filter((victima)=> victima.name === this.state.victima)[0].id,
      "enclosure_id": this.state.recintos.filter((recinto)=> recinto.name === this.state.recinto)[0].id
    }
		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};
		fetch("http://127.0.0.1:8000/api/v1/shifts/accuse", requestOptions)
  } 

  makeSuspicion = event =>{
    event.preventDefault();
    
		const dataSus = {
      "game_id": window.sessionStorage.getItem("game_id"),
      "player_id": window.sessionStorage.getItem("player_id"),
      "monster_id": this.state.monstruos.filter((monstruo)=> monstruo.name === this.state.monstruo)[0].id,
      "victim_id": this.state.victimas.filter((victima)=> victima.name === this.state.victima)[0].id
    }

		const requestOptionsSus = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(dataSus)
		};
		fetch("http://127.0.0.1:8000/api/v1/shifts/suspect", requestOptionsSus)
      this.toggleSus();
      this.setState({
        possibleMoves: [],
        turn: 0
      })
	  } 
  
  saveCheckYes(name, yes, no, maybe) {
    var index = this.state.reportItems.findIndex(function(c) { 
        return c.name === name; 
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

  saveMessageToBeSent = event => { 
    this.setState({messageToBeSent: event.target.value});
  }

  sendMessageChat = event => {
    event.preventDefault();

    this.setState({
        messages: this.state.messages.concat({
            player: this.state.players.filter((player)=> player.id ===  window.sessionStorage.getItem("player_id"))[0].nickname,
            text: this.state.messageToBeSent
        }),
        noMessages: false
    })

    const data = {
        'game_id': window.sessionStorage.getItem("game_id"), 
        'player_id': window.sessionStorage.getItem("player_id"),
        'message': this.state.messageToBeSent
    }

    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

    fetch("http://127.0.0.1:8000/api/v1/games/chat", requestOptions)
    this.inputMessageRef.current.value = "";
    setTimeout(() => {
      window.sessionStorage.setItem("messages", JSON.stringify(this.state.messages))
    }, 1000)
  }
  
  render(){
    const { monstruos, victimas, recintos, reportItems } = this.state;
    // const { victimas } = this.state;
    // const { recintos } = this.state;
    // const { reportItems } = this.state;
    return (
      <div className= "HP">
        <div className="HP-text">
            <div className="scene">
              {/* poner el id del jugador "dueño" del ws */}
              <ShowCards parentCallback = {this.getPlayerCardsCallback} playerId = {window.sessionStorage.getItem("player_id")}/>
            </div>
            {this.state.currentPlayer.order === this.state.turn && this.state.ableToPlay &&
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
              <button className = "chatBoton" onClick={this.toggleChat}> Chat </button>
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
                    <option key={monster.name}>{monster.name}</option>)}
                  </select>
              </div>
          </div>
          <div className="dropdown">
              <div className="mod-confirm"> Elija la victima 
                  <select className="form-select" onChange = {this.saveVictim}>
                    <option disabled hidden selected >Victima...</option>
                    {victimas.map((victim) => 
                    <option key={victim.name}>{victim.name}</option>)}
                  </select>
              </div>
              <button className = "aceptar" type = "submit" onClick={this.makeSuspicion.bind(this)}> Aceptar </button>
              <button className = "cancelar" type = "submit" onClick={this.toggleSus}> Cancelar </button>
          </div>
        </Modal>
        {/*MOSTRAR SOSPECHA*/}
        {this.state.modalShowSusActive ?
          <Modal active={this.state.modalShowSusActive}>
            <div className="dropdown">
                <div className="mod-confirm"> La sospecha realizada es:
                </div>
                  <button className="scard">
                    <div className="scard__type">Monstruo</div>
                    <div className={"scard__name " + this.state.monstruo}>{this.state.monstruo}</div>
                  </button>
                  <button className="scard">
                    <div className="scard__type">victima</div>
                    <div className={"scard__name " + this.state.victima}>{this.state.victima}</div>
                  </button>
                  <button className="scard">
                    <div className="scard__type">recinto</div>
                    <div className={"scard__name " + this.state.recinto}> {this.state.recinto} </div>
                  </button>
            </div>
          </Modal>
            :null
        }
        {/*ACUSAR*/}
        <Modal active={this.state.modalAccActive}>
          <div className="dropdown">
            <div className="mod-confirm"> Elija el recinto definitivo
                <select className="form-select" onChange = {this.saveEnclosure}>
                  <option disabled hidden selected >Recinto...</option>
                  {recintos.map((recinto) => 
                  <option key={recinto.name}>{recinto.name}</option>)}
                </select>
            </div>
          </div>
          <div className="dropdown">
              <div className="mod-confirm"> Elija el monstruo definitivo
                  <select className="form-select" onChange = {this.saveMonster}>
                    <option disabled hidden selected >Monstruo...</option>
                    {monstruos.map((monster) => 
                    <option key={monster.name}>{monster.name}</option>)}
                  </select>
              </div>
          </div>
          <div className="dropdown">
              <div className="mod-confirm"> Elija la victima definitiva
                  <select className="form-select" onChange = {this.saveVictim}>
                    <option disabled hidden selected  >Victima...</option>
                    {victimas.map((victim) => 
                    <option key={victim.name}>{victim.name}</option>)}
                  </select>
              </div>
              <button className = "aceptar" type = "submit" onClick={this.makeAccusation.bind(this)}> Aceptar </button>
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
        {/*SALEM*/}
        {this.state.modalSalem ? 
          (this.state.currentPlayer.witch ?
            <Modal active={this.state.modalSalem}>
              <div className="modal-dialog modal-confirm">
                <h4> ¡La Bruja de Salem! </h4>
                <h2> Esta carta está en el sobre: </h2>
                <button className="scard">
                  <div className={"scard__type SALEM"}> Bruja de Salem </div>
                  <div className={"scard__name " + this.state.showSalem}>{this.state.showSalem}</div>
                </button>
              </div>
            </Modal>
          : <Modal active={this.state.modalSalem}>
            <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h4> La carta de Salem esta siendo mostrada a {this.state.players.filter((p) => p.witch === true)}</h4>
                </div>
              </div>
              {console.log(this.state.players.filter((p) => p.witch === true))}
            </div>
          </Modal>)
          :null 
        }
        {/*Show winner/loser player*/}
        {this.state.modalShowAccResActive ?
          <Modal active={this.state.modalShowAccResActive}>
            <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="text-center">
                <h4> {"El jugador "+ this.state.accusationResult.playerName + " hizo una acusacion..."}</h4>
                <h2> {this.state.accusationResult.isWinner ? " CORRECTA" : " INCORRECTA"} </h2>
                <p> 
                  {"El jugador "+ this.state.accusationResult.playerName + 
                  (this.state.accusationResult.isWinner ? " ha ganado el juego" : " ha sido eliminado del juego y solo puede responder sospechas")}
                </p>
              </div>
            </div>
          </div>
          </Modal>
            :null
        }
      {/*INFORME*/}
        <Modal active={this.state.modalInfActive}>
          <th className= "first-row" scope="col">Si</th>
          <th className= "topping" scope="col">No</th>
          <th className= "topping" scope="col">Capaz</th>
          <div className="informeScroll">
            {reportItems.map(item => (
              <tr key={item.name} className= "topping">
                <td className="first-column" > 
                  {item.name}
                </td>
                <td className="rowtype">
                  <input type="checkbox" className="Checkbox" checked={item.yes}
                    onChange={() => this.saveCheckYes(item.name, item.yes, item.no, item.maybe)}/>
                </td>
                <td className="rowtype">
                  <input type="checkbox" className="Checkbox" checked={item.no}
                    onChange={() => this.saveCheckNo(item.name, item.yes, item.no, item.maybe)}/>
                </td>
                <td className="rowtype">
                  <input type="checkbox" className="Checkbox" checked={item.maybe}
                    onChange={() => this.saveCheckMaybe(item.name, item.yes, item.no, item.maybe)}/>
                </td>
              </tr>
            ))}
          </div>
          <button className = "aceptarInforme" onClick={this.toggleInf}> Aceptar </button>
        </Modal>
      {/*SUSPECT SELECT CARD*/}
      {this.state.modalResponseSuspect ?
          <Modal active={this.state.modalResponseSuspect}>
            <div className="dropdown">
              <div className="mod-confirm"> Elige que carta de la sospecha mostrar:</div>
              {this.state.suspectMatchCards.map((card) => ( 
                  <button key={card.name} className="scard" onClick={() => this.answerSuspicion(card)}>
                   <div className="scard__type">{card.type}</div>
                   <div className={"scard__name " + card.name}>{card.name}</div>
                 </button>
              ))}
              </div>
          </Modal>:
            null
        }
        {/*SUSPECT CARD RESPONSE*/}
        {this.state.modalCardResponseSuspect ?
            <Modal active={this.state.modalCardResponseSuspect}>
              <div className="dropdown">
                <div className="mod-confirm"> Resultado de tu sospecha: </div>
                <p>Asegurate de anotarla en tu informe</p>
                  <button className="scard">
                    <div className="scard__type">{this.state.responseCard.cardType}</div>
                    <div className={"scard__name " + this.state.responseCard.cardName}>{this.state.responseCard.cardName}</div>
                  </button>
                </div>
            </Modal>:
              null
          } 
          {/*SHOW WINNER*/}
          {this.state.modalShowWinner ?
              <Modal active={this.state.modalShowWinner}>
              <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                <div className="text-center">
                  <h4> {"El ganador de la partida es..."}</h4>
                  <h2> {this.state.winnerResult.name } </h2>
                </div>
              </div>
            </div>
            </Modal>:
                null
            }
            {/*CHAT*/}
            {this.state.modalChatActive ?
              <Modal active={this.state.modalChatActive}>
                <div className="bubbleWrapper">
                <div className="inlineContainer">
                <div className="modal-dialog modal-confirm">
                    <div className="text-center">
                      <h4> Chat General</h4>
                    </div>
                </div>
                    <div className="otherBubble other">
                    {this.state.noMessages  ? 
                     <>
                       <div className="messageContainer">
                           <span className="other">Todavia no hay mensajes, sé el primero :)</span><br/>
                           <hr/>
                       </div>
                    </>
                    : 
                    <>
                      {this.state.messages.map(message => (
                        <div className="messageContainer">
                            <img className="inlineIcon" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"/><br/>
                            <span className="other">{message.player}</span><br/>
                            <span className="other">{message.text}</span><br/>
                            <hr/>
                        </div>
                      ))}
                    </>
                    }
                    </div>
                    <input placeholder="Escriba su mensaje.." ref={this.inputMessageRef} onChange = {this.saveMessageToBeSent}/>
                   <button onClick={this.sendMessageChat.bind(this)} type="submit" className="chat">Enviar</button>
                   <button onClick={this.toggleChat} type="submit" className="chat">Cerrar</button>
                </div>
            </div>
             </Modal>:
                 null
            }
      </div>
    );
  }
}
export default GameRoom;