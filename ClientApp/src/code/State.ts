import { Constants } from "./Constants";
import { FlightTypeList } from "../Lists/FlightTypeList";
import { NumberOfPassengersList } from "../Lists/NumberOfPassengersList";
import { LandingSitesList } from "../Lists/LandingSitesList";
import { ICalendarDate, WebserviceHelper, IFlightDetails, IPricing, IPurchaseIntentResponse } from "./WebserviceHelper";
import { ChangeEvent } from "react";
import MessagesComponent from "../components/MessagesComponent";

/**
 * The client app should only call createState() once a the top level component.
 * This function will return State data and mutator functions that can be 
 * passed down to child components that need state data.
 * @param inParentComponent top level react component
 * @returns a State Object
 */
export function createState(inParentComponent) {

    return {
        //Purchase Order Input Fields
        //BookFlight UI fields
        flightType: -1,
        landingSite: -1,
        departureDate: null,
        returnDate: null,
        numOfPassengers: 0,
        bookedDatesMap: null,
        bookedReturnDatesMap: null,

        //BillingAddress UI fields
        userName: '',
        billingAddress1: '',
        billingAddress2: '',
        billingAptSuite: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        billingCountry: '',
        phoneNo: '',

        //MailingAddress UI fields
        useBillingAddress: false,
        mailingAddress1: '',
        mailingAddress2: '',
        mailingAptSuite: '',
        mailingCity: '',
        mailingState: '',
        mailingZip: '',
        mailingCountry: '',


        //Payment UI fields
        cardHolderName: '',
        creditCardNumber: '',
        expMonth: -1,
        expYear: -1,
        cCV: '',
        clientSecret: '',

        //Order Summary
        subtotal: 0,
        tax: 0,
        totalCost: 0,

        // MessagesComponent
        messageType: "",
        goToNextPage: false,

        orderNumber: "-1",

        loggedIn: false,


        /**
        * @function fieldChangeHandler
        * @param inName string
        * @param inValue any
        * @returns void
        */
        setFieldByName: function (inName: string, inValue: any) {
            if (inName === null || inName === "") return;
            this.setState({ [inName]: inValue });
        }.bind(inParentComponent),

        /**
        * @function fieldChangeHandler
        * @param ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        * @param type 
        * @param length
        * @param min
        * @param max
        * @returns void
        */
        fieldChangeHandler: function (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string, length: number, min: number, max: number): void {
            try {
                if (type != null) {
                    let elementIdOrName: string = "";

                    if (event.target.id) {
                        elementIdOrName = event.target.id;
                    } else if (event.target.name) {
                        elementIdOrName = event.target.name;
                    }
                    if (elementIdOrName.length == 0) return;

                    switch (type) {
                        case Constants.TYPE_STRING:
                            if (length > 0) {
                                if (event.target.value.length > length) {
                                    event.target.value = event.target.value.substring(0, length)
                                }
                            }
                            this.setState({ [elementIdOrName]: event.target.value });
                            break;
                        case Constants.TYPE_INT:
                            const intValue: number = parseInt(event.target.value);
                            if (!isNaN(intValue)) {
                                event.target.value = intValue.toString();
                                if (intValue < min || intValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: intValue });
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_DECIMAL:
                            const dValue: number = parseFloat(event.target.value);
                            if (!isNaN(dValue)) {
                                event.target.value = dValue.toString();
                                if (dValue < min || dValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: event.target.value });
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_PHONE:
                            if (!event.target.value) {
                                this.setState({ [elementIdOrName]: "" });
                                return;
                            }

                            if (event.target.value.length > length) {
                                event.target.value = event.target.value.substring(0, length)
                            }
                            let cleanedStr: string = event.target.value.replace(/[^0-9()\-\s+]/, '');
                            let match = cleanedStr.match(/^(\d{3})(\d{3})(\d{4})$/);

                            if (match) {
                                cleanedStr = '(' + match[1] + ') ' + match[2] + '-' + match[3];
                            };
                            event.target.value = cleanedStr;
                            this.setState({ [elementIdOrName]: cleanedStr });
                            break;
                    }
                }
            } catch (error) {
                console.log("State(): error in fieldChangeHandler(): " + error)
            }
        }.bind(inParentComponent),



        /**
        * @function fieldChangeHandlerWithCallBack
        * @param ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        * @param type
        * @param length
        * @param min
        * @param max
        * @param callback
        * @returns void
        */
        fieldChangeHandlerWithCallBack: function (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string, length: number, min: number, max: number, callback: any): void {
            try {
                if (type != null) {
                    let elementIdOrName: string = "";

                    if (event.target.id) {
                        elementIdOrName = event.target.id;
                    } else if (event.target.name) {
                        elementIdOrName = event.target.name;
                    }
                    if (elementIdOrName.length == 0) return;

                    switch (type) {
                        case Constants.TYPE_STRING:
                            if (length > 0) {
                                if (event.target.value.length > length) {
                                    event.target.value = event.target.value.substring(0, length)
                                }
                            }
                            this.setState({ [elementIdOrName]: event.target.value }, callback);
                            break;
                        case Constants.TYPE_INT:
                            const intValue: number = parseInt(event.target.value);
                            if (!isNaN(intValue)) {
                                event.target.value = intValue.toString();
                                if (intValue < min || intValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: intValue }, callback);
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_DECIMAL:
                            const dValue: number = parseFloat(event.target.value);
                            if (!isNaN(dValue)) {
                                event.target.value = dValue.toString();
                                if (dValue < min || dValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: event.target.value }, callback);
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_PHONE:
                            if (!event.target.value) {
                                this.setState({ [elementIdOrName]: "" });
                                return;
                            }

                            if (event.target.value.length > length) {
                                event.target.value = event.target.value.substring(0, length)
                            }
                            let cleanedStr: string = event.target.value.replace(/[^0-9()\-\s+]/, '');
                            let match = cleanedStr.match(/^(\d{3})(\d{3})(\d{4})$/);

                            if (match) {
                                cleanedStr = '(' + match[1] + ') ' + match[2] + '-' + match[3];
                            };
                            event.target.value = cleanedStr;
                            this.setState({ [elementIdOrName]: cleanedStr }, callback);
                            break;
                    }
                }
            } catch (error) {
                console.log("State(): error in fieldChangeHandler(): " + error)
            }
        }.bind(inParentComponent),



        /**
        * @function flightTypeChangeHandlerWithCallBack
        * @param ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        * @param type
        * @param length
        * @param min
        * @param max
        * @param callback
        * @returns void
        */
        flightTypeChangeHandlerWithCallBack: function (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string, length: number, min: number, max: number, callback: any): void {
            try {
                if (type != null) {
                    let elementIdOrName: string = "";

                    if (event.target.id) {
                        elementIdOrName = event.target.id;
                    } else if (event.target.name) {
                        elementIdOrName = event.target.name;
                    }
                    if (elementIdOrName.length == 0) return;


                    const intValue: number = parseInt(event.target.value);
                    if (!isNaN(intValue)) {
                        event.target.value = intValue.toString();
                        if (intValue < min || intValue > max) {
                            alert("Value should be between " + min + " and " + max + ".");
                            return;
                        }
                        if (intValue === Constants.FLIGHT_SEEING_TYPE) {
                            this.setState({
                                [elementIdOrName]: intValue,
                                landingSite: -1,
                                returnDate: null
                            }, callback);
                        } else {
                            this.setState({ [elementIdOrName]: intValue }, callback);
                        }
                    } else {
                        event.target.value = "";
                    }
                }
            } catch (error) {
                console.log("State(): error in fieldChangeHandler(): " + error)
            }
        }.bind(inParentComponent),


        /**
        * @function fieldChangeHandlerByName
        * @param ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        * @param type
        * @param length
        * @param min
        * @param max
        * @returns void
        */
        fieldChangeHandlerByName: function (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string, length: number, min: number, max: number): void {
            try {
                if (type != null) {
                    let elementIdOrName: string = "";
                    if (event.target.name) {
                        elementIdOrName = event.target.name;
                    }
                    if (elementIdOrName.length == 0) return;

                    switch (type) {
                        case Constants.TYPE_STRING:
                            if (length > 0) {
                                if (event.target.value.length > length) {
                                    event.target.value = event.target.value.substring(0, length)
                                }
                            }
                            this.setState({ [elementIdOrName]: event.target.value });
                            break;
                        case Constants.TYPE_INT:
                            const intValue: number = parseInt(event.target.value);
                            if (!isNaN(intValue)) {
                                event.target.value = intValue.toString();
                                if (intValue < min || intValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: intValue });
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_DECIMAL:
                            const dValue: number = parseFloat(event.target.value);
                            if (!isNaN(dValue)) {
                                event.target.value = dValue.toString();
                                if (dValue < min || dValue > max) {
                                    alert("Value should be between " + min + " and " + max + ".");
                                    return;
                                }
                                this.setState({ [elementIdOrName]: event.target.value });
                            } else {
                                event.target.value = "";
                            }
                            break;
                        case Constants.TYPE_PHONE:
                            if (!event.target.value) {
                                this.setState({ [elementIdOrName]: "" });
                                return;
                            }

                            if (event.target.value.length > length) {
                                event.target.value = event.target.value.substring(0, length)
                            }
                            let cleanedStr: string = event.target.value.replace(/[^0-9()\-\s+]/, '');
                            let match = cleanedStr.match(/^(\d{3})(\d{3})(\d{4})$/);

                            if (match) {
                                cleanedStr = '(' + match[1] + ') ' + match[2] + '-' + match[3];
                            };
                            event.target.value = cleanedStr;
                            this.setState({ [elementIdOrName]: cleanedStr });
                            break;
                    }
                }
            } catch (error) {
                console.log("State(): error in fieldChangeHandler(): " + error)
            }
        }.bind(inParentComponent),


        /**
        * @function digitsOnly
        * @param ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        * @returns void
        */
        digitsOnly: function (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
            try {
                let elementIdOrName: string = "";

                if (event.target.id) {
                    elementIdOrName = event.target.id;
                } else if (event.target.name) {
                    elementIdOrName = event.target.name;
                }
                if (elementIdOrName.length == 0) return;

                if (!event.target.value) {
                    this.setState({ [elementIdOrName]: "" });
                    return;
                }
                event.target.value = event.target.value.replace(/[^0-9]/, '');

                this.setState({ elementIdOrName: event.target.value });
            } catch (error) {
                console.log("State(): error in digitsOnly():" + error);
            }
        }.bind(inParentComponent),

        /**
        * @function setDepartureDate
        * @param Date
        * @param callback
        * @returns void
        */
        setDepartureDate: function (inDate: Date, callback: any): void {
            try {
                this.setState({ departureDate: inDate }, callback);
            } catch (error) {
                console.log("State: error setting departure date.")
            }
        }.bind(inParentComponent),


        /**
        * @function setReturnDate
        * @param Date
        * @param callback
        * @returns void
        */
        setReturnDate: function (inDate: Date, callback: any): void {
            try {
                this.setState({ returnDate: inDate }, callback);
            } catch (error) {
                console.log("State: error setting return date.")
            }
        }.bind(inParentComponent),



        /**
        * @function setBillingStateHelperText
        * @param event
        * @returns void
        */
        setBillingStateHelperText: function (event: any): void {
            try {
                this.setState({ billingState: event.target.textContent });
            } catch (error) {
                console.log("State: error setting billing state helper text.")
            }
        }.bind(inParentComponent),



        /**
        * @function setMailingStateHelperText
        * @param event
        * @returns void
        */
        setMailingStateHelperText: function (event: any): void {
            try {
                this.setState({ mailingState: event.target.textContent });
            } catch (error) {
                console.log("State: error setting return date.")
            }
        }.bind(inParentComponent),



        /**
        * @function setTax
        * @param number
        * @returns void
        */
        setTax: function (inTax: number): void {
            try {
                this.setState({ tax: inTax });
            } catch (error) {
                console.log("State: error setting return date.")
            }
        }.bind(inParentComponent),


        /**
        * @function setTotalCost
        * @param number
        * @returns void
        */
        setTotalCost: function (inTotalCost: number): void {
            try {
                this.setState({ tax: inTotalCost });
            } catch (error) {
                console.log("State: error setting return date.")
            }
        }.bind(inParentComponent),


        /**
        * @function setUseBillingAddress
        * @returns void
        * @param event
        */
        setUseBillingAddress: function (event: ChangeEvent<HTMLInputElement>): void {
            try {
                this.setState({ useBillingAddress: event.target.checked });
            } catch (error) {
                console.log("State: error setting departure date.")
            }
        }.bind(inParentComponent),


        /**
        * @function validateCheckoutInputFields
        * @returns string[] of error messages
        * @description returns error messages. Validation passes when there are no messages.
        */
        validateCheckoutInputFields: function (): string[] {
            let errorMsg: string[] = [];

            const validateUserName = () => {
                if (this.state.userName === null || this.state.userName === "") {
                    errorMsg.push("Full Name is missing.");
                }
            }

            const validateBillingAddress1 = () => {
                if (this.state.billingAddress1 === null || this.state.billingAddress1 === "") {
                    errorMsg.push("Billing Address1 missing.");
                }
            }


            const validateBillingAptSuite = () => {
                if (this.state.billingAptSuite === null || this.state.billingAptSuite === "") {
                    errorMsg.push("Billing AptSuite missing.");
                }
            }

            const validateBillingCity = () => {
                if (this.state.billingCity === null || this.state.billingCity === "") {
                    errorMsg.push("Billing City missing.");
                }
            }


            const validateBillingState = () => {
                if (this.state.billingState === null || this.state.billingState === "") {
                    errorMsg.push("Billing State missing.");
                }
            }


            const validateBillingZip = () => {
                if (this.state.billingZip === null || this.state.billingZip === "") {
                    errorMsg.push("Billing Postal Code missing.");
                }
            }


            const validateBillingCountry = () => {
                if (this.state.billingCountry === null || this.state.billingCountry === "") {
                    errorMsg.push("Billing Country missing.");
                }
                return true;
            }


            const validatePhoneNo = () => {
                if (this.state.phoneNo === null || this.state.phoneNo === "") {
                    errorMsg.push("Phone Number missing.");
                }
            }


            const validateMailingAddress1 = () => {
                if (!this.state.useBillingAddress && (this.state.mailingAddress1 === null || this.state.mailingAddress1 === "")) {
                    errorMsg.push("Mailing Address1 missing.");
                }
            }

            const validateMailingAptSuite = () => {
                if (this.state.mailingAptSuite === null || this.state.mailingAptSuite === "") {
                    errorMsg.push("Mailing AptSuite missing.");
                }
            }

            const validateMailingCity = () => {
                if (!this.state.useBillingAddress && (this.state.mailingCity === null || this.state.mailingCity === "")) {
                    errorMsg.push("Mailing City missing.");
                }
            }


            const validateMailingState = () => {
                if (!this.state.useBillingAddress && (this.state.mailingState === null || this.state.mailingState === "")) {
                    errorMsg.push("Mailing State missing.");
                }
            }


            const validateMailingZip = () => {
                if (!this.state.useBillingAddress && (this.state.mailingZip === null || this.state.mailingZip === "")) {
                    errorMsg.push("Mailing Postal Code missing.");
                }
            }


            const validateMailingCountry = () => {
                if (!this.state.useBillingAddress && (this.state.mailingCountry === null || this.state.mailingCountry === "")) {
                    errorMsg.push("Mailing Country missing.");
                }
            }


            const validateCardHolderName = () => {
                if (this.state.cardHolderName === null || this.state.cardHolderName === "") {
                    errorMsg.push("Cardholder Name missing.");
                }
            }

            const validateCreditCardNumber = () => {
                if (this.state.creditCardNumber === null || this.state.creditCardNumber === "") {
                    errorMsg.push("Credit Card Number missing.");
                }
            }


            const validateExpMonth = () => {
                if (this.state.expMonth === null || this.state.expMonth < 1) {
                    errorMsg.push("Expiration Month missing.");
                }
            }

            const validateExpYear = () => {
                if (this.state.expYear === null || this.state.expYear < 1) {
                    errorMsg.push("Expiration Year missing.");
                }
            }

            const validateCCV = () => {
                if (this.state.cCV === null || this.state.cCV === "") {
                    errorMsg.push("CCV missing.");
                }
            }
            
            //call all the validation functions.
            validateUserName();
            validateBillingAddress1();
            validateBillingCity();
            validateBillingState();
            validateBillingZip();
            validateBillingCountry();
            validatePhoneNo();
            validateMailingAddress1();
            validateMailingCity();
            validateMailingState();
            validateMailingZip();
            validateMailingCountry();
            //validateCardHolderName();
            //validateCreditCardNumber();
            //validateExpMonth();
            //validateExpYear();
            //validateCCV();
            
            return errorMsg;
        }.bind(inParentComponent),


        /**
        * @function validateSelectFlightInputFields
        * @returns string[] of validation error messages
        * @description if return error message array contains a message then validation has failed.
        */
        validateSelectFlightInputFields: function (): string[] {
            let errorMsg: string[] = [];
            const validateFlightType = () => {
                if (this.state.flightType === null) {
                    errorMsg.push("Flight Type missing.");
                }

                if (FlightTypeList.findIndex((item) => {
                    return item.code === this.state.flightType;
                }) === -1) {
                    errorMsg.push("Flight Type value not in list.");
                }
            }

            const validateLandingSite = () => {
                if (this.state.flightType === Constants.GLACIER_LANDING_TYPE) {
                    if (this.state.landingSite === null) {
                        errorMsg.push("Landing site missing.");
                    }

                    if (LandingSitesList.findIndex((item) => {
                        return item.code === this.state.landingSite;
                    }) === -1) {
                        errorMsg.push("Landing site not in list.");
                    }
                }
            }


            const validateDepartureDate = () => {
                if (this.state.departureDate === null) {
                    errorMsg.push("Departure date missing.");
                } else {
                    const departureDate: Date = new Date(this.state.departureDate);

                    if (isNaN(departureDate.getTime()) || departureDate.getFullYear() < 2021 || departureDate.getMonth() < 0 || departureDate.getMonth() > 11 || departureDate.getDate() < 1 || departureDate.getDate() > 31) {
                        errorMsg.push("Departure date not valid.");
                    }
                }
            }

            const validateReturnDate = () => {
                if (this.state.flightType === Constants.GLACIER_LANDING_TYPE) {
                    if (this.state.returnDate === null) {
                        errorMsg.push("Return date missing.");
                        return;
                    } else {
                        const returnDate: Date = new Date(this.state.returnDate);
                        if (isNaN(returnDate.getTime()) || returnDate.getFullYear() < 2021 || returnDate.getMonth() < 0 || returnDate.getMonth() > 11 || returnDate.getDate() < 1 || returnDate.getDate() > 31) {
                            errorMsg.push("Return date not valid.");
                            return;
                        }
                    }

                    if (this.state.departureDate && this.state.returnDate) {
                        try {
                            const returnDateStr: string = this.state.convertDateToStringYYYYMMDD(this.state.returnDate);
                            const departDateStr: string = this.state.convertDateToStringYYYYMMDD(this.state.departureDate);

                            const returnDate: Date = new Date(returnDateStr);
                            const departDate: Date = new Date(departDateStr);

                            if (departDate.valueOf() > returnDate.valueOf()) {
                                errorMsg.push("Return date must be on or after departure date.");
                            }
                        } catch (error) {

                        }
                    }
                }
            }

            const validateNumOfPassengers = () => {
                if (this.state.numOfPassengers === null) {
                    errorMsg.push("Number of passengers missing.");
                }
                if (NumberOfPassengersList.findIndex((item) => {
                    return item.code === this.state.numOfPassengers;
                }) === -1) {
                    errorMsg.push("Number of passengers not in list.");
                }
            }

            validateFlightType();
            validateLandingSite();
            validateDepartureDate();
            validateReturnDate();
            validateNumOfPassengers();

            return errorMsg;
        }.bind(inParentComponent),



        /**
        * @function updateTotalCostHandler
        * @returns Promise<void>
        * @description wrapper function used by the SelectFlight component. This is used
        *  to call the server for the Total Cost once all UI fields pass validation. This 
        *  function is passed to the fieldChangeHandlerWithCallBack() due to a delay in 
        *  reacts setState() function.
        */
        updateTotalCostHandler: async function (): Promise<void> {
            let errorMessages: string[] = this.state.validateSelectFlightInputFields();
            if (errorMessages.length > 0) {
                return;
            }
            const overlayElement: HTMLElement = document.querySelector(".message_layer");
            const messageElement: HTMLElement = document.querySelector("#loading_msg");
            if (overlayElement && messageElement) {
                overlayElement.classList.add("active");
                messageElement.classList.add("active");
                try {
                    await this.state.getFlightPrice();
                } catch (error) {
                    console.log("error calling getOrderTotalCost()");
                }
                overlayElement.classList.remove("active");
                messageElement.classList.remove("active");
            }

        }.bind(inParentComponent),



        /**
        * @function updateTotalCostWithPurchaseIntentHandler
        * @returns Promise<void>
        * @description wrapper function used by the SelectFlight component. This is used
        *  to call the server for the Total Cost once all UI fields pass validation. This 
        *  function is passed to the fieldChangeHandlerWithCallBack() due to a delay in 
        *  reacts setState() function.
        */
        updateTotalCostWithPurchaseIntentHandler: async function (): Promise<void> {
            let errorMessages: string[] = this.state.validateSelectFlightInputFields();
            if (errorMessages.length > 0) {
                return;
            }
            const overlayElement: HTMLElement = document.querySelector(".message_layer");
            const messageElement: HTMLElement = document.querySelector("#loading_msg");
            if (overlayElement && messageElement) {
                overlayElement.classList.add("active");
                messageElement.classList.add("active");
                try {
                    await this.state.getFlightPriceWithPurchaseIntent();
                } catch (error) {
                    console.log("error calling getFlightPriceWithPurchaseIntent()");
                }
                overlayElement.classList.remove("active");
                messageElement.classList.remove("active");
            }

        }.bind(inParentComponent),

                        

        /**
        * @function submitOrder
        * @returns Promise<void>
        * @description call server to process Order.
        */
        submitOrder: async function (): Promise<string> {
            const overlayElement: HTMLElement = document.querySelector(".message_layer");
            const messageElement: HTMLElement = document.querySelector("#processing_msg");
            let orderNo: string = "";
            if (overlayElement && messageElement) {
                overlayElement.classList.add("active");
                messageElement.classList.add("active");
                let flightDetailForPurchaseOrder: IFlightDetails = this.state.createFlightDetails();
                if (flightDetailForPurchaseOrder === null) return;

                let mAddress1: string = "";
                let mAptSuite: string = "";
                let mCity: string = "";
                let mState: string = "";
                let mZip: string = "";
                let mCountry: string = "";

                if (this.state.useBillingAddress === true) {
                    mAddress1 = this.state.billingAddress1;
                    mAptSuite = this.state.billingAptSuite;
                    mCity = this.state.billingCity;
                    mState = this.state.billingState;
                    mZip = this.state.billingZip;
                    mCountry = this.state.billingCountry;
                } else {
                    mAddress1 = this.state.mailingAddress1;
                    mAptSuite = this.state.mailingAptSuite;
                    mCity = this.state.mailingCity;
                    mState = this.state.mailingState;
                    mZip = this.state.mailingZip;
                    mCountry = this.state.mailingCountry;
                }


                try {
                    const webserviceHelper = new WebserviceHelper();
                    orderNo = await webserviceHelper.submitOrder({
                        flightDetail: flightDetailForPurchaseOrder,
                        userName: this.state.userName,
                        billingAddress1: this.state.billingAddress1,
                        billingAptSuite: this.state.billingAptSuite,
                        billingCity: this.state.billingCity,
                        billingState: this.state.billingState,
                        billingZip: this.state.billingZip,
                        billingCountry: this.state.billingCountry,
                        phoneNo: this.state.phoneNo,
                        mailToAddress1: mAddress1,
                        mailToAptSuite: mAptSuite,
                        mailToCity: mCity,
                        mailToState: mState,
                        mailToZip: mZip,
                        mailToCountry: mCountry,
                    });

                } catch (error) {
                    console.log("error calling submitOrder()");
                    try {
                        let errorMsgs: string = "";
                        if (error.response.data.errors) {
                            for (const errorArray of Object.values<string[]>(error.response.data.errors)) {
                                for (let j = 0; j < errorArray.length; j++) {
                                    errorMsgs += errorArray[j] + "\n";
                                }
                            }
                        }
                        if (errorMsgs.length > 0) {
                            alert(errorMsgs);
                        }
                    } catch (e) {
                        console.log("Did not find error.response.data.errors in error.")
                    }

                }
                overlayElement.classList.remove("active");
                messageElement.classList.remove("active");
                if (orderNo != null && orderNo != "") {
                    if (orderNo.padStart == undefined) {//value is getting deserialized to a number
                        orderNo = orderNo.toString().padStart(10, '0');
                    } else {
                        orderNo = orderNo.padStart(10, '0');
                    }
                    
                    this.setState({ orderNumber: orderNo });
                }
            }
            return orderNo;
        }.bind(inParentComponent),

        /**
        * @function getFlightPrice
        * @returns Promise<boolean>
        * @description calls server for total cost of order
        */
        getFlightPrice: async function (): Promise<void> {
            const webserviceHelper = new WebserviceHelper();

            try {
                let flightDetails: IFlightDetails = this.state.createFlightDetails();
                if (flightDetails === null) return;

                const updatedFlightPrice: IPricing = await webserviceHelper.getFlightPrice(flightDetails);
                if (updatedFlightPrice != null) {
                    if (updatedFlightPrice.total != null && updatedFlightPrice.total != undefined) {
                        this.setState({ totalCost: updatedFlightPrice.total });
                    }
                    if (updatedFlightPrice.subTotal != null && updatedFlightPrice.subTotal != undefined) {
                        this.setState({ subtotal: updatedFlightPrice.subTotal });
                    }
                    if (updatedFlightPrice.tax != null && updatedFlightPrice.tax != undefined) {
                        this.setState({ tax: updatedFlightPrice.tax });
                    }
                }
            } catch (error) {
                this.setState({ totalCost: 0 });
                console.log("Error getting flight price.");
            }
        }.bind(inParentComponent),



        /**
        * @function getFlightPriceWithPurchaseIntent
        * @returns Promise<boolean>
        * @description calls server for total cost of order and creates a Stripe Purchase Intent
        */
        getFlightPriceWithPurchaseIntent: async function (): Promise<void> {
            const webserviceHelper = new WebserviceHelper();

            try {
                let flightDetails: IFlightDetails = this.state.createFlightDetails();
                if (flightDetails === null) return;

                const purchaseIntentResponse: IPurchaseIntentResponse = await webserviceHelper.getFlightPriceWithPurchaseIntent(flightDetails);
                if (purchaseIntentResponse != null) {
                    this.setState({ clientSecret: purchaseIntentResponse.clientSecret });
                    const pricingDetails: IPricing = purchaseIntentResponse.pricing;
                    if (pricingDetails.total != null && pricingDetails.total != undefined) {
                        this.setState({ totalCost: pricingDetails.total });
                    }
                    if (pricingDetails.subTotal != null && pricingDetails.subTotal != undefined) {
                        this.setState({ subtotal: pricingDetails.subTotal });
                    }
                    if (pricingDetails.tax != null && pricingDetails.tax != undefined) {
                        this.setState({ tax: pricingDetails.tax });
                    }
                }
            } catch (error) {
                this.setState({ totalCost: 0 });
                console.log("Error getting flight price.");
            }
        }.bind(inParentComponent),



        createFlightDetails: function (): IFlightDetails {
            const departDateString: string = this.state.convertDateToStringYYYYMMDD(this.state.departureDate);
            const returnDateString: string = this.state.convertDateToStringYYYYMMDD(this.state.returnDate);
            let flightDetails: IFlightDetails = null;

            if (this.state.flightType == Constants.GLACIER_LANDING_TYPE) {
                flightDetails = {
                    flightType: this.state.flightType,
                    landingSite: this.state.landingSite,
                    departureDate: departDateString,
                    returnDate: returnDateString,
                    numberOfPassengers: this.state.numOfPassengers,
                }
            } else {
                flightDetails = {
                    flightType: this.state.flightType,
                    departureDate: departDateString,
                    numberOfPassengers: this.state.numOfPassengers,
                }
            }
            return flightDetails;
        }.bind(inParentComponent),



        /**
        * @function convertDateToStringForWebservice
        * @returns string
        * @description returns a newly formatted date for webservice calls to avoid formatting discrepencies
        *  between UI and server.
        */
        convertDateToStringYYYYMMDD: function (inDate: Date): string {
            if (inDate && !isNaN(inDate.getTime())) {
                return inDate.getFullYear() + "-" + (inDate.getMonth() + 1).toString().padStart(2, "0") + "-" + inDate.getDate().toString().padStart(2, "0");
            }
            return "";
        }.bind(inParentComponent),


        /**
        * @function convertDateToPrettyMonthDayYear
        * @returns string
        * @description returns a newly formatted date for webservice calls to avoid formatting discrepencies
        *  between UI and server.
        */
        convertDateToPrettyMonthDayYear: function (inDate: Date): string {
            if (inDate && !isNaN(inDate.getTime())) {
                const month: number = inDate.getMonth() + 1;
                let monthWord: string = "";
                switch (month) {
                    case 1:
                        monthWord = "January";
                        break;
                    case 2:
                        monthWord = "February";
                        break;
                    case 3:
                        monthWord = "March";
                        break;
                    case 4:
                        monthWord = "April";
                        break;
                    case 5:
                        monthWord = "May";
                        break;
                    case 6:
                        monthWord = "June";
                        break;
                    case 7:
                        monthWord = "July";
                        break;
                    case 8:
                        monthWord = "August";
                        break;
                    case 9:
                        monthWord = "September";
                        break;
                    case 10:
                        monthWord = "October";
                        break;
                    case 11:
                        monthWord = "November";
                        break;
                    case 12:
                        monthWord = "December";
                        break;
                    default:
                        monthWord = "";
                        break;
                }
                return monthWord + " " + inDate.getDate().toString().padStart(2, "0") + ", " + inDate.getFullYear();
            }
        }.bind(inParentComponent),

        /**
        * @function getAvailableDates
        * @returns Promise<void>
        * @description calls server for get a list of reserved dates for a specific month.
        *  User can only select unreserved dates when booking a flight.
        */
        getAvailableDates: async function (inDate: Date): Promise<void> {
            const webserviceHelper = new WebserviceHelper();
            const day: number = inDate.getDate();
            const month: number = inDate.getMonth() + 1;
            const year: number = inDate.getFullYear();

            try {
                const calendarDates: ICalendarDate[] = await webserviceHelper.getUnavailableDatesPerMonth({ day, month, year });
                if (calendarDates != null) {
                    const bookedDatesMapUpdated = new Map();
                    calendarDates.forEach((item) => {
                        const fullDate: string = item.year + "-" + item.month + "-" + item.day;
                        bookedDatesMapUpdated.set(fullDate, fullDate);
                    });
                    this.setState({ bookedDatesMap: bookedDatesMapUpdated });

                    //set bookedReturnDatesMap if null
                    if (this.state.bookedReturnDatesMap == null) {
                        const bookedDatesMapUpdated = new Map();
                        calendarDates.forEach((item) => {
                            const fullDate: string = item.year + "-" + item.month + "-" + item.day;
                            bookedDatesMapUpdated.set(fullDate, fullDate);
                        });
                        this.setState({ bookedReturnDatesMap: bookedDatesMapUpdated });
                    }
                }
            } catch (error) {
                console.log("error finding booked dates");
            }
        }.bind(inParentComponent),


        /**
        * @function getAvailableReturnDates
        * @returns Promise<void>
        * @description calls server for get a list of reserved date for a specific month.
        *  User can only select unreserved dates when booking a flight.
        */
        getAvailableReturnDates: async function (inDate: Date): Promise<void> {
            const webserviceHelper = new WebserviceHelper();
            const day: number = inDate.getDate();
            const month: number = inDate.getMonth() + 1;
            const year: number = inDate.getFullYear();

            try {
                const calendarDates: ICalendarDate[] = await webserviceHelper.getUnavailableDatesPerMonth({ day, month, year });
                if (calendarDates != null) {
                    const bookedDatesMapUpdated = new Map();
                    calendarDates.forEach((item) => {
                        const fullDate: string = item.year + "-" + item.month + "-" + item.day;
                        bookedDatesMapUpdated.set(fullDate, fullDate);
                    });
                    this.setState({ bookedReturnDatesMap: bookedDatesMapUpdated })
                }
            } catch (error) {
                console.log("error finding booked dates");
            }
        }.bind(inParentComponent)
    }
}

