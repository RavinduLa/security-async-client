import React from "react";
import axios from "axios";


class LoginForm extends React.Component{


    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    initialState={
        username:'',
        password:'',
        jwt:''
    }

    componentDidMount() {
    }

    usernameChange = (event) =>{
        event.preventDefault();
        this.setState({username:event.target.value})
    }

    passwordChange=(event)=>{
        event.preventDefault();
        this.setState({password:event.target.value})
    }

    submitLoginForm =async (event) => {

        event.preventDefault();

        const credentials ={
            username:this.state.username,
            password:this.state.password
        }

        const URL_AUTHENTICATE= "http://localhost:8080/authenticate";
        const URL_AUTHENTICATEIP= "http://192.168.1.5:8080/secure/authenticate";

        await axios.post(URL_AUTHENTICATE,
            credentials
            )
            .then(response => response.data)
            .then((data) => {
                console.log("jwt: "+data.jwt)
            }).catch(error => {
                console.log(error)
            })

        console.log("Username: "+this.state.username+"\nPassword: "+this.state.password)

    }

    render() {
        return (
            <div>
                <h3>Login form</h3>
                <form onSubmit={this.submitLoginForm.bind(this)}>
                    Username:  <input
                    required
                    type={'text'}
                    name={'username'}
                onChange={this.usernameChange.bind(this)}/>



                    Password: <input
                    required
                    type={'password'}
                    name={'password'}
                onChange={this.passwordChange.bind(this)}/> <br />


                    <button type={'submit'}>Login</button>
                </form>
            </div>
        );
    }


}

export default LoginForm;