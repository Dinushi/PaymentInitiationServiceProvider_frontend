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
import {SignUpPSU} from '../../utils/api_calls_payment_process';
import {handleValidationOfPSUSignUp} from '../../utils/validations';


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
        marginRight: theme.spacing.unit*3,
        marginLeft: theme.spacing.unit * 2,
    },
    reset: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit *3,
        marginRight: theme.spacing.unit*3,
    },
    back: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
    },
});

class PSUSignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data_fields: {},
            errors: {},
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleUserInputValidations= this.handleUserInputValidations.bind(this);
        this.onSelectToSubmit = this.onSelectToSubmit.bind(this);
        this.setSignUpCompleted = this.setSignUpCompleted.bind(this);
    }


    /**
     * call method in validation.js and verify the inputs by the user
     * @returns {boolean}
     */
    handleUserInputValidations(){
        const formValidationData = handleValidationOfPSUSignUp(this.state.data_fields);
        var formIsValid = formValidationData.formIsValid;
        if(!formIsValid){
            alert(formValidationData.error);
        }
        return formIsValid;
    }


    /**
     * call back function which get notified when the user sign-up is successful
     */
    setSignUpCompleted(result,msg){
        if(result){
            console.log(msg);
            alert(msg);
            this.props.history.push('/psuLogin');
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
        let result=this.handleUserInputValidations();
        e.preventDefault();
        if(true){
            alert("Confirm to submit the form !!");
            SignUpPSU(this.setSignUpCompleted,this.state.data_fields["first_name"],this.state.data_fields["last_name"], this.state.data_fields["username"],
                    this.state.data_fields["password"], this.state.data_fields["email"]
                );

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
                                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                                    <Input id="first_name"
                                           name="first_name"
                                           autoComplete="first_name"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="last_name"> Last Name </InputLabel>
                                    <Input id="last_name"
                                           name="last_name"
                                           autoComplete="last_name"
                                           autoFocus
                                           onChange={this.handleChange}
                                    />
                                </FormControl>

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
                                        type="password"
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
                                    Submit
                                </Button>
                                <Button
                                    type="reset"
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.reset}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={this.props.classes.back}
                                >
                                    Back
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

PSUSignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PSUSignUp));
