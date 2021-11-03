import React from 'react'
import "../css/JoinForm.css";
import "../css/Button.css";
import Modal from '../js/Modal'
import '../css/ValidationModal.css';

class JoinForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			nickname: "",
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
		
		const data = {'game_name': this.props.match.params.id, 'nickname': this.state.nickname}
		console.log(data);

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};


		fetch("http://127.0.0.1:8000/api/v1/games/join", requestOptions)
			.then((response) => {
				if(response.ok){
					response.json()
					.then((json) => {
						this.props.history.push("../LobbyRoom/" + json.game.id);
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

	saveName = event => { 
		this.setState({nickname: event.target.value});
	}

	render() {
		return ( 
			<div className = "jform-box">
				<Modal active={this.state.modalActive}>
					<div>
						<div className="modal-dialog modal-confirm">
							<div className="modal-content">
								<div className="modal-header">
									<div className="icon-box">
										<i className="bi bi-x-lg"></i>
									</div>
								</div>
								<div className="modal-body text-center">
									<h4>Ooops!</h4>	
									<p>{this.state.exceptionMessage}</p>
									<button className="btn btn-success" onClick={this.toggle} >Entiendo</button>
								</div>
							</div>
						</div>
					</div>     
				</Modal>
				<h3 className = "jform-step"> {this.props.match.params.id} </h3>
				<form>
					<div className = "field1">
						<label> Inserte su nombre de jugador </label>
						<input type="text" placeholder="Nickname"
						value = {this.state.name} onChange = {this.saveName}/>
					</div>
				</form>
				<button className = "continue" type = "submit" onClick = {this.handleSubmit.bind(this)}>
					Aceptar
				</button>
			</div>
		);
	}
}
export default JoinForm;