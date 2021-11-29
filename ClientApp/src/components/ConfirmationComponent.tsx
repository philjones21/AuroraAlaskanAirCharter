import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { createState } from "../code/State";
import { showLayer, hideLayer } from "../code/SharedFunctions";
import Messages from "./MessagesComponent";
import Header from "./HeaderComponent";


class Confirmation extends React.Component {
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
            this.state.submitOrder();
        }
    }

    render() {
        return (
            <section className="checkout">
                <Header activeMenuItem={""} />
                <section className="check_out_container confirmation">
                    <section className="message_layer"><Messages state={this.state} /></section>

                    <section id="confirmation_group">
                        <h3>Order Complete</h3>
                        <br />
                        
                        <section className="book_flight_box">
                            {this.state.orderNumber !== "" && this.state.orderNumber !== "-1" && <article>
                                Thank you for your order!  You're order# is {this.state.orderNumber}.
                            </article>}
                            {this.state.orderNumber === "" && <article>
                                Oops!  Something went wrong and your order could not be processed.
                            </article>}
                            <br />
                            <br />
                            
                        </section>
                        <Link to="/"><div className="button1" >Home</div></Link>
                    </section>
                </section>
            </section>
        );
    }
}


export default Confirmation;