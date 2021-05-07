import React from "react";
import UserContext from "./UserContext";

class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState={
        username:'',
        contextUsername:''
    }

    componentDidMount() {
        if(sessionStorage.getItem("username")){
            this.setState({username:sessionStorage.getItem("username")})
        }
    }

    static contextType = UserContext;
    render() {
        return (
            <div>
                {
                    this.state.username === ''?
                        <div>
                            <p>Not logged in</p>
                            <p>Context Value: {this.context.username}</p>
                        </div>:
                        <div>
                            <p>User: {this.state.username}</p>
                            <p>Context Value: {this.context.username}</p>

                        </div>
                }
            </div>
        );
    }

}

export default Navbar;