import React from "react";
import CheckoutForm from "./stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//import "./App.css";



const StripePayment = ({ state }) => {

    const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
    const clientSecret: string = state.clientSecret;

    const stripe: 'stripe' = "stripe";

    const appearance = {
        theme: stripe,
        variables: {
            colorPrimary: '#6382b1',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <section className="confirm_order_group">
            {state.clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm state={state} />
                </Elements>
            )}
            <section className="help_text">
                <article>
                    *Valid fake data for demo:
                    <br />
                    <br />
                    Card Number: 4242 4242 4242 4242
                    <br />
                    CVC: 123
                </article>
            </section>
        </section>
    )
}

export default StripePayment;