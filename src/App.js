import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/loginForm" exact component={LoginForm} />
            </Switch>
        </Router>

    </div>
  );
}

export default App;
