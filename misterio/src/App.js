import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './components/js/HomePage';
//import RollDice from './components/js/RollDice';

function App() {
  return (
    <div className="App">
      <div className="background">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </Router>
         {/*
         <RollDice/>
         */}
      </div>
     </div>
  );
}

export default App;
