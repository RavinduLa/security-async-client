import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";


class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;
    }

    initialState={
        jwt:''
    }

    componentDidMount() {
        this.setState(() => this.initialState)
    }

    render() {
        return (
            <div>

                <h1>Secure Test</h1>


                <LoginForm />


                JWT: {sessionStorage.getItem("jwt")}

                <Link to={"/admin"} >Admin</Link>

            </div>
        );
    }

}

export default Home;