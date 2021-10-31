import React from "react";
import '../css/CreateForm.css';

class CreateForm extends React.Component {

  constructor(props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.state = {
      gameName: '',
      hostName: ''
    }
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
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.props.history.push("../LobbyRoom/" + json.game.id);
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