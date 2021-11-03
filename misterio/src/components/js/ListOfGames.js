import React from "react";
import "../css/ListOfGames.css";
import JoinGame from "./JoinGame"
import CreateGame from './CreateGame.js';
import '../css/Button.css';



class ListOfGames extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
        };

        this.cancelClick = this.cancelClick.bind(this);
    }
   
    componentDidMount() {

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };

        fetch(
            "http://127.0.0.1:8000/api/v1/games", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                });
            })
    }

    cancelClick(){
        this.props.history.push("../"); 
    }


    render() {
        const { items } = this.state;
        if(items && items.length){
            return (
                <div className="container tableGames">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre de la partida</th>
                                <th>Cantidad de jugadores</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => ( 
                                <tr>
                                    <td>{ item.name }</td>
                                    <td>{ item.player_count }</td>   
                                    <td>
                                       <JoinGame gameName= {item.name}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }else{
            return(
                <div className="">
                    <h3 className = "hdr"> No hay partidas</h3>
                    <CreateGame/>
                    <button className = "boton" type = "submit" onClick = {() => this.cancelClick()}> Cancelar </button>
                </div>
            )
        }
    }
}
   
export default ListOfGames;