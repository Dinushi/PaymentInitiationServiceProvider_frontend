import axios from "axios";
axios.defaults.withCredentials = true;

/**
 * sign up psu at PISP
 * @param setSignUpCompleted
 * @param first_name
 * @param last_name
 * @param username
 * @param password
 * @param email
 * @constructor
 */
export const SignUpPSU=(setSignUpCompleted, first_name, last_name, username, password, email)=>{
    //get backend path from store
    //const url = backendPaths.basePath + backendPaths.resources.userRegister;
    const url="https://localhost:9446/pispBackend/user/psu/";
    if (first_name === '' || last_name === '' || username === '' || password === '' || email == '') {
        return;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName:first_name,
            lastName:last_name,
            username:username,
            password:password,
            email:email,
        }),
    }).then((response) => {
        if (response.status==200) {
            console.log("response 200 OK");
            setSignUpCompleted(true,"User Successfully Registered");
        } else if (response.status === 403) {
            setSignUpCompleted(false, "Username "+username+" already Exists.");
        } else {
            setSignUpCompleted(false, "Error!! Try Again.");
        }
    });
};

/**
 * sign-in & authorize the PSU at PISP
 * @param setSignUpCompleted
 * @param username
 * @param password
 * @constructor
 */
export const SignInPSU=(setSignInCompleted,username, password,paymentInitReqId)=>{
    const payload = {
        username : username,
        password : password
    };
    axios.post('https://localhost:9446/pispBackend/user/psu/login',payload,{
        headers: {
            'Content-Type': 'application/json',
            'paymentInitReqId': paymentInitReqId,
        }
    }).then((response) => {
        if(response.status==200){
            alert('Login Successful');
            setSignInCompleted(true,"User Login Successful");
        }
        else if(response.status==404){
            alert('Login Failed');
            setSignInCompleted(false,"Incorrect Username");
        }else if(response.status==200){
            alert('Login failed');
            setSignInCompleted(false,"Incorrect Password");
        }
    })
        .catch((error) => {
            if (window.console) {
                console.log('error', error);
            }
            setSignInCompleted(false, "Can not Authorize the user "+username);
        });
};

/**
 * this will call the bank end API to get the banks supported by PISP
 * @param setBankSelectionCompleted
 * @param id
 * @param username
 */
export const getBankSelectionList=(setBankList)=>{
    axios
        .get("https://localhost:9446/pispBackend/bank-connection/")
        .then(response =>{
            console.log("Bank List:"+response.data);
            setBankList(response.data);
        })
        .catch(error =>console.log(error));
};


/**
 * this will call the bank end API to get the payment data relevant to the PSU
 * @param updatePaymentData
 */
export const getPaymentData=(updatePaymentData,username)=>{
    axios
        .get("https://localhost:9446/pispBackend/payment-initiation",{
            headers: {
                'Content-Type': 'application/json',
                'username': username,
            }
        },{credentials: 'include'})
        .then(response =>{

            console.log("Payment Info : "+response.data);
            updatePaymentData(response.data,true);
        })
        .catch(error =>{
            console.log(error);
            updatePaymentData("Internal Error",false);
        });
};



/**
 * this will call the bank end API to specify the debtor bank selected by PSU
 * @param setBankSelectionCompleted
 * @param id
 * @param username
 */
export const submitBankSelectionByPSU=(setBankSelectionCompleted,id,username)=>{
    console.log("Calling Backend to set debtor bank");
    const payload = {
        bankUid: id,
    };
    axios.post('https://localhost:9446/pispBackend/payment-initiation/debtor-bank', payload,{
        headers: {
            'Content-Type': 'application/json',
            'username': username,
        }
    }, {credentials: 'include'})

        .then((response) => {
            console.log("Bank selection Response : "+response.data);
            setBankSelectionCompleted(response.data,true);
        })
        .catch((error) => {
            if (window.console) {
                console.log('error', error);
            }
            setBankSelectionCompleted("Internal Error",false);
        });
};

/**
 * call the bank end api to set the bank Account selected by PSU
 * return the authorization url received as the response
 *
 * @param setAccountSelectionCompleted
 * @param accountScheme
 * @param bankAccountNo
 * @param accountOwnerName
 * @param username
 */
export const handleAccountSelectionByPSU=(setAccountSelectionCompleted,accountScheme,bankAccountNo ,accountOwnerName,username)=>{
    console.log("calling the backend to set debtor account");

    const payload = {
        schemeName: accountScheme,
        identification : bankAccountNo,
        accountOwnerName : accountOwnerName
    };

    axios.post('https://localhost:9446/pispBackend/payment-initiation/debtor-account/', payload,{
        headers: {
            'Content-Type': 'application/json',
            'username': username,
        }
    }, {credentials: 'include'})

        .then((response) => {
            console.log("Account selection Response -Auth URL : "+response.data.authUrl);
            setAccountSelectionCompleted(response.data,true);
        })
        .catch((error) => {
            if (window.console) {
                console.log('error', error);
            }
            setAccountSelectionCompleted("Internal Error",false);
        });
};

/**
 * Pass the code grant received and call the backend to submit the payment to the ASPSP.
 * This method is called only when the ASPSP requires a payment submission after PSU authorization.
 *
 * @param setPaymentSubmissionCompleted
 * @param code
 * @param idToken
 * @param username
 */
export const sentRequestToSubmitThePayment=(notifyPaymentStatus,code,idToken, username)=>{
    console.log("call the backend to submit the payment to the bank");

    const payload = {
        code: code,
        idToken: idToken,
    };
    axios.post('https://localhost:9446/pispBackend/payment-initiation/submission/', payload,{
        headers: {
            'Content-Type': 'application/json',
            'username': username,
        }
    }, {credentials: 'include'})

        .then((response) => {
            console.log("Payment Submission Response : "+response.data);
            notifyPaymentStatus(response.data,true);
        })
        .catch((error) => {
            if (window.console) {
                console.log('error', error);
            }
            notifyPaymentStatus("Internal Error",false);
        });
};

/**
 * Request the backend to send a GET request to ASPSP to retrieve the status of payment.
 * This method is called only for the Banks which follows a specification that doesn't require a payment submission
 * after PSU authorization of payment
 *
 * @param notifyPaymentStatus
 * @param username
 */
export const requestToGetPaymentStatusFromBank=(notifyPaymentStatus,username)=>{
    axios
        .get("https://localhost:9446/pispBackend/payment-initiation/status",{
            headers: {
                'Content-Type': 'application/json',
                'username': username,
            }
        },{credentials: 'include'})
        .then(response =>{
            console.log("Payment status info : "+response.data);
            notifyPaymentStatus(response.data,true);
        })
        .catch(error =>{
            console.log(error);
            notifyPaymentStatus("Internal Error",false);
        });
};



