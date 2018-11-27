import React, {Component} from 'react';

import withRouter from "react-router/es/withRouter";
import Home from "../PispHome/Home";
import '../../styles/LoginStyles/Login.css';
import SignIn from "./SignIn";


class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
            isUserAuthorized: false,
        };
        this.setUserAuthorized=this.setUserAuthorized.bind(this);
    }

    setUserAuthorized(){
        this.setState({
            isUserAuthorized : true
        })
    }

    render() {
        const { isUserAuthorized } = this.state;
        return (
            <div className="App">

                <div>
                    {isUserAuthorized ?  <Home/> : <SignIn setUserAuthorized={this.setUserAuthorized}/> }
                </div>
            </div>


        );

    }
}

export default withRouter(Login);
