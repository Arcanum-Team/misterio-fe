import React from 'react'
import "../css/Form.css";
import "../css/Button.css";

export default class JoinForm extends React.Component {

	saveName = event => { 
		this.setState({name: event.target.value});
	}

	constructor(props) {
	    super(props)
	    this.state = {
	    	name: ""
	    }
	}

	render() {
		return ( 
			<div className = "form-box">
				<h3 className = "form-step"> {this.props.gameName} </h3>
				<form className="field1">
				    <input type="text" placeholder="Inserte su nombre de jugador"
				    value = {this.state.name} onChange = {this.saveName}/>
				</form>
				<button className = "continue"> Aceptar </button>

			</div>
		);
	}
}
