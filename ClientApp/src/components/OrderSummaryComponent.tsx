import React, { useState } from "react";
import { Constants } from "../code/Constants";
import { LandingSitesList } from "../Lists/LandingSitesList";
import { Redirect } from 'react-router-dom';


const OrderSummary = ({ state }) => {
    const [orderComplete, setOrderComplete] = useState(false);
    let productDesc = "";
    let destination = "";
    let departureDateStr = state.convertDateToPrettyMonthDayYear(state.departureDate);
    let returnDateStr = state.convertDateToPrettyMonthDayYear(state.returnDate);

    if (state.flightType == Constants.FLIGHT_SEEING_TYPE) {
        productDesc = "Flight Seeing Tour";
    } else if (state.flightType == Constants.GLACIER_LANDING_TYPE) {
        productDesc = "Glacier Landing";

        for (let i = 0; i < LandingSitesList.length; i++) {
            if (LandingSitesList[i].code === state.landingSite) {
                destination = LandingSitesList[i].display;
                break;
            }
        }
    }

    const validateFieldsHandler = () => {
        let errorMessages: string[] = state.validateCheckoutInputFields();
        if (errorMessages.length > 0) {
            let msgStr: string = "Validation errors:\n";
            for (let i = 0; i < errorMessages.length; i++) {
                msgStr += errorMessages[i] + "\n";
            }
            alert(msgStr);
            setOrderComplete(false);
            return false;
        }
        //setOrderComplete(true);
        //window.scrollTo(0, 0);
        return true;
    }

    //<div className="button1" onClick={() => { if (validateFieldsHandler()) state.submitOrder(); }}>Submit Order</div>
    //{ orderComplete == true && <Redirect push to="/" /> }

    return (
        <section className="confirm_order_group">
            <h3>Order Summary</h3>
            <br />
            <section className="order_summary_sub_group">
                <section className="order_summary_row_group">
                    <label>Flight Type:</label>
                    <label>{productDesc}</label>
                </section>
                {state.flightType == Constants.GLACIER_LANDING_TYPE && <section className="order_summary_row_group">
                    <label>Destination:</label>
                    <label>{destination}</label>
                </section>}
                <section className="order_summary_row_group">
                    <label>Departure Date:</label>
                    <label>{departureDateStr}</label>
                </section>
                {state.flightType == Constants.GLACIER_LANDING_TYPE && <section className="order_summary_row_group">
                    <label>Return Date:</label>
                    <label>{returnDateStr}</label>
                </section>}
                <section className="order_summary_row_group">
                    <label>Passengers:</label>
                    <label>{state.numOfPassengers}</label>
                </section>
                <section className="order_summary_row_group">
                    <label>Subtotal:</label>
                    <label>${state.subtotal.toFixed(2)}</label>
                </section>
                <section className="order_summary_row_group">
                    <label>Tax</label>
                    <label>${state.tax.toFixed(2)}</label>
                </section>
                <section className="order_summary_row_group emphasis" id="total_cost">
                    <label>Total</label>
                    <label>${state.totalCost.toFixed(2)}</label>
                </section>
            </section>
            <br/>
            
        </section>
    )
}

export default OrderSummary;