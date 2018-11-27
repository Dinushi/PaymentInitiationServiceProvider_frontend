import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import withRouter from "react-router/es/withRouter";
import {SignUpEShopSingleVendor} from '../../utils/api_calls';
import {SignUpEShopMultiVendor} from "../../utils/api_calls";
import {handleValidation} from '../../utils/validations';


import '../../styles/LoginStyles/SignUp.css';



const styles = theme => ({

    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit*5,
        marginLeft: theme.spacing.unit * 5,
    },
    reset: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 4,
    },
});

class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data_fields: {},
            errors: {},
            selectedMarketPlaceOption: null,
            dropDownOpen: false,
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleUserInputValidations= this.handleUserInputValidations.bind(this);
        this.onSelectToSubmit = this.onSelectToSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.setSignUpCompleted = this.setSignUpCompleted.bind(this);
    }

    /*
    handleValidation(){
        let fields = this.state.data_fields;
        let errors = {};
        let formIsValid = true;

        //e_shop_name
        if(!fields["e_shop_name"]){
            formIsValid = false;
            errors["e_shop_name"] = "Cannot be empty";
        }

        if(typeof fields["e_shop_name"] !== "undefined"){
            if(!fields["e_shop_name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["e_shop_name"] = "Only letters";
            }
        }

        //Email
        if(fields["password"] !== fields["re-password"]){
            formIsValid = false;
            errors["password"] = "Re-type password is not same";
        }
        if(typeof fields["e_shop_name"] !== "undefined"){
            if(!fields["e_shop_name"].match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                errors["e_shop_name"] = "Only letters";
            }
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    */

    /**
     * call method in validation.js and verify the inputs by the user
     * @returns {boolean}
     */
    handleUserInputValidations(){
        let isFormValid=handleValidation(this.state.data_fields);
        return isFormValid;
    }


    /**
     * call back function which get notified when the user sign-up is successful
     */
    setSignUpCompleted(result,msg){
        if(result){
            console.log("User registration completed");
            alert("Successfully Registered!!"+ "\\n" +msg);
            this.props.history.push('/');
        }else{
            console.log(msg);
            alert(msg);
        }
    }


    /**
     * make the API call in api_calls.js to register user at PISP
     * @param e
     */
    onSelectToSubmit(e){
        e.preventDefault();
        //let result=this.handleValidation();
        //add result for true
        //let result=this.handleUserInputValidations();
        if(true){
            alert("Confirm to submit the form !!");

            if(this.state.selectedMarketPlaceOption === 'Single Vendor'){
                SignUpEShopSingleVendor(this.setSignUpCompleted,this.state.data_fields["e_shop_name"],"multi_vendor",this.state.data_fields["registered_country"],
                    this.state.data_fields["registered_no"], this.state.data_fields["registered_business_name"],this.state.data_fields["username"],
                    this.state.data_fields["password"], this.state.data_fields["email"],this.state.data_fields["merchantCategoryCode"],
                    this.state.data_fields["merchantProductType"], this.state.data_fields["identification"],this.state.data_fields["bankName"],
                    this.state.data_fields["accIdentification"],this.state.data_fields["accountOwnerName"]
                );

            }else{
                SignUpEShopMultiVendor(this.setSignUpCompleted,this.state.data_fields["e_shop_name"],"multi_vendor",this.state.data_fields["registered_country"],
                    this.state.data_fields["registered_no"], this.state.data_fields["registered_business_name"],this.state.data_fields["username"],
                    this.state.data_fields["password"], this.state.data_fields["email"]
                );
            }

        }else{
            let errors = this.state.errors;
            let errorMsg=errors["e_shop_name"];
            alert("Form has errors. "+errorMsg);
        }

    }

    /**
     * handle user inputs
     * @param event
     */
    handleChange(event){
        let data_fields = this.state.data_fields;
        data_fields[ event.target.name ] = event.target.value;
        this.setState({data_fields});
    }


    /**
     * render some additional form elements to get merchant info if the user is a single-vendor
     * @returns {*}
     */
    renderMerchantInfoForm() {
        if(this.state.selectedMarketPlaceOption === 'Single Vendor') {
            return (
                <div>
                    <FormControl margin="normal"  required fullWidth>
                        <InputLabel htmlFor="merchantCategoryCode">Merchant Category Code</InputLabel>
                        <Input id="merchantCategoryCode"
                               name="merchantCategoryCode"
                               autoComplete="merchantCategoryCode"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal"  fullWidth>
                        <InputLabel htmlFor="merchantProductType">Merchant Product Type</InputLabel>
                        <Input id="merchantProductType"
                               name="merchantProductType"
                               autoComplete="merchantProductType"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>


                    <div id="space"></div>
                    <div  id="merchantInfo"><InputLabel >Merchant Bank Details</InputLabel></div>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="identification">Bank Identification</InputLabel>
                        <Input id="identification"
                               name="identification"
                               autoComplete="identification"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal"  required fullWidth>
                        <InputLabel htmlFor="bankName">Bank Name</InputLabel>
                        <Input id="bankName"
                               name="bankName"
                               autoComplete="bankName"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>


                    <div id="space"></div>
                    <div id="merchantInfo"><InputLabel >Merchant Bank Account Details</InputLabel></div>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="accIdentification">Account  Identification</InputLabel>
                        <Input id="accIdentification"
                               name="accIdentification"
                               autoComplete="accIdentification"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required  fullWidth>
                        <InputLabel htmlFor="accountOwnerName">Account Owner Name</InputLabel>
                        <Input id="accountOwnerName"
                               name="accountOwnerName"
                               autoComplete="accountOwnerName"
                               autoFocus
                               onChange={this.handleChange}
                        />
                    </FormControl>

                </div>

            );
        }
    }


    /**
     * handle the radio button selection for e-commerce market place category of user
     * @param changeEvent
     */
    handleOptionChange(changeEvent) {
        this.setState({
            selectedMarketPlaceOption: changeEvent.target.value
        });
    }

    render() {

        return (
            <div className="container widthControl animated fadeInRight" id="signup">
                <React.Fragment>
                    <CssBaseline />
                    <main className={this.props.classes.layout}>
                        <Paper className={this.props.classes.paper}>

                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <form className={this.props.classes.form} onSubmit={this.onSelectToSubmit}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="e_shop_name">Name of E-Commerce Site</InputLabel>
                                    <Input id="e_shop_name"
                                           name="e_shop_name"
                                           autoComplete="e_shop_name"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="registered_business_name">Registered Business Name </InputLabel>
                                    <Input id="registered_business_name"
                                           name="registered_business_name"
                                           autoComplete="registered_business_name"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal"  fullWidth>
                                    <InputLabel htmlFor="">Registered Country</InputLabel>
                                    <Input id="registered_country"
                                           name="registered_country"
                                           autoComplete="registered_country"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="registered_no">Registered No</InputLabel>
                                    <Input id="registered_no"
                                           name="registered_no"
                                           autoComplete="registered_no"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal"  fullWidth>
                                    <InputLabel htmlFor="registered_authority">Registered Authority</InputLabel>
                                    <Input id="registered_authority"
                                           name="registered_authority"
                                           autoComplete="registered_authority"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>


                                <div id="space"></div>
                                <div id="merchantInfo"><InputLabel htmlFor="eCommerce_marketplace_category">E-commerce Marketplace Category</InputLabel></div>
                                <div id="radio">
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="Single Vendor"
                                                   checked={this.state.selectedMarketPlaceOption === 'Single Vendor'}
                                                   onChange={this.handleOptionChange} />
                                            Single Vendor
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="Multi Vendor"
                                                   checked={this.state.selectedMarketPlaceOption === 'Multi Vendor'}
                                                   onChange={this.handleOptionChange} />
                                            Multi Vendor
                                        </label>
                                    </div>
                                </div>

                                {this.renderMerchantInfoForm()}

                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="username">Preferred Username</InputLabel>
                                    <Input id="username"
                                           name="username"
                                           autoComplete="username"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="re-password">Re-Type Password</InputLabel>
                                    <Input
                                        name="re-password"
                                        type="re-password"
                                        id="re-password"
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">E-mail</InputLabel>
                                    <Input id="email"
                                           name="email"
                                           autoComplete="email"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>

                                <FormControlLabel
                                    control={<Checkbox value="agree" required  color="primary" />}
                                    label="I agree with the terms and conditions of PISP application"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.submit}
                                >
                                    Register
                                </Button>
                                <Button
                                    type="reset"
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.reset}
                                >
                                    Reset
                                </Button>
                            </form>
                            <br/>

                        </Paper>
                    </main>
                </React.Fragment>
            </div>
        );

    }


}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignUp));
