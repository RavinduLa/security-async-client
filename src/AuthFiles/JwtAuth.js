import React from "react";

function login(jwt){
    sessionStorage.setItem("jwt",jwt);
}



class JwtAuth extends React.Component{

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    login = (jwt) => {
        sessionStorage.setItem("jwt",jwt);
    }

    logout = () => {
        sessionStorage.setItem("jwt",'');
    }


}

export default JwtAuth;

