import React from "react";
import "../css/ListOfPlayers.css";

class ListOfPlayers extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
    }

    render() {    
        return (
        <div className="tablePlayers">
            <table className="table">
                <thead>
                    <tr>
                        <th>Jugadores</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.players.map((player) => ( 
                        <tr>
                            
                            <td>
                                { player.nickname }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
}
   
export default ListOfPlayers;