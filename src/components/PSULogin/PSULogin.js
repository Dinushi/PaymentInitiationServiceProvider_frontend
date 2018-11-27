import React, {Component} from 'react';

import withRouter from "react-router/es/withRouter";
import '../../styles/LoginStyles/Login.css';
import PSUSignIn from "./PSUSignIn";
import BankSelection from "../BankSelection/BankSelection";
import {getPaymentInitReqId,unsetPaymentInitReqId} from "../../data-store/local-storage/index";


class PSULogin extends Component{

    constructor(props) {
        super(props);
        this.state={
            isUserAuthorized: false,
            paymentInitReqId: null,
        };
        this.setUserAuthorized=this.setUserAuthorized.bind(this);
    }

    setUserAuthorized(){
        this.setState({
            isUserAuthorized : true
        })
    }

    /**
     * Read the paymentInitRequest_id from the URL
     */
    componentDidMount(){
        const paymentInitReqId = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
        console.log("payment-inuit_req: "+paymentInitReqId);
        if(paymentInitReqId.endsWith("psuLogin")){
            console.log("u r here");
            this.setState({
                paymentInitReqId :  getPaymentInitReqId()
            })
            unsetPaymentInitReqId();
        }else{
            this.setState({
                paymentInitReqId : paymentInitReqId
            })
        }

    }

    render() {
        const { isUserAuthorized } = this.state;
        return (
            <div className="App">
                <div>
                    {isUserAuthorized ?  <BankSelection /> : <PSUSignIn setUserAuthorized={this.setUserAuthorized} paymentInitReqId={this.state.paymentInitReqId}/> }
                </div>
            </div>
        );

    }
}

export default withRouter(PSULogin);
