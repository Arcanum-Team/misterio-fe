import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomePage from './components/js/HomePage';
import JoinForm from './components/js/JoinForm';
import CreateForm from './components/js/CreateForm';
import ListofGames from './components/js/ListOfGames';
import ListOfPlayers from './components/js/ListOfPlayers';
import LobbyRoom from './components/js/LobbyRoom';
import GameRoom from './components/js/GameRoom';
//import RollDice from './components/js/RollDice';
/*{
<RollDice/>
}*/

function App() {
  return (
    <div className="App">
      <div className="background">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>

            <Redirect from="/JoinForm" component= {JoinForm} to="/LobbyRoom/:id"/>
            <Route exact path="/LobbyRoom/:id" component= {LobbyRoom}/>

            <Route exact path="/CreateForm" component= {CreateForm} />
            <Route exact path="/ListOfGames" component= {ListofGames} />
            <Route exact path="/ListOfPlayers" component= {ListOfPlayers} />
            <Route exact path="/GameRoom" component= {GameRoom} />
          </Switch>
        </Router>
      </div>
     </div>
  );
}

export default App;
