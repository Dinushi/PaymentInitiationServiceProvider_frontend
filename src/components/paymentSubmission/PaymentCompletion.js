import React, {Component} from "react";
import PropTypes from "prop-types";
import '../../styles/PaymentSubmissionStyles/PaymentSubmission.css';
import { Container, Row, Col } from 'reactstrap';
import Button from "@material-ui/core/Button/Button";


class PaymentCompletion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            instructedAmount :  null,
            currency : null,
            merchantName : null,
            merchantBank : null,
            merchantAccount : null,
            customerBankUid : null,
            customerAccount : null,
            redirectLink : null,

        };
        this.redirectCustomerToEShop = this.redirectCustomerToEShop.bind(this);
    }

    componentDidMount(){
        this.setState({
            instructedAmount : this.props.paymentData.instructedAmount.amount,
            currency : this.props.paymentData.instructedAmount.currency,
            merchantName : this.props.paymentData.merchantName,
            merchantBank : this.props.paymentData.merchantBank.bankName,
            customerBankUid : this.props.customerBankUid,
            merchantAccount : this.props.paymentData.merchantBankAccountData.identification,
            customerAccount : this.props.paymentData.customerAccount,
            redirectLink : this.props.paymentData.redirectLink,
        });
    }


    /**
     * This will redirect the customer/psu back to e-shop where the payment was initiated.
     */
    redirectCustomerToEShop(){
        const urlToEShop=this.state.redirectLink;
        window.location.replace(urlToEShop);
    }

    render(){
        return (
            <Container >
                <div id="PaymentSummary" align="center"><h4>Payment Summary</h4></div>
                <div align="center">
                    <Row>
                        <Col><div><label>Payment Amount</label></div></Col>
                        <Col> <div><label>{this.state.currency}{this.state.instructedAmount}</label></div></Col>
                    </Row>
                    <Row>
                        <Col><div><label>Merchant Name</label></div></Col>
                        <Col> <div><label>{this.state.merchantName}</label></div></Col>
                    </Row>
                    <Row>
                        <Col><div><label>Merchant Bank</label></div></Col>
                        <Col> <div><label>{this.state.merchantBank}</label></div></Col>
                    </Row>
                    <Row>
                        <Col><div><label>Merchant Bank Account</label></div></Col>
                        <Col> <div><label>{this.state.merchantAccount}</label></div></Col>
                    </Row>
                    <Row>
                        <Col><div><label>Payer bank</label></div></Col>
                        <Col> <div><label>{this.state.customerBankUid}</label></div></Col>
                    </Row>
                    <Row>
                        <Col><div><label>Payer bank Account</label></div></Col>
                        <Col> <div><label>{this.state.customerAccount? this.state.customerAccount : "Not Specified"}</label></div></Col>
                    </Row>
                </div>

                <div id="Notify" align="center">
                    <div><h5>Your Payment is Completed. You will be redirected back to your e-commerce site.</h5></div>
                    <Button
                        variant="contained" component="span"
                        onClick={() => this.redirectCustomerToEShop()}> OK
                    </Button>

                </div>

            </Container>


        );

    }

}
Container.propTypes = {
    fluid:  PropTypes.bool
}

PaymentCompletion.propTypes = {
    name: PropTypes.string.isRequired
};

export default PaymentCompletion;
/*

<Row>
    <Col><div><label>Payer bank</label></div></Col>
    <Col> <div><label>{this.state.customerBank}</label></div></Col>
</Row>
<Row>
<Col><div><label>Payer bank Account</label></div></Col>
<Col> <div><label>{this.state.customerAccount? this.state.customerAccount : "Not Specified"}</label></div></Col>
</Row>
 */
