import React, { Component } from "react";

import '../../styles/BankSelectionStyles/BankSelection.css';
import axios from "axios";
axios.defaults.withCredentials = true;
import {getPSUUsername,setIsSubmissionRequired,getRedirectLinkToEShop} from '../../data-store/local-storage/index';
import BankAccountForm from "./BankAccountForm";
import {getBankSelectionList} from "../../utils/api_calls_payment_process";
import {submitBankSelectionByPSU} from "../../utils/api_calls_payment_process";
import Button from "@material-ui/core/Button/Button";
import ConfirmationPage from "./ConfirmationPage";
//import ConfirmationPage from "./ConfirmationPage";



class BankSelection extends Component {

    constructor(props){

        super(props);
        this.state = {
            banks: [],
            selectedBank: null,
            isAccountRequired: false,
            errorMessage: null,
            showError:false,
            hasBankSpecified:false,
        };

        this.onBankSelect = this.onBankSelect.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.setBankSelectionCompleted = this.setBankSelectionCompleted.bind(this);
        this.setBankList = this.setBankList.bind(this);
        this.handlePaymentConfirmation = this.handlePaymentConfirmation.bind(this);
        this.handlePaymentDecline = this.handlePaymentDecline.bind(this);
    }



    /**
     * get debtor bank list and payment info from backend
     */
    componentDidMount(){
        getBankSelectionList(this.setBankList);
    }

    /**
     * the callback function that get notifies when debtor banks are retrieved from back-end
     * @param data
     */
    setBankList(data){
        const newBanks = data.map(c =>{
            return {
                uid : c.bankUid,
                name: c.bankName
            };
        });

        // create a new "State" object without mutating
        // the original State object.

        // what does below 4 values mean:
        // this.state  contacts ge empty value ekata newContacts merge karanna
        const newState = Object.assign({},this.state,{
            banks : newBanks
        });
        // store the new state object in the component's state
        this.setState(newState);

    }

    /**
     * submit the debtor account details when the user confirms the payment
     */
    handlePaymentConfirmation(){
        console.log("The bank selected by PSU: "+this.state.selectedBank);
        if (window.confirm('Are you sure to submit the payment?')) {
            submitBankSelectionByPSU(this.setBankSelectionCompleted,this.state.selectedBank, getPSUUsername());
        }
    }

    /**
     * decline the payment when user chooses
     */
    handlePaymentDecline(){
        const redirectLinkToEShop=getRedirectLinkToEShop();
        if (window.confirm('Are you sure to decline the payment?')) {
            window.location.replace(redirectLinkToEShop+"?canceled");//redirect the user back to the E-shop
        }

}

    /**
     * the callback function that get notified when the bank selection response received
     */
    setBankSelectionCompleted(data, result){
        if(result){
            console.log(data.accountRequired);
            setIsSubmissionRequired(data.submissionRequired);
            console.log("IsSubmissionRequired : "+data.submissionRequired)
            this.setState({
                isAccountRequired : data.accountRequired,
                hasBankSpecified : true,
            });
        }else{
            console.log(data);
            alert(data);
        }

    }

    /**
     * update the state when the user chooses the bank
     * @param id
     */
    onBankSelect(id){
        this.setState({
            selectedBank : id,
        });
    }

    /**
     * reset the state values when user chooses to specify the bank again
     */
    onDismiss(){
        this.setState({
            selectedBank : null
        })
    }


    render() {
        const { hasBankSpecified } = this.state;
        const { isAccountRequired } = this.state;
        const { selectedBank } = this.state;
        const { banks } = this.state;
        return (
            <div className="App">
                {hasBankSpecified ? <BankAccountForm onDismiss={this.onDismiss} isAccountRequired={isAccountRequired} id={selectedBank}  />
                    :  <div>
                        <div id="info">
                            <div id="msg" className="text-primary" align="center" ><h4>Thanks for selecting PISP as your payment gateway</h4></div>
                            <div id="ins" align="center" className="text-muted" align="center"><h6>Please Select your bank to proceed the payment</h6></div>
                        </div>

                        <ConfirmationPage banks={{banks}} onSelect={this.onBankSelect}/>

                        <div id="space"></div>
                        <div align="center">
                            <h5 color={"#00004d"}>Selected Bank</h5>
                            <div id='bankSelection'><label>{selectedBank}</label></div>
                        </div>


                        <div id="space"></div>
                        <div align="center">
                            <Button
                                id="btn_decline"
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePaymentDecline()}> Decline
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handlePaymentConfirmation()}> Confirm
                            </Button>

                        </div>

                    </div>}
            </div>
        );
    }


}

export default BankSelection;
