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
                        <th className="th-image"></th>
                        <th className="th-image"> Jugadores</th>
                        <th className="th-image"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.players.map((player) => (                         
                        <tr>
                            <td className="td-image">
                                {player.order == this.props.turn && <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F1-16415_download-red-arrow-right-png-clipart-arrow-clip.png&f=1&nofb=1"/>}
                            </td>
                            <td className="td">{ player.nickname }</td>                  
                            <td className="td-image">
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