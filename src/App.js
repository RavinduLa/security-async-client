import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import UserContext, {UserContextProvider} from "./components/UserContext";
import React from "react";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import axios from "axios";

class App extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            username:''
        }

    }


    componentDidMount() {

        const URL_GETUSERNAME = "http//localhost:8080/get-user-details";
        let token = sessionStorage.getItem("jwt");
        const config = {
            headers:{
                'Authorization': 'Bearer '+token
            }
        }

        axios.get(URL_GETUSERNAME,config)
            .then(response => response.data)
            .then((data) => {

            })

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

                        <UserContextProvider>
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/admin" exact component={Admin} />
                        </UserContextProvider>


                    </Switch>
                </Router>

            </div>
        );

    }

}

export default App;
