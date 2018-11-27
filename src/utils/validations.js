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

/**
 * handles the user inputs of Sign-up form
 * @param fields
 * @returns {boolean}
 */
export const handleValidation=(fields)=>{
    let error = null;
    let formIsValid = true;

    //e_shop_name
    if(!fields["e_shop_name"]){
        formIsValid = false;
        error = "Cannot be empty";
    }

    else if(typeof fields["e_shop_name"] !== "undefined"){
        if(!fields["e_shop_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            error= "Only letters";
        }
    }
    else if(fields["password"] !== fields["re-password"]){
        formIsValid = false;
        error = "Re-type password is not same";
    }
    else if(typeof fields["e_shop_name"] !== "undefined"){
        if(!fields["e_shop_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            error= "Only letters";
        }
    }

    else if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            error = "Email is not valid";
        }
    }
    return {
        formIsValid: formIsValid,
        errors: error
    };
};


/**
 * handles the user inputs of PSU Sign-up form
 * @param fields
 * @returns {boolean}
 */
export const handleValidationOfPSUSignUp=(fields)=>{
    let error=null;
    let formIsValid = true;

    if(typeof fields["first_name"] !== "undefined"){
        if(!fields["first_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            error = "Only letters";
        }
    }
    if(typeof fields["last_name"] !== "undefined"){
        if(!fields["last_name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            error = "Only letters";
        }
    }
    if(fields["password"] !== fields["re-password"]){
        formIsValid = false;
        error= "Re-type password is not same";
    }

    if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            error= "Email is not valid";
        }
    }
    return {
        formIsValid: formIsValid,
        errors: error
    };
};


