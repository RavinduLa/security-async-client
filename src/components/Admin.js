import React from "react";
import axios from "axios";
class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state =  this.initialState;



    }

    initialState={
        jwt:'',
        allowed:false
    }

    componentDidMount() {

        //console.log("admin mounted")

        this.setState({jwt:sessionStorage.getItem("jwt")})

        const  URL_ADMIN = "http://localhost:8080/admin";
        let token = sessionStorage.getItem("jwt");
        console.log("token: "+token)
        axios.get(URL_ADMIN,{
            headers:{
                'Authorization': 'Bearer '+token
            }
        }).then(response => response.data)
            .then((data) => {
                this.setState({jwt:token})
                console.log("data.status: "+data);
                //for now assume that if no error is thrown, the status is ok
                /*if(data.status === 200){
                    this.setState({allowed:true})
                }*/

                this.setState({allowed:true})
            }).catch(error => {

                console.log('Error status: '+error.response.status)
            if(token === null){
                alert("Please Login")
                this.setState({jwt:'null'})

                if (error.response.status === 404){
                    alert("Backend server might be down")
                }
            }
            else{

                if(error.response.status === 403){
                    this.setState({allowed:false})
                    alert("You do not have permission to view this page.")
                    console.log("Error is 403")
                }
            }

        })

    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                {
                    this.state.jwt === 'null'?
                        <div>
                            <h2>Please Login</h2>
                        </div>:
                        <div>
                            {
                                this.state.allowed === true?
                                    <div>
                                        <h3>Hello Admin</h3>
                                        <p>You are allowed to view this page</p>
                                    </div>:
                                    <div>
                                        <h3>You do not have permission to view this page</h3>
                                    </div>
                            }

                        </div>
                }

            </div>
        );
    }

}

export default Admin;