import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import IdleTimer from "react-idle-timer";


class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;

    }


    initialState={
        jwt:''
    }

    static contextType =  UserContext;
    componentDidMount() {
        this.setState(() => this.initialState)
        let value = this.context;
        if(sessionStorage.getItem("jwt") === null){
            value.setUsername('noUser');
        }
        //value.logoutContext.bind(this);
    }

    render() {

        return (

                        <div>
                            <h1>Secure Test</h1>

                            <Link to={"/login"}>Login</Link> <br />

                            JWT: {sessionStorage.getItem("jwt")} <br />

                            <Link to={"/admin"} >Admin</Link>  <br />

                            <Link to={"/profile"} >Profile</Link>
                        </div>

        );
    }

}

export default Home;