import React, { Component } from "react";

import SignUp from "./Login/SignUp";
import { Switch, Route } from 'react-router-dom'
import NotFound from "./NotFound/NotFound";
import NavBar from "./Common/NavBar";
import Login from "./Login/Login";
import History from "./PaymentHistory/History";
import Profile from "./UserProfile/Profile";
import SubmitPayment from "./paymentSubmission/SubmitPayment";
import PSULogin from "./PSULogin/PSULogin";
import PSUSignUp from "./PSULogin/PSUSignUp";




class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedToRegister: null,
        };
        this.onSelectToRegister = this.onSelectToRegister.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss(){
        this.setState({
            selectedBank : null,
        });
    }

    onSelectToRegister(){
        this.setState({
            selectedToRegister : true,
        });
    }

    render() {
        return (
            <div>
                <div><NavBar/></div>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/register' component={SignUp}/>


                    <Route exact path='/psuLogin' component={PSULogin}/>
                    <Route exact path='/psuRegister' component={PSUSignUp}/>
                    <Route exact path='/paymentSubmission' component={SubmitPayment}/>


                    <Route exact path='/PaymentHistory' component={History}/>
                    <Route exact path='/MyProfile' component={Profile}/>
                    <Route exact path='/UpdateProfile' component={Profile}/>
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>

        );

    }
}

export default App;
