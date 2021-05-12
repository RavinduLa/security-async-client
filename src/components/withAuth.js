//higher order component to check whether the user is authenticated
import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';

const withAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!sessionStorage.getItem("jwt");
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    return AuthRoute;
};
export default withAuth;