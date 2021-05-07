import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import UserContext from "./components/UserContext";
import React from "react";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            user:''
        }

    }


    componentDidMount() {
    }


    render() {

        const user= {
            username:'null'
        }

        return (
            <div className="App">
                <Router>
                    <Switch>
                        {/*<Route path="/"  >

                            <UserContext.Provider value={this.state.user}>
                                <Home />
                            </UserContext.Provider>

                        </Route>*/}

                        <UserContext.Provider value={user}>
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/admin" exact component={Admin} />
                        </UserContext.Provider>


                    </Switch>
                </Router>

            </div>
        );

    }

}

export default App;
