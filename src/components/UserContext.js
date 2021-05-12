import React from "react";

const user = {
    username:'null',
}

const UserContext =React.createContext({});

export class UserContextProvider extends React.Component{

    constructor(props) {
        super(props);
        this.state =  this.initialState;

        this.setUsername = this.setUsername.bind(this);
    }

    componentDidMount() {
        //this.setState(() => this.initialState)
    }

    initialState={
        username: 'noUser',
        setUsername:this.setUsername.bind(this)
    }

    setUsername (username) {
        this.setState({username:username});
    }

    logoutContext(){
        sessionStorage.clear();
        this.setState({username:'noUser'})
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

}

export default UserContext;