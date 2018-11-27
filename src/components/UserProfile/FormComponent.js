import React, {Component} from "react";
import PropTypes from "prop-types";
import '../../styles/BankSelectionStyles/Bank.css';
import FormGroup from "reactstrap/src/FormGroup";
import Label from "reactstrap/src/Label";
import Input from "reactstrap/src/Input";
import Form from "reactstrap/src/Form";


class FormComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            componentVal: this.props.componentValue,
            toggleComponent: true,
        }
        this.handleEditDataRequest= this.handleEditDataRequest.bind(this);
    }

    handleEditDataRequest(){
        this.setState({
            toggleComponent : false,
        });
    }

    render(){
        return (
            <div>
                <Form/>
                <FormGroup>
                    <Label for={this.props.componentId}>{this.props.componentVisibleName}</Label>
                    <Input type="text" name={this.props.componentId} id={this.props.componentId} value={this.state.componentVal} readonly={this.state.toggleComponent}/>
                    <button id="editIcon1" onClick={()=> this.handleEditDataRequest() }><i className="fa fa-pencil"></i></button>
                </FormGroup>
                <Form/>
            </div>

        );

    }

}

FormComponent.propTypes = {
    name: PropTypes.string.isRequired
};

export default FormComponent;
