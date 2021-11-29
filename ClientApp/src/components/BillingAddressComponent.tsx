import React from "react";
import { StateList } from "../Lists/StateList";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Constants } from "../code/Constants";


const BillingAddress = ({ state }) => {

    return (
        <section className="confirm_order_group spaced">
            <div className="asteriskText"><br />(* required field)</div>
            <h3>Billing Address</h3>
            <div className="textBox">
                <TextField
                    margin="dense"
                    label="Street Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    value={state.billingAddress1}
                    id="billingAddress1"
                    name="billingAddress1"
                    className="confirm_order_textbox_large"
                    onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 30, 0, 0)}
                />
            </div>
            <div className="textBox">
                <TextField
                    margin="dense"
                    label="Apt/Suite"
                    variant="outlined"
                    size="small"
                    value={state.billingAptSuite}
                    id="billingAptSuite"
                    name="billingAptSuite"
                    className="confirm_order_textbox_medium"
                    onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 15, 0, 0)}
                />
            </div>

                <div className="textBox">
                    <TextField
                        margin="dense"
                        label="City/Town"
                        variant="outlined"
                        size="small"
                        required
                        value={state.billingCity}
                        id="billingCity"
                        name="billingCity"
                        className="confirm_order_textbox_medium"
                        onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 50, 0, 0)}
                    />
                </div>
                <div className="textBox state_drop_down">
                    <Stack spacing={2} sx={{ width: 200 }}>
                        <Autocomplete className="AutoComplete" sx={{ fontSize: 6 }}
                            freeSolo
                            options={StateList.map((item) => item.code)}
                            onChange={(event) => state.setBillingStateHelperText(event)}
                            value={state.billingState}
                            renderInput={(params) => <TextField
                                {...params}
                                label="State"
                                size="small"
                                required
                                value={state.billingState}
                                name="billingState"
                                onChange={(event) => state.fieldChangeHandlerByName(event, Constants.TYPE_STRING, 25, 0, 0)}
                            />}
                        />
                    </Stack>
                </div>
                <div className="textBox">
                    <TextField
                        margin="normal"
                        label="Zip Code"
                        type="text"
                        variant="outlined"
                        size="small"
                        required
                        value={state.billingZip}
                        id="billingZip"
                        name="billingZip"
                        className="confirm_order_textbox_medium"
                        onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 15, 0, 0)}
                    />
                </div>
                <div className="textBox">
                    <TextField
                        margin="normal"
                        label="Country"
                        variant="outlined"
                        size="small"
                        required
                        placeholder="USA"
                        value={state.billingCountry}
                        id="billingCountry"
                        name="billingCountry"
                        className="confirm_order_textbox_medium"
                        onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 25, 0, 0)}
                    />
                </div>
            <div className="textBox">
                <TextField
                    margin="normal"
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    required
                    value={state.phoneNo}
                    id="phoneNo"
                    name="phoneNo"
                    className="confirm_order_textbox_medium"
                    onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_PHONE, 25, null, null)}
                />
            </div>
        </section>
    )
}

export default BillingAddress;