import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/js/HomePage';
import JoinForm from './components/js/JoinForm';
import CreateForm from './components/js/CreateForm';
import ListofGames from './components/js/ListOfGames';
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
            <Route exact path="/JoinForm" component= {() => <JoinForm gameName = "Nombre de Partida"/>} />
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/CreateForm" component= {CreateForm} />
            <Route exact path="/ListOfGames" component= {ListofGames} />

          </Switch>
        </Router>
      </div>
     </div>
  );
}

export default App;
