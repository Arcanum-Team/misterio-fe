import React from "react";
import '../css/StartGame.css';
import Modal from '../js/Modal';
import '../css/ValidationModal.css';
import { useState, setState } from 'react';
import { useHistory } from "react-router-dom";

function StartGame ({gameId}) {
	
	const [modalActive, toggle] = useState(false)
	const [exceptionMessage, setException] = useState("")

	let history = useHistory();


	const handleClick = () => {
    	const data = {'game_id': gameId, 'player_id': localStorage.getItem("host_id")}

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
					history.push("../GameRoom/" + gameId);
				})
			}else{
				response.json()
				.then((json) => {
					setException(json.message)
					toggle(!modalActive)

				})

			}
		})
	}

	return (
		<div>
			<Modal active={modalActive}>
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
								<p>{exceptionMessage}</p>
								<button className="btn btn-success" onClick={() => toggle(false)} >Entiendo</button>
							</div>
						</div>
					</div>
				</div>     
			</Modal>
			<button className = "sboton" onClick= {() =>handleClick()}>
      			Iniciar Partida
    		</button>
		</div>
	);
	
}
export default StartGame;


