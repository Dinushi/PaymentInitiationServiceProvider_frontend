import React, {Component} from "react";
import PropTypes from "prop-types";
import '../../styles/BankSelectionStyles/PaymentInfo.css';
import {getPaymentData} from "../../utils/api_calls_payment_process";
import {getPSUUsername,setRedirectLinkToEShop} from "../../data-store/local-storage/index";
import { Container, Row, Col } from 'reactstrap';
import {setIsSubmissionRequired} from "../../data-store/local-storage";


class PaymentInfo extends Component{

    constructor(props) {
        super(props);
        this.state = {
            instructedAmount: null,
            instructedAmountCurrency: null,
            merchantName : null,
            merchantBankName: null,
            accIdentification : null,

        };
        this.updatePaymentData = this.updatePaymentData.bind(this);
    }


    /**
     * call the backend api to get payment data
     */
    componentDidMount(){
        getPaymentData(this.updatePaymentData,getPSUUsername());
    }


    /**
     * the call bck function that get notified with payment data retrieval from backend
     * @param data
     */
    updatePaymentData(data,result){
        if(result){
            console.log("payment data: "+data);
            this.setState({
                instructedAmount : data.instructedAmount.amount,
                instructedAmountCurrency : data.instructedAmount.currency,
                merchantName : data.merchantName,
                merchantBankName : data.merchantBank.bankName,
                accIdentification : data.merchantBankAccountData.identification,
            });
            const redirectLinkOfEShop=data.redirectLink;
            setRedirectLinkToEShop(redirectLinkOfEShop);
        }else{
            console.log(data);
            alert(data);
        }
    }

    render(){
        return (
             <Container >
                        <Row>
                            <Col><div><label>Payment Amount</label></div></Col>
                            <Col> <div><label>{this.state.instructedAmountCurrency}{this.state.instructedAmount}</label></div></Col>
                        </Row>
                        <Row>
                            <Col><div><label>Merchant Name</label></div></Col>
                            <Col> <div><label>{this.state.merchantName}</label></div></Col>
                        </Row>
                        <Row>
                            <Col><div><label>Merchant Bank</label></div></Col>
                            <Col> <div><label>{this.state.merchantBankName}</label></div></Col>
                        </Row>
                        <Row>
                            <Col><div><label>Merchant Bank Account</label></div></Col>
                            <Col> <div><label>{this.state.accIdentification}</label></div></Col>
                        </Row>
             </Container>

        );

    }

}
Container.propTypes = {
    fluid:  PropTypes.bool
}

PaymentInfo.propTypes = {
    name: PropTypes.string.isRequired
};

export default PaymentInfo;
