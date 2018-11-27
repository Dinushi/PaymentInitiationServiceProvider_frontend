import React, {Component} from 'react';
import { Card, Button, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';
import { withRouter } from "react-router-dom";


class TaskPanel extends Component{

    constructor(props) {
        super(props);
        this.handlePaymentHistorySelection= this.handlePaymentHistorySelection.bind(this);
        this.handleViewProfileSelection= this.handleViewProfileSelection.bind(this);
        this.handleViewProfileSelection= this.handleViewProfileSelection.bind(this);
    }


    handlePaymentHistorySelection(){
        this.props.history.push('/PaymentHistory');
    }

    handleViewProfileSelection(){
        this.props.history.push('/MyProfile');
    }

    handleUpdateProfileSelection(){
        this.props.history.push('/UpdateProfile');
    }

    render(){
        return (
            <CardDeck>
                <Card  body inverse color="info">
                    <CardBody >
                        <CardTitle>Analyze your Activity</CardTitle>
                        <CardSubtitle>View Your Payment History</CardSubtitle>
                        <CardText>We will show you a complete history of payments you initiated initiated on behalf of your customer.</CardText>
                        <Button onClick={ () => this.handlePaymentHistorySelection()}>GO</Button>
                    </CardBody>
                </Card>
                <Card body inverse color="warning">
                    <CardBody>
                        <CardTitle>My Profile</CardTitle>
                        <CardSubtitle>Update your registered data</CardSubtitle>
                        <CardText>This will show all your details as registered at PISP</CardText>
                        <Button onClick={ () => this.handleViewProfileSelection()}>GO</Button>
                    </CardBody>
                </Card>
                <Card body inverse color="danger">
                    <CardBody>
                        <CardTitle>About US</CardTitle>
                        <CardSubtitle>More about PISP</CardSubtitle>
                        <CardText>Contact us</CardText>
                        <Button  onClick={ () => this.handleUpdateProfileSelection()}>GO</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        );
    }
}

export default withRouter(TaskPanel);
