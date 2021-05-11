import React from "react";
import axios from "axios";
import UserContext from "./UserContext";
import JwtAuth from "../AuthFiles/JwtAuth"


class LoginForm extends React.Component{



    static contextType =  UserContext;
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);

    }

    initialState={
        username:'',
        password:'',
        jwt:'',
        user:'',
        loginStatus:'loggedOut'
    }

    //static contextType = UserContext;

    componentDidMount() {

        this.setState(() => this.initialState)
        if((sessionStorage.getItem("jwt") != null)  && (this.context.username != 'noUser')  ){
            this.setState({loginStatus:'loggedIn'})
        }
    }

    usernameChange = (event) =>{
        event.preventDefault();
        this.setState({username:event.target.value})
    }

    passwordChange=(event)=>{
        event.preventDefault();
        this.setState({password:event.target.value})
    }

    logout = ()=> {

        //JwtAuth.logout();
        //sessionStorage.setItem("jwt",'');
        sessionStorage.clear();
        this.setState({jwt:''})

        this.setState({loginStatus:'loggedOut'})

        //this.context.username.update('null')

    }

    login=(jwt) => {
        sessionStorage.setItem("jwt",jwt);
        sessionStorage.setItem("username",this.state.username);
        this.setState({jwt:sessionStorage.getItem("jwt")})

        //this.context.username.update(this.state.username)

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
                //this.state.user.setState()
                //sessionStorage.setItem("jwt",data.jwt);

                this.login(data.jwt);
                console.log("jwt from session storage : "+sessionStorage.getItem("jwt"))
                this.setState({loginStatus:'loggedIn'})
            }).catch(error => {
                console.log(error)
                this.setState({username:'invalidUser'})
                if(error.response.status === 403){
                    this.setState({loginStatus:'invalidCredentials'})
                }
            })

        console.log("Username: "+this.state.username+"\nPassword: "+this.state.password)

    }



    render() {
        return (
            <UserContext.Consumer>
                {({setUsername}) => (
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


                            <button onClick={ async () => {
                                await this.submitLoginForm.bind(this);
                                setUsername(this.state.username);

                            }}>Login</button>

                        </form>
                        <button onClick={() =>{
                            this.logout();
                            setUsername('noUser');
                        }
                        }>
                            Logout
                        </button>

                        JWT: {this.state.jwt}

                        <div>
                            {
                                this.state.loginStatus === 'invalidCredentials'?
                                    <div>
                                        <h4>Invalid Credentials</h4>
                                    </div>:
                                    <div>
                                        {
                                            this.state.loginStatus === 'loggedIn'?
                                                <div>
                                                    <h3>Logged in as {this.context.username}</h3>
                                                </div>:

                                                <div></div>
                                        }

                                    </div>
                            }
                        </div>
                    </div>
                )

                }
            </UserContext.Consumer>

        );
    }


}

export default LoginForm;