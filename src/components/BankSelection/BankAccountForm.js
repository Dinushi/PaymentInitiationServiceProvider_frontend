import {Component} from "react";
import React from "react";
import '../../styles/BankSelectionStyles/BankAccountForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {handleAccountSelectionByPSU} from "../../utils/api_calls_payment_process";
import {getPSUUsername} from "../../data-store/local-storage";
import NotifyAuthorization from "./NotifyAuthorization";


class BankAccountForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            AccountSelectionNotCompleted :true,
            bankSelectionCompleted :false,
            selectedBank: props.id,
            selectedBankAccountScheme : "IBAN",
            isAccountRequired: props.isAccountRequired,
            selectedBankName : null,
            bankAccountNo: null,
            bankAccountOwnerName : null,
            redirectURL :null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleChangeBankAccount = this.handleChangeBankAccount.bind(this);
        this.handleChangeAccountOwner = this.handleChangeAccountOwner.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.setAccountSelectionCompleted = this.setAccountSelectionCompleted.bind(this);

    }




    /**
     * the callback function that get notified when the account selection response received
     * the link for the PSU authorization for the redirection is received here with
     */
    setAccountSelectionCompleted(data, result){
        if(result){
            this.setState({
                redirectURL: data.authUrl,
                AccountSelectionNotCompleted : false,
            });
            console.log("Auth URL: "+ data.authUrl);
            //window.location.replace(responseData);//redirect the user for the payment authorization at bank
            //window.location.replace("https://github.com/Dinushi/PISP_backend");
        }else{
            console.log(data);
            alert(data);
        }

    }

    /**
     * @param e
     * handle the form submission and call backend APIs
     */
    handleSubmit(e) {
        alert('Submitting Account Data: ' + this.state.bankAccountNo+ "   &   "+this.state.bankAccountOwnerName);
        handleAccountSelectionByPSU(this.setAccountSelectionCompleted,this.state.selectedBankAccountScheme,this.state.bankAccountNo, this.state.bankAccountOwnerName,getPSUUsername());
        //this.handleBankSelection(this.state.selectedBankAccountScheme, this.state.bankAccountNo,this.state.bankAccountOwnerName);
        e.preventDefault();
    }

    handleSkip(){
        alert('Skip Specifying Accounts ?');
        handleAccountSelectionByPSU(this.setAccountSelectionCompleted,this.state.selectedBankAccountScheme,this.state.bankAccountNo, this.state.bankAccountOwnerName,getPSUUsername());
    }

    handleChangeBankAccount(event) {
        this.setState({bankAccountNo: event.target.value});
    }

    handleChangeAccountOwner(event) {
        this.setState({bankAccountOwnerName: event.target.value});
    }

    /**
     * handle the radio button selection for Account Identification schema
     * @param changeEvent
     */
    handleOptionChange(changeEvent) {
        this.setState({
            selectedBankAccountScheme: changeEvent.target.value,
        });
    }


    render() {
        const { selectedBank } = this.state;
        const { isAccountRequired } = this.state;
        const { AccountSelectionNotCompleted } = this.state;
        return (

            <div className="App">
                <div>
                    {
                        AccountSelectionNotCompleted ?
                        <div>
                            <div>
                                <div id="space"></div>
                                <h3 align="center">{selectedBank}</h3>
                                <div id="space"></div>
                            </div>
                            <div id="accountForm" align="center">
                                <form className="commentForm" onSubmit={this.handleSubmit}>
                                    <div id="space"></div>
                                    <label>Account Identification Scheme</label>
                                    <div id="radio">
                                        <div className="radio">
                                            <label id="lbl">
                                                <input type="radio" value="IBAN"
                                                       checked={this.state.selectedBankAccountScheme === 'IBAN'}
                                                       onChange={this.handleOptionChange} />
                                                IBAN
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label id="lbl2">
                                                <input type="radio" value="SORT-CODE"
                                                       checked={this.state.selectedBankAccountScheme === 'SORT-CODE'}
                                                       onChange={this.handleOptionChange} />
                                                SORT-CODE
                                            </label>
                                        </div>
                                    </div>

                                    <TextField
                                        name='bankAccount'
                                        label='Your Bank Account No'
                                        margin='normal'
                                        value={this.state.bankAccountNo}
                                        onChange={this.handleChangeBankAccount}
                                    />
                                    <br/>
                                    <TextField
                                        name='accountOwnerName'
                                        label='Account Owner Name'
                                        margin='normal'
                                        value={this.state.bankAccountOwnerName}
                                        onChange={this.handleChangeAccountOwner}
                                    />
                                    <br/>
                                    <div id="controlButtons">
                                        <input type="submit" value="Submit" />
                                        <input type="reset" value="Reset" />
                                    </div>
                                </form>
                            </div>

                            <div align="center">
                                {!isAccountRequired ? (
                                    <div >
                                        <div id="space"></div>
                                        <h4>The selected bank doesn't essentially require the Debtor account at this stage.</h4>
                                        <h5> If you wish to provide debtor account during the authorization process,
                                            Click Skip</h5>
                                        <Button id="skip" variant="outlined" color="primary" onClick={()=> this.handleSkip()}>
                                            Skip
                                        </Button>
                                    </div>

                                ) : (
                                    <div></div>
                                )}
                                <div align="left"> <Button variant="outlined" color="primary" onClick={()=> this.props.onDismiss() }>Back
                                </Button>
                                </div>
                            </div>

                        </div> :
                            <NotifyAuthorization redirectURL={this.state.redirectURL}/>
                    }
                </div>
            </div>



        );

    }

}
export default BankAccountForm;

