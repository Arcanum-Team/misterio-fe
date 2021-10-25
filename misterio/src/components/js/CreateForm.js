import React from "react";
import '../css/CreateForm.css';

class CreateForm extends React.Component {

  constructor(props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.state = {
      name: ""
    }
  }

  cancelClick(){
    this.props.history.push("../");
  }

  render () {
    return (
      <div className = "form-box">
        <h3 className = "form-step"> Creando Partida </h3>
        <form>
          <div className = "field1">
            <label> Escriba un nombre para su partida </label>
            <input className = "input" placeholder="Nombre partida"/>
            <label> Inserte su nombre de jugador </label>
            <input className = "input" placeholder="Nickname"/>
          </div> 
        </form>
  
        <button className = "Cancelar" type = "submit" onClick = {() => this.cancelClick()}> Cancelar </button>
        <button className = "Continuar" type = "submit"> Crear </button>
      </div>
    );
  }
}

export default CreateForm;