import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Bank from "./Bank";
import PaymentInfo from "./PaymentInfo";
import '../../styles/BankSelectionStyles/ConfirmationPage.css';

export default class ConfirmationPage extends React.Component {


    constructor(props){
        super(props);
    }


    render() {
        return (
            <Container >
                <Row>
                    <Col><div id=""><PaymentInfo/></div></Col>
                    <Col><div id="">
                        {this.renderBankSelectList()}</div>
                    </Col>
                </Row>
            </Container>
        );
    }


    renderBankSelectList(){
        const { banks } = this.props.banks;
        return (
            <div>
                <h6 color='#0b062f' align="left">Choose your preferred Debtor Account</h6>
                <Container>
                    {banks.map(c => <Bank key={c.uid} id={c.uid}  name={c.name} onSelect={this.props.onSelect} />)}
                </Container>
            </div>

        );
    }
}
