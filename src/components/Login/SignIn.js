/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses. For specific
 * language governing the permissions and limitations under this license,
 * please see the license as well as any agreement you’ve entered into with
 * WSO2 governing the purchase of this software and any associated services.
 */
import {setUsername} from '../../data-store/local-storage/index';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import withRouter from "react-router/es/withRouter";
import axios from "axios";
import {setUserSettings} from "../../data-store/local-storage";


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
    },
});

class SignIn extends Component{

    constructor(props) {
        super(props);
        this.state={
            username : null,
            password: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.handleSignIn=this.handleSignIn.bind(this);

    }

    handleSignIn(username ,password) {

        const payload = {
            username : username,
            password : password
        };
        axios.post('https://localhost:9446/pispBackend/user/e-shop/login',payload,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if(response.status==200){
                setUsername(username);
                alert('Login Successful');
                this.props.setUserAuthorized();
            }
        })
            .catch((error) => {
                if (window.console) {
                    console.log('error', error);
                    alert('Can not Authorize the user.');
                }
                this.setState({
                    errorMessage: 'Something went wrong. Please try again.',
                    showError: true,
                });
            });
    }


    handleSubmit(e) {
        alert('Sign in : ' + this.state.username);
        //use the function in api-calls.js
        this.handleSignIn( this.state.username,this.state.password);
        e.preventDefault();
    }


    handleRegister(){
        this.props.history.push('/register');
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={this.props.classes.layout}>
                    <Paper className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={this.props.classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username"
                                       name="username"
                                       autoComplete="username"
                                       autoFocus
                                       onChange={this.handleChangeUsername}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChangePassword}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                            >
                                Sign in
                            </Button>
                        </form>
                        <br/>
                        <Typography component="h3" variant="h5">
                            <br/>
                        </Typography>
                        <Typography component="h7" variant="h6" >
                            Not Registered Yet ?
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={ () => this.handleRegister()}
                        >
                            Sign Up
                        </Button>

                    </Paper>
                </main>
            </React.Fragment>
        );

    }


}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn));
