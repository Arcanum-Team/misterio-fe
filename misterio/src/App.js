import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/js/HomePage';
import JoinForm from './components/js/JoinForm';
import JoinGame from './components/js/JoinGame';
import CreateForm from './components/js/CreateForm';
import ListofGames from './components/js/ListOfGames';
import ListOfPlayers from './components/js/ListOfPlayers';
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
            <Route exact path="/JoinGame" component= {() => <JoinGame/>} />
            <Route exact path="/JoinForm" component= {() => <JoinForm gameName = "Nombre de Partida"/>} />
            <Route exact path="/" component={HomePage}/>
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
