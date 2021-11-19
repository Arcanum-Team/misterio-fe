import React from "react";
import { withRouter } from "react-router-dom";
import '../css/StartGame.css';
import Modal from '../js/Modal'
import '../css/ValidationModal.css';

class StartGame extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			modalActive: false,
			exceptionMessage:""
		}
	}

	toggle = () => {
		this.setState({
		  modalActive: !this.state.modalActive
		})
	  }


	handleClick(name) {
    const data = {'game_id': this.props.match.params.id, 'player_id': window.sessionStorage.getItem("host_id")}

		const requestOptions = {
			method: 'PUT',
			mode: 'cors',
			headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(data)
		};

		fetch("http://127.0.0.1:8000/api/v1/games/start", requestOptions)
		.then((response) => {
			if(response.ok){
				response.json()
				.then((json) => {
					this.props.history.push("../GameRoom/" + name);
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
	}

	render(){
		return (
			<div>
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
				<button className = "sboton" onClick= {() =>this.handleClick(this.props.GameId)}>
          			Iniciar Partida
        		</button>
			</div>
		);
	}
	
}
export default withRouter(StartGame);


