import './App.css';
import HomePage from './components/js/HomePage';
import GameRoom from './components/js/GameRoom';
import JoinForm from './components/js/JoinForm';
import LobbyRoom from './components/js/LobbyRoom';
import CreateForm from './components/js/CreateForm';
import ListofGames from './components/js/ListOfGames';
import ListOfPlayers from './components/js/ListOfPlayers';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="background">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>

            <Route exact path="/LobbyRoom/:id" component= {LobbyRoom}/>
            <Route exact path="/JoinForm/:id" component= {JoinForm}/>

            <Route exact path="/CreateForm" component= {CreateForm}/>
            <Route exact path="/ListOfGames" component= {ListofGames}/>
            <Route exact path="/ListOfPlayers" component= {ListOfPlayers}/>
            <Route exact path="/GameRoom/:id" component= {GameRoom}/>
          </Switch>
        </Router>
      </div>
     </div>
  );
}

export default App;
