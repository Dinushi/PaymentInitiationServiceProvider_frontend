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
 * All manipulations of local storage of the browser resides here.
 */

/**
 * To check if the browser storage is available.
 */
const storageCheck = () => typeof localStorage === 'undefined';

// E-Shop Related Storage

/**
 * Store the username of the e-shop user.
 * @param name
 */
export const setUsername = (name) => {
    if (!storageCheck()) localStorage.username = name;
};


/**
 * Retrieve the stored e-shop username.
 * @returns {*|string}
 */
export const getUsername = () => {
    if (!storageCheck()) {
        return localStorage.username;
    }
};

export const unsetUsername = () => {
    if (!storageCheck()) localStorage.removeItem('username');
};


// PSU Related Storage
/**
 * Store the username of the psu.
 * @param name
 */
export const setPSUUsername = (name) => {
    if (!storageCheck()) localStorage.PSUUsername = name;
};


/**
 * Retrieve the stored username of PSU.
 * @returns {*|string}
 */
export const getPSUUsername = () => {
    if (!storageCheck()) {
        return localStorage.PSUUsername;
    }
};

export const unsetPSUUsername = () => {
    if (!storageCheck()) localStorage.removeItem('PSUUsername');
};



// Payment Submission Related Storage
/**
 * Store whether the debtor bank of PSU needs payment submission after payment authorization.
 * @param name
 */
export const setIsSubmissionRequired = (value) => {
    if (!storageCheck()) localStorage.isSubmissionRequired = value;
};

/**
 * Retrieve whether the debtor bank of PSU needs payment submission after payment authorization
 */
export const getIsSubmissionRequired = () => {
    if (!storageCheck()) {
        return localStorage.isSubmissionRequired;
    }
};

export const unsetIsSubmissionRequired = () => {
    if (!storageCheck()) localStorage.removeItem('isSubmissionRequired');
};


//the redirectLink to e-shop site is stored at the 1st payment information retrieval
/**
 * set the redirect link to e-shop site
 * @param value
 */
export const setRedirectLinkToEShop = (value) => {
    if (!storageCheck()) localStorage.redirectLinkToEShop = value;
};

/**
 * Retrieve the redirect link to e-shop site
 */
export const getRedirectLinkToEShop = () => {
    if (!storageCheck()) {
        return localStorage.redirectLinkToEShop;
    }
};

export const unsetRedirectLinkToEShop = () => {
    if (!storageCheck()) localStorage.removeItem('redirectLinkToEShop');
};


//the payment-init-req-id is stored temporally
/**
 * set the payment-init-req id
 * @param value
 */
export const setPaymentInitReqId = (value) => {
    if (!storageCheck()) localStorage.paymentInitReqId = value;
};

/**
 * Retrieve the payment-init-req id
 */
export const getPaymentInitReqId = () => {
    if (!storageCheck()) {
        return localStorage.paymentInitReqId;
    }
};

/**
 * unset the payment-init-req id once the user sign-up finishes
 */
export const unsetPaymentInitReqId = () => {
    if (!storageCheck()) localStorage.removeItem('paymentInitReqId');
};


/**
 * Check if user has access to the route by validating session.
 */
export const validateUserAccess = () => {
    if (!storageCheck()) {
        if (!localStorage.SESSIONID) {
            window.location.replace('/');
        }
    }
};



// Bank Linking Related Storage
/**
 * Set the bank currently being linked by the user.
 * Needed to store this state as redirection while linking takes user to a different website.
 * @param bank
 */
export const setCurrentlyLinkingBank = (bank) => {
    localStorage.currentlyLinking = JSON.stringify(bank);
};

/**
 * Get the bank currently being linked by the user.
 * @returns {*|string}
 */
export const getCurrentlyLinkingBank = () => {
    if (!storageCheck()) {
        return JSON.parse(localStorage.currentlyLinking);
    }
    return {};
};

/**
 * Remove the bank currently being linked by the user.
 */
export const unsetCurrentlyLinkingBank = () => {
    if (!storageCheck()) localStorage.currentlyLinking = {};
};


// Aggregated Data Related
export const cacheAggregatedData = (data) => {
    if (!storageCheck()) localStorage.persistedData = JSON.stringify(data);
};

export const setDataReceived = () => {
    if (!storageCheck()) localStorage.receivedData = 'RECEIVED';
};

export const getCachedData = () => {
    if (!storageCheck()) return localStorage.persistedData;
};

export const isDataReceivedAlready = () => {
    if (!storageCheck()) return localStorage.receivedData === 'RECEIVED';
};

export const unsetDataReceived = () => {
    if (!storageCheck()) localStorage.receivedData = 'NOT-RECEIVED';
};

export const setSessionID = (iD) => {
    if (!storageCheck()) localStorage.SESSIONID = iD;
};

export const getSessionID = () => {
    if (!storageCheck()) return localStorage.SESSIONID;
};

export const getUserSettings = () => {
    if (!storageCheck() && typeof localStorage.userSettings !== 'undefined') {
        return JSON.parse(localStorage.userSettings);
    }
};

export const setUserSettings = (data) => {
    if (!storageCheck()) localStorage.userSettings = JSON.stringify(data);
};

export const isNewUser = () => {
    if (!storageCheck()) return sessionStorage.newUser;
};
