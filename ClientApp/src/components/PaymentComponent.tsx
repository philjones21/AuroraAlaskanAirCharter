import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { MonthsList } from "../Lists/MonthsList";
import { YearsList } from "../Lists/YearsList";
import { Constants } from "../code/Constants";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



const Payment = ({ state }) => {
    let expMonth: string | number = state.expMonth > -1 ? state.expMonth : '';
    let expYear: string | number = state.expYear > -1 ? state.expYear : '';

    return (
        <section className="confirm_order_group">
            <div className="asteriskText"><br />(* required field)</div>
            <h3>Payment Info</h3>
            <div className="textBox">
                <TextField
                    margin="dense"
                    label="Cardholder Name"
                    variant="outlined"
                    type="text"
                    value={state.cardHolderName}
                    required
                    id="cardHolderName"
                    name="cardHolderName"
                    className="confirm_order_textbox_large"
                    onChange={(event) => {state.fieldChangeHandler(event, Constants.TYPE_STRING, 50, 0, 0); }}
                />
            </div>
            <div className="textBox">
                <TextField
                    margin="dense"
                    label="Card Number"
                    variant="outlined"
                    type="text"
                    value={state.creditCardNumber}
                    required
                    id="creditCardNumber"
                    name="creditCardNumber"
                    className="confirm_order_textbox_large"
                    onChange={(event) => { state.digitsOnly(event); state.fieldChangeHandler(event, Constants.TYPE_STRING, 16, 0, 0); }}
                />
            </div>
            <div className="dropDown">
                <InputLabel id="exp-months-label">Expiration Month*</InputLabel>
                <Select
                    labelId="exp-months-label"
                    label="Expiration Month*"
                    required
                    size="small"
                    value={expMonth}
                    id="expMonth"
                    name="expMonth"
                    className="confirm_order_textbox_small"
                    onChange={(event) => { state.fieldChangeHandler(event, Constants.TYPE_INT, 0, 1, 12); }}
                >
                    {MonthsList.map((item) => (
                        <MenuItem key={item.code} value={item.code}>{item.display}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className="dropDown">
                <InputLabel id="exp-year-label">Expiration Year*</InputLabel>
                <Select
                    labelId="exp-year-label"
                    label="Expiration Year*"
                    size="small"
                    value={expYear}
                    required
                    id="expYear"
                    name="expYear"
                    className="confirm_order_textbox_small"
                    onChange={(event) => { state.fieldChangeHandler(event, Constants.TYPE_INT, 0, 2021, 2099); }}
                >
                    {YearsList.map((item) => (
                        <MenuItem key={item.code} value={item.code}>{item.display}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className="textBox">
                <TextField
                    margin="normal"
                    label="CCV"
                    type="text"
                    variant="outlined"
                    size="small"
                    required
                    value={state.cCV}
                    id="cCV"
                    name="cCV"
                    className="confirm_order_textbox_small"
                    onChange={(event) => { state.digitsOnly(event); state.fieldChangeHandler(event, Constants.TYPE_STRING, 3, 0, 0); }}
                />
            </div>
        </section>
    )
}

export default Payment;