import React from "react";
import '../css/CreateForm.css';

class CreateForm extends React.Component {

  constructor(props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.state = {
      gameName: "",
      hostName: ""
    }
  }

  cancelClick(){
    this.props.history.push("../");
  }

  createClick(){
    this.props.history.push("../LobbyRoom");
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
        <button className = "Continuar" type = "submit" onClick = {() => this.createClick()}> Crear </button>
      </div>
    );
  }
}

export default CreateForm;