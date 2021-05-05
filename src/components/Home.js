import React from "react";
import axios from "axios";
import LoginForm from "./LoginForm";


class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Secure Test</h1>

                <LoginForm />

            </div>
        );
    }

}

export default Home;