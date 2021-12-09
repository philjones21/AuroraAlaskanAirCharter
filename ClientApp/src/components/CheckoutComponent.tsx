import React from "react";
import BillingAddress from "./BillingAddressComponent";
import MailingAddress from "./MailingAddressComponent";
import OrderSummary from "./OrderSummaryComponent";
import StripePayment from "./StripePaymentComponent";
import Messages from "./MessagesComponent";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createState } from "../code/State";
import ShoppingHeader from "./ShoppingHeaderComponent";
import { Constants } from "../code/Constants";


class Checkout extends React.Component {

    public state = createState(this);

    componentDidMount() {
        const flightType = sessionStorage.getItem('flightType');
        if (flightType != null) this.state.setFieldByName("flightType", parseInt(flightType));
        const landingSite = sessionStorage.getItem('landingSite');
        if (landingSite != null) this.state.setFieldByName("landingSite", parseInt(landingSite));
        const departureDate = sessionStorage.getItem('departureDate');
        if (departureDate != null) this.state.setFieldByName("departureDate", new Date(departureDate));
        const returnDate = sessionStorage.getItem('returnDate');
        if (returnDate != null) this.state.setFieldByName("returnDate", new Date(returnDate));
        const numOfPassengers = sessionStorage.getItem('numOfPassengers');
        if (numOfPassengers != null) this.state.setFieldByName("numOfPassengers", parseInt(numOfPassengers));

        const userName = sessionStorage.getItem('userName');
        if (userName != null) this.state.setFieldByName("userName", userName);
        const billingAddress1 = sessionStorage.getItem('billingAddress1');
        if (billingAddress1 != null) this.state.setFieldByName("billingAddress1", billingAddress1);
        const billingAddress2 = sessionStorage.getItem('billingAddress2');
        if (billingAddress2 != null) this.state.setFieldByName("billingAddress2", billingAddress2);
        const billingAptSuite = sessionStorage.getItem('billingAptSuite');
        if (billingAptSuite != null) this.state.setFieldByName("billingAptSuite", billingAptSuite);
        const billingCity = sessionStorage.getItem('billingCity');
        if (billingCity != null) this.state.setFieldByName("billingCity", billingCity);
        const billingState = sessionStorage.getItem('billingState');
        if (billingState != null) this.state.setFieldByName("billingState", billingState);
        const billingZip = sessionStorage.getItem('billingZip');
        if (billingZip != null) this.state.setFieldByName("billingZip", billingZip);
        const billingCountry = sessionStorage.getItem('billingCountry');
        if (billingCountry != null) this.state.setFieldByName("billingCountry", billingCountry);
        const phoneNo = sessionStorage.getItem('phoneNo');
        if (phoneNo != null) this.state.setFieldByName("phoneNo", phoneNo);

        const mailingAddress1 = sessionStorage.getItem('mailingAddress1');
        if (mailingAddress1 != null) this.state.setFieldByName("mailingAddress1", mailingAddress1);
        const mailingAddress2 = sessionStorage.getItem('mailingAddress2');
        if (mailingAddress2 != null) this.state.setFieldByName("mailingAddress2", mailingAddress2);
        const mailingAptSuite = sessionStorage.getItem('mailingAptSuite');
        if (mailingAptSuite != null) this.state.setFieldByName("mailingAptSuite", mailingAptSuite);
        const mailingCity = sessionStorage.getItem('mailingCity');
        if (mailingCity != null) this.state.setFieldByName("mailingCity", mailingCity);
        const mailingState = sessionStorage.getItem('mailingState');
        if (mailingState != null) this.state.setFieldByName("mailingState", mailingState);
        const mailingZip = sessionStorage.getItem('mailingZip');
        if (mailingZip != null) this.state.setFieldByName("mailingZip", mailingZip);
        const mailingCountry = sessionStorage.getItem('mailingCountry');
        if (mailingCountry != null) this.state.setFieldByName("mailingCountry", mailingCountry);
        const useBillingAddress = sessionStorage.getItem('useBillingAddress');
        if (useBillingAddress != null) this.state.setFieldByName("useBillingAddress", Boolean(useBillingAddress === "true"));

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.flightType != prevState.flightType) {
            this.state.updateTotalCostWithPurchaseIntentHandler();
        }
    }

    render() {

        return (
            <section className="checkout">
                <ShoppingHeader step={Constants.PLACE_ORDER} />
                <section className="check_out_container order_confirm">
                    <section className="message_layer"><Messages state={this.state} /></section>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <BillingAddress state={this.state} />
                        <MailingAddress state={this.state} />
                        <OrderSummary state={this.state} />
                        {this.state.clientSecret != "" && <StripePayment state={this.state} />}
                    </LocalizationProvider>
                </section>
            </section>
        )
    }

}

export default Checkout;