import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect,withRouter} from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import UserContext, {UserContextProvider} from "./components/UserContext";
import React from "react";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import axios from "axios";
import IdleTimer from "react-idle-timer";
import PropTypes from 'prop-types';
import {IdleTimeOutModal} from "./IdleTimeoutModal";
import Profile from "./components/Profile";
import logoutComponent from "./components/logoutComponent";


class App extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            username:''
        }


        this.state={
            timeout:1000*5*1,
            showModal:false,
            userLoggedIn:false,
            isTimedOut:false
        }

        this.idleTimer = null;
        this.onAction = this._onAction.bind(this);
        this.onActive = this._onActive.bind(this);
        this.onIdle = this._onIdle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);


    }
    static contextType =  UserContext;



    _onAction(e){
        console.log('User did something' ,e);
        this.setState({isTimedOut:false});
    }

    _onActive(e){
        console.log('User is active',e);
        this.setState({isTimedOut:false});
    }

    _onIdle(e){
        console.log('User is idle',e);

        if(sessionStorage.getItem("jwt") !=  null){
            const isTimedOut = this.state.isTimedOut;
            if (isTimedOut){
                //this.props.history.push('/');
                //this.history.push('/');
                //return <Redirect to={'/'} />


                //this.context.logoutContext.bind(this);
                sessionStorage.clear();
            }
            else{
                this.setState({showModal:true});
                this.idleTimer.reset();
                this.setState({isTimedOut:true})
            }
        }


    }

    handleClose() {
        this.setState({showModal: false})
    }

    handleLogout() {
        this.setState({showModal: false})
        //return <Redirect to={'/'} />
        //this.props.history.push('/')

        sessionStorage.clear();
        //this.context.logoutContext.bind(this);

    }


    componentDidMount() {
        //this.context.logoutContext = this.context.logoutContext.bind(this);
        //let contextValue = this.context;

    }



    render() {

        const user= {
            username:'null'
        }
        const {match} = this.props;

        return (
            <>

            <IdleTimer
                ref={ref => { this.idleTimer = ref }}
                element={document}
                onActive={this.onActive}
                onIdle={this.onIdle}
                onAction={this.onAction}
                debounce={250}
                timeout={this.state.timeout} />

            <div className="App">
                <Router>
                    <Switch>


                        <UserContextProvider>
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/admin" exact component={Admin} />
                        <Route path="/login" exact component={LoginForm} />
                        <Route path="/profile" exact component={Profile} />
                        </UserContextProvider>


                    </Switch>
                </Router>

                <IdleTimeOutModal
                    showModal={this.state.showModal}
                    handleClose={this.handleClose}
                    handleLogout={this.handleLogout}
                />

            </div>
            </>
        );

    }

}

App.propTypes ={
    match: PropTypes.any.isRequired,
    history: PropTypes.func.isRequired
}

export default App;
