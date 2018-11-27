import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../../styles/UserProfileStyles/Profile.css';
import InputLabel from "@material-ui/core/InputLabel";
import {getEshopProfile} from '../../utils/api_calls';



export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eShopName:null,
            username:null,
            registeredBussinessName:null,
            eShopRegistrationNo:null,
            registeredCountry:null,
            email:null,
            ecommerceMarketplaceCategory:null,
            merchantCategoryCode:null,
            merchantProductType:null,
            identification:null,
            bankName:null,
            accIdentification:null,
            accountOwnerName:null,
        }
        this.setUserProfileDetails = this.setUserProfileDetails.bind(this);
        this.handleEditDataRequest = this.handleEditDataRequest.bind(this);

    }

    /**
     * call back function which get notified when the user profile data retrieval is successful
     */
    setUserProfileDetails(data,msg){
        if(data){
            this.setState({
                eShopName : data.eShopName,
                username : data.username,
                registeredBussinessName : data.registeredBussinessName,
                eShopRegistrationNo : data.eShopRegistrationNo,
                registeredCountry : data.registeredCountry,
                email : data.email,
                ecommerceMarketplaceCategory : data.ecommerceMarketplaceCategory,
            });
        }
        if(data.ecommerceMarketplaceCategory==="single_vendor"){
            this.setState({
                ecommerceMarketplaceCategory : "Single Vendor",
                merchantCategoryCode : data.merchantInfo.merchantCategoryCode,
                merchantProductType : data.merchantInfo.merchantProductType,
                identification : data.merchantInfo.merchantBank.identification,
                bankName : data.merchantInfo.merchantBank.bankName,
                accIdentification : data.merchantInfo.merchantBankAccountData.identification,
                accountOwnerName : data.merchantInfo.merchantBankAccountData.accountOwnerName,
            });
        }
       else{
            this.setState({
                ecommerceMarketplaceCategory : "Multi Vendor",
            });
        }
        console.log(msg);
    }

    /**
     * call backend api to retrieve user profile details
     */
    componentDidMount(){
        console.log("calling the backend to get profile details ");
        getEshopProfile(this.setUserProfileDetails, this.props.username);
    }

    handleEditDataRequest(id){
        console.log("executes");
        document.getElementById(id).removeAttribute("readonly");
    }


    /**
     * render some additional form elements to show merchant info if the user is a single-vendor
     * @returns {*}
     */
    renderMerchantInfoForm() {
        if(this.state.ecommerceMarketplaceCategory === 'Single Vendor') {
            return (
                <div>
                    <FormGroup>
                        <Label for="merchantCategoryCode">Merchant Category Code</Label>
                        <Input type="text" name="merchantCategoryCode" id="merchantCategoryCode"  value={this.state.merchantCategoryCode} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("merchantCategoryCode") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="merchantProductType">Merchant Product Type</Label>
                        <Input type="text" name="merchantProductType" id="merchantProductType"  value={this.state.merchantProductType} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("merchantProductType") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>

                    <div id="space"></div>
                    <div  id="merchantInfo"><InputLabel >Merchant Bank Details</InputLabel></div>
                    <div id="space"></div>
                    <FormGroup>
                        <Label for="identification">Bank Identification</Label>
                        <Input type="text" name="identification" id="identification"  value={this.state.identification} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("identification") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="bankName">Bank Name</Label>
                        <Input type="text" name="bankName" id="bankName"  value={this.state.bankName} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("bankName") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>
                    <div id="space"></div>

                    <div id="merchantInfo"><InputLabel >Merchant Bank Account Details</InputLabel></div>
                    <div id="space"></div>
                    <FormGroup>
                        <Label for="accIdentification">Account Identification</Label>
                        <Input type="text" name="accIdentification" id="accIdentification"  value={this.state.accIdentification} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("accIdentification") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="accountOwnerName">Account Owner Name</Label>
                        <Input type="text" name="accountOwnerName" id="accountOwnerName"  value={this.state.accountOwnerName} readonly/>
                        <button id="editIcon1" onClick={()=> this.handleEditDataRequest("accountOwnerName") }><i className="fa fa-pencil"></i></button>
                    </FormGroup>
                </div>

            );
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <h3 >User Profile</h3>
                </FormGroup>

                <FormGroup>
                    <Label for="eShopName">E-Shop Name</Label>
                    <Input type="text" name="eShopName" id="eShopName" value={this.state.eShopName} readonly/>
                    <button id="editIcon1" onClick={()=> this.handleEditDataRequest("eShopName") }><i className="fa fa-pencil"></i></button>
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label><div></div>
                    <Input id="inputFiel" type="text" name="username" id="username" value={this.state.username} readonly/>
                    <button id="editIco" type="submit"><i className="fa fa-pencil"></i></button>
                </FormGroup>
                <FormGroup>
                    <Label for="registeredBussinessName">Registered Business Name</Label><div></div>
                    <Input id='inputField1' type="text" name="registeredBussinessName" value={this.state.registeredBussinessName} readonly/>
                    <button id="editIcon1" type="submit"><i className="fa fa-pencil"></i></button>
                </FormGroup>
                <FormGroup>
                    <Label for="eShopRegistrationNo">E-Shop Registration No</Label>
                    <Input type="text" name="eShopRegistrationNo" id="eShopRegistrationNo" value={this.state.eShopRegistrationNo} readonly/>
                </FormGroup>
                <FormGroup>
                    <Label for="registeredCountry">Registered Country</Label>
                    <Input type="text" name="registeredCountry" id="registeredCountry" value={this.state.registeredCountry} readonly/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-Mail</Label>
                    <Input type="email" name="email" id="email" value={this.state.email} readonly />
                    <button id="editIcon1" type="submit"><i className="fa fa-pencil"></i></button>
                </FormGroup>

                <FormGroup>
                    <Label for="ecommerceMarketplaceCategory">E-Commerce Marketplace Category</Label>
                    <Input type="text" name="text" id="ecommerceMarketplaceCategory" value={this.state.ecommerceMarketplaceCategory} readonly  />
                </FormGroup>
                {this.renderMerchantInfoForm()}

            </Form>
        );
    }
}
