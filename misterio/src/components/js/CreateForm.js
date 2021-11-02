import React from "react";
import '../css/CreateForm.css';
import Modal from '../js/Modal'

class CreateForm extends React.Component {

  constructor(props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.state = {
      gameName: '',
      hostName: '',
      modalActive: false,
      exceptionMessage:""
    }
  }

  toggle = () => {
    this.setState({
      modalActive: !this.state.modalActive
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const data = {'game_name': this.state.gameName, 'nickname': this.state.hostName}
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data)
    };
  
    fetch(
			"http://127.0.0.1:8000/api/v1/games", requestOptions)
    .then((response) => {
      if(response.ok){
        response.json()
          .then((json) => {
            console.log(json);
            this.props.history.push("../LobbyRoom/" + json.game.id);
            localStorage.setItem("host_id", json.id);
        })
      }else if(response.status === 422){ 
        this.setState({
          modalActive: true,
          exceptionMessage: 'Los campos no pueden ser vacios'
        })
      }else{
        response.json()
        .then((json) => {
          this.setState({
            modalActive: true,
            exceptionMessage: json.message
          })
        })
      }
    })
  };

  cancelClick(){
    this.props.history.push("../");
  }

  createClick(){
    
  }

  saveGN = event => { 
    this.setState({gameName: event.target.value});
  }
  
  saveHN = event => { 
    this.setState({hostName: event.target.value});
  }

  render () {
    return (
      <div className = "form-box">
        <Modal active={this.state.modalActive} toggle={this.toggle.bind(this)}>
          <div class="frame">
            <h1 className="exceptionMessage">{this.state.exceptionMessage}</h1>
            <button className="closeModal" onClick={this.toggle.bind(this)}>Entendido</button>
          </div>
        </Modal>
        <h3 className = "form-step"> Creando Partida </h3>
        <form>
          <div className = "field1">
            <label> Escriba un nombre para su partida </label>
            <input className = "input" placeholder="Nombre partida"
            value = {this.state.gameName} onChange = {this.saveGN}/>

            <label> Inserte su nombre de jugador </label>
            <input className = "input" placeholder="Nickname"
            value = {this.state.hostName} onChange = {this.saveHN}/>
          </div> 
        </form>
  
        <button className = "Cancelar" type = "submit" onClick = {() => this.cancelClick()}> Cancelar </button>
        <button className = "Continuar" type = "submit" onClick = {this.handleSubmit.bind(this)}> Crear </button>
      </div>
    );
  }
}

export default CreateForm;