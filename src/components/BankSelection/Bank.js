import React, {Component} from "react";
import PropTypes from "prop-types";
import '../../styles/BankSelectionStyles/Bank.css';
import axios from "axios";

class Bank extends Component{

    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div className="bank">
          <span>
              <button class='btn'
                  style={ { fontSize: 20, color: 'Blue' } }
                  styleDisabled={ { color: 'red' } }
                  onClick={ () => this.props.onSelect(this.props.id) }>
              {this.props.name}
            </button>
          </span>
            </div>
        );

    }

}

Bank.propTypes = {
    name: PropTypes.string.isRequired
};

export default Bank;
/**
 * when a bank is selected pass both its id n name to bankAccountForm.js
 **/
