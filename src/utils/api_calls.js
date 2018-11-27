import axios from "axios";


/**
 * Call the PISP backend API to register a multi vendor E-commerce site
 * @param eShopName
 * @param ecommerceMarketplaceCategory
 * @param registeredCountry
 * @param eShopRegistrationNo
 * @param registeredBusinessName
 * @param username
 * @param password
 * @param email
 * @constructor
 */
export const SignUpEShopMultiVendor=(setSignUpCompleted, eShopName, ecommerceMarketplaceCategory, registeredCountry, eShopRegistrationNo, registeredBusinessName, username, password, email)=>{
    //get backend path from store
    //const url = backendPaths.basePath + backendPaths.resources.userRegister;
    const url="https://localhost:9446/pispBackend/user/e-shop/";
    if (eShopName === '' || ecommerceMarketplaceCategory === '' || username === '' || password === '') {
        return;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eShopName:eShopName,
            eShopRegistrationNo:eShopRegistrationNo,
            registeredBussinessName: registeredBusinessName,
            registeredCountry:registeredCountry,
            username:username,
            password:password,
            email:email,
            ecommerceMarketplaceCategory:ecommerceMarketplaceCategory,
        }),
    }).then((response) => {
        if (response.status==200) {
            console.log("response 200 OK");
            setSignUpCompleted(true,"Please, use your username  "+ username+"  as your client-id to utilize the Payment Initiation APIs of PISP");
        } else if (response.status === 403) {
            setSignUpCompleted(false, "Username "+username+" already Exists.");
        } else {
            setSignUpCompleted(false, "Error!! Try Again.");
        }
    });
};


/**
 * Call the PISP backend API to register a single vendor E-commerce site
 * @param eShopName
 * @param ecommerceMarketplaceCategory
 * @param registeredCountry
 * @param eShopRegistrationNo
 * @param registeredBusinessName
 * @param username
 * @param password
 * @param email
 * @param merchantCategoryCode
 * @param merchantProductType
 * @param identification
 * @param bankName
 * @param accIdentification
 * @param accountOwnerName
 * @constructor
 */
export const SignUpEShopSingleVendor=(setSignUpCompleted,eShopName, ecommerceMarketplaceCategory, registeredCountry, eShopRegistrationNo, registeredBusinessName, username,
                                      password, email,merchantCategoryCode,merchantProductType,identification,bankName,accIdentification,accountOwnerName)=>{
    //get backend path from store
    //const url = backendPaths.basePath + backendPaths.resources.userRegister;
    const url="https://localhost:9446/pispBackend/user/e-shop/";
    if (eShopName === '' || ecommerceMarketplaceCategory === '' || username === '' || password === '' ||  merchantCategoryCode === ''
                    ||  bankName === '' ||  accIdentification === '') {
        return;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eShopName:eShopName,
            eShopRegistrationNo:eShopRegistrationNo,
            registeredBussinessName: registeredBusinessName,
            registeredCountry:registeredCountry,
            username:username,
            password:password,
            email:email,
            ecommerceMarketplaceCategory:ecommerceMarketplaceCategory,
            merchantInfo:{
                merchantIdentificationByEshop:username,
                merchantName:username,
                merchantCategoryCode: merchantCategoryCode,
                merchantProductType: merchantProductType,
                merchantBank:{
                    schemeName:"BICFI",
                    identification: identification,
                    bankName: bankName,
                },
                merchantBankAccountData:{
                    schemeName:"IBAN",
                    identification: accIdentification,
                    accountOwnerName: accountOwnerName,

                },
            },
        }),
    }).then((response) => {
        if (response.status==200) {
            console.log("response 200 OK");
            setSignUpCompleted(true,"SuccessFully Registered"+ username);
        } else if (response.status === 403) {
            setSignUpCompleted(false, "Username "+username+" already Exists.");
        } else {
            setSignUpCompleted(false, "Error!! Try Again.");
        }
    });
};

/**
 * retrieve the e-shop user profile details from the backend
 * @param setUserProfileDetails
 * @param username
 */
export const getEshopProfile=(setUserProfileDetails, username)=>{
    axios
        .get("https://localhost:9446/pispBackend/user/e-shop/"+username, { withCredentials: true, })
        .then(response =>{
            console.log(response.data);
            setUserProfileDetails(response.data,"User Profile details retrieved successfully");
        })
        .catch((error) => {
            if (window.console) {
                console.log('error', error);
                setUserProfileDetails(null,"Error in retrieving user profile details");
            }
        });

}


function handleSignIn(username ,password) {

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
            alert('Login Successful');
            return true;
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

