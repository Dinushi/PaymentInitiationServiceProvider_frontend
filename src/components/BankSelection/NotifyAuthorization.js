import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/BankSelectionStyles/NotifyAuthorization.css';

export default class NotifyAuthorization extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            timeToRedirect: false
        };
        this.redirectPSUToBank = this.redirectPSUToBank.bind(this);
    }

    /**
     * set a timeout to redirect the psu to ASPSP after 5 seconds
     */
    componentDidMount() {
        setTimeout(() => { this.setState({ timeToRedirect: !this.state.timeToRedirect }) }, 5000);
    }


    /**
     * redirect the PSU to ASPSP to authenticate the payment
     */
    redirectPSUToBank(){
        const authUrl=this.props.redirectURL;
        window.location.replace(authUrl);
    }

    renderDiv() {
        if(!this.state.timeToRedirect) {
            return (
                <Container >
                <Row>
                    <Col><div id="space"></div></Col>
                </Row>
                <Row>
                    <Col><div align="center" id=""><p>You are now leaving PISP and you are being securely transmitted to your ASPSP to authenticate the payment</p></div></Col>
                </Row>

            </Container>)
        }
        else {
            return (<div>  {this.redirectPSUToBank()}  </div>)
        }
    }

    render() {
        return (
            <div>{ this.renderDiv() }</div>
        );
    }

}
