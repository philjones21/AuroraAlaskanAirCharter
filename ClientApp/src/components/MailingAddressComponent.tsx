import React, { useState } from "react";
import { StateList } from "../Lists/StateList";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Constants } from "../code/Constants";


const MailingAddress = ({ state }) => {

    return (
        <section className="confirm_order_group spaced">
            <div className="asteriskText"><br />(* required field)</div>
                <h3>Mailing Address</h3>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        onChange={(event) => state.setUseBillingAddress(event)}
                        checked={state.useBillingAddress}
                    />} label="Same as Billing" />
                </FormGroup>
            {state.useBillingAddress != true && <section>
                    <div className="textBox">
                        <TextField
                            margin="dense"
                            label="Street Address"
                            variant="outlined"
                        fullWidth
                        size="small"
                            required
                            value={state.mailingAddress1}
                            id="mailingAddress1"
                            name="mailingAddress1"
                            onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 30, 0, 0)}
                        />
                    </div>
                    <div className="textBox">
                        <TextField
                            margin="dense"
                        label="Apt/Suite"
                        size="small"
                            variant="outlined"
                            value={state.mailingAptSuite}
                            id="mailingAptSuite"
                        name="mailingAptSuite"
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
                            value={state.mailingCity}
                            id="mailingCity"
                        name="mailingCity"
                        className="confirm_order_textbox_medium"
                            onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 50, 0, 0)}
                        />
                    </div>
                    <div className="textBox state_drop_down" >
                        <Stack spacing={2} sx={{ width: 200 }}>
                            <Autocomplete
                                freeSolo
                                options={StateList.map((item) => item.code)}
                                onChange={(event) => state.setMailingStateHelperText(event)}
                                value={state.mailingState}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="State/Province"
                                    size="small"
                                    required
                                    value={state.mailingState}
                                    name="mailingState"
                                    className="confirm_order_textbox_medium"
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
                            value={state.mailingZip}
                            id="mailingZip"
                        name="mailingZip"
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
                            value={state.mailingCountry}
                            id="mailingCountry"
                        name="mailingCountry"
                        className="confirm_order_textbox_medium"
                            onChange={(event) => state.fieldChangeHandler(event, Constants.TYPE_STRING, 25, 0, 0)}
                        />
                    </div>
                </section>}
            </section>
    )
}

export default MailingAddress;