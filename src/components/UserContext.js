import React from "react";

const user = {
    username:'null',
}

const UserContext =React.createContext(user);

/*function updateUserData(userInfo){
    this.setState({username:userInfo});
}*/

export default UserContext;