import React, { Component } from "react";

import '../../styles/BankSelectionStyles/BankSelection.css';
import {sentRequestToSubmitThePayment,requestToGetPaymentStatusFromBank} from "../../utils/api_calls_payment_process";
import axios from "axios";
import {getPSUUsername, getIsSubmissionRequired} from "../../data-store/local-storage";
import PaymentCompletion from "./PaymentCompletion";
axios.defaults.withCredentials = true;



class SubmitPayment extends Component {

    constructor(props){
        super(props);
        this.state = {
            isPaymentCompleted : false,
            paymentData: null,
        };
        this.notifyPaymentStatus = this.notifyPaymentStatus.bind(this);
    }


    /**
     * the callback function that get notified when payment status is received from backend
     * either after auth-code-submission or payment status GET request
     * @param data
     */
    notifyPaymentStatus(data,result){
        if(result){
            console.log("Received response as payment completed");
            this.setState({
                paymentData: data,
                isPaymentCompleted : true,
            });

        }else{
            console.log(data);
            alert(data);
        }
    }


    /**
     * check whether a payment submission is required for the debtor bank and
     * if true,read the code and idToken and send them to backend
     * else, send a get payment status request to backend to verify the payment completion
     */
    componentDidMount(){
        if(getIsSubmissionRequired()){
            const URLContent = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('code') + 1));
            console.log("URL:"+URLContent);
            const contentArray=URLContent.split("&");
            const code=contentArray[0].split("=")[1];
            const idToken=contentArray[1].split("=")[1];
            console.log("code :"+code);
            console.log("idToken :"+idToken);

            sentRequestToSubmitThePayment(this.notifyPaymentStatus,code,idToken,getPSUUsername());
        }else{
            requestToGetPaymentStatusFromBank(this.notifyPaymentStatus,getPSUUsername());
        }
    }


    render() {
        const { isPaymentCompleted } = this.state;
        return (
            <div className="App">
                <div>
                    {isPaymentCompleted ? <PaymentCompletion paymentData={this.state.paymentData}/> : <h1>Payment Processing..</h1>}
                </div>

            </div>
        );
    }

}

export default SubmitPayment;

