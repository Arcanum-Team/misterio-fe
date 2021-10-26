import React from "react";
import "../css/ListOfPlayers.css";

class ListOfPlayers extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            order: [],
        };
    }
   
    componentDidMount() {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };

        fetch(
            "https://jsonplaceholder.typicode.com/users", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    order: json,
                });
            })
    }

    render() {
        const { order } = this.state;
      
        return (
        <div className="tableFixHead">
            <table className="table">
                <thead>
                    <tr>
                        <th>Jugadores</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((player) => ( 
                        <tr>
                            <td>{ player.name }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
}
   
export default ListOfPlayers;