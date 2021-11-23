import React from 'react';
import "../css/JoinForm.css";
import "../css/Button.css";
import Modal from '../js/Modal'
import '../css/ValidationModal.css';

class JoinForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			nickname: "",
			password:"",
			has_password: false,
			modalActive: false,
			exceptionMessage:"",
			game_id: "",
			player_id: "",

		}
	}

	toggle = () => {
		this.setState({
		  modalActive: !this.state.modalActive
		})
	  }
	
	startWs() {
		global.sh.connect(this.state.game_id, this.state.player_id);
	}

	handleSubmit = event => {
		event.preventDefault();
		
		const data = {'game_name': this.props.match.params.id,
						'nickname': this.state.nickname,
						'optional_password': this.state.password}

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
						this.setState({
							game_id: json.game.id,
							player_id: json.player.id
						})
						this.startWs()
						window.sessionStorage.setItem("player_id", json.player.id);
						window.sessionStorage.setItem("game_id", json.game.id);
						this.props.history.push("../LobbyRoom/" + json.game.id);
					})
				}else if(response.status === 422){ 
					this.setState({
						modalActive: true,
						exceptionMessage: 'Los campos son incorrectos'
					})
				}else if(response.status === 400){
					this.setState({
						modalActive: true,
						exceptionMessage: 'La contraseña es incorrecta'
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

	  componentDidMount(){
		  this.setState({
			has_password: window.sessionStorage.getItem("hasPassword")
		  })
	  }

	saveName = event => { 
		this.setState({nickname: event.target.value});
	}

	savePW = event => { 
		this.setState({password: event.target.value});
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
						{this.state.has_password ?
							<div>
							<label> Inserte la contraseña </label>
							<input type="text" placeholder="Contraseña"
							value = {this.state.password} onChange = {this.savePW}/>
							</div> :null
						}
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