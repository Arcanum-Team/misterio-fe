import React from "react";
import "../css/ListOfGames.css";

class ListOfGames extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
        };

        this.joinGame = this.joinGame.bind(this);
    }
   
    componentDidMount() {

        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };

        fetch(
            "http://127.0.0.1:8000/games", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                });
            })
    }

    joinGame(name) {
        console.log(name);
    }

    render() {
        const { items } = this.state;
      
        return (
        <div className="container tableFixHead">
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
                            <td>{ item.cantPlayers }</td>   
                            <td>
                               <button className="btn btn-dark" onClick={() => this.joinGame(item.name)}>Unirse</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
}
   
export default ListOfGames;