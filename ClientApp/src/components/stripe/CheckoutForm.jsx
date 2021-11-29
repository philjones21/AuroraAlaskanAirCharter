import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { showLayer, hideLayer } from "../../code/SharedFunctions";
 

export default function CheckoutForm({ state }) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [goToNextPage, setGoToNextPage] = useState(false);

    const validateFieldsHandler = () => {
        let errorMessages = state.validateCheckoutInputFields();
        if (errorMessages.length > 0) {
            let msgStr = "Validation errors:\n";
            for (let i = 0; i < errorMessages.length; i++) {
                msgStr += errorMessages[i] + "\n";
            }
            alert(msgStr);
            //setOrderComplete(false);
            return false;
        }

        return true;
    }

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(async({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    hideLayer("#processing_msg");
                    setMessage("Payment succeeded!");                  
                    break;
                case "processing":
                    showLayer("#processing_msg");
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    hideLayer("#processing_msg");
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    hideLayer("#processing_msg");
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmitOrderButton = () => {
        if (!validateFieldsHandler()) return;
        showLayer("#processing_msg");
        sessionStorage.setItem('billingAddress1', state.billingAddress1);
        sessionStorage.setItem('billingAddress2', state.billingAddress2);
        sessionStorage.setItem('billingAptSuite', state.billingAptSuite);
        sessionStorage.setItem('billingCity', state.billingCity);
        sessionStorage.setItem('billingState', state.billingState);
        sessionStorage.setItem('billingZip', state.billingZip);
        sessionStorage.setItem('billingCountry', state.billingCountry);
        sessionStorage.setItem('phoneNo', state.phoneNo);
        sessionStorage.setItem('useBillingAddress', state.useBillingAddress.toString());
        sessionStorage.setItem('mailingAddress1', state.mailingAddress1);
        sessionStorage.setItem('mailingAddress2', state.mailingAddress2);
        sessionStorage.setItem('mailingAptSuite', state.mailingAptSuite);
        sessionStorage.setItem('mailingCity', state.mailingCity);
        sessionStorage.setItem('mailingState', state.mailingState);
        sessionStorage.setItem('mailingZip', state.mailingZip);
        sessionStorage.setItem('mailingCountry', state.mailingCountry);
        

        handleSubmit();
    }

    const handleSubmit = async (e) => {
        //e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "https://localhost:44341/Confirmation",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }
        hideLayer("#processing_msg");
        setIsLoading(false);
    };

    return (
        <section>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
            </form>
            <button
                className="stripe-button"
                disabled={isLoading || !stripe || !elements}
                id="submit"
                onClick={handleSubmitOrderButton}
            >
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Submit Order"}
                </span>
            </button>
            <br />
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            {goToNextPage == true && <Redirect to="/Confirmation" />}
        </section>
    );
}