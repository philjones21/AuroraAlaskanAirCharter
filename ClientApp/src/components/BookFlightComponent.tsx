import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Link, Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FlightTypeList } from "../Lists/FlightTypeList";
import { NumberOfPassengersList } from "../Lists/NumberOfPassengersList";
import { LandingSitesList } from "../Lists/LandingSitesList";
import { Constants } from "../code/Constants";
import Messages from "./MessagesComponent";
import DatePicker from '@mui/lab/DatePicker';
import { createState } from "../code/State";
import AuthorizeService from "./api-authorization/AuthorizeService";



class BookFlight extends Component {

    public state = createState(this);

    checkDateAvailability = (date: Date) => {
        if (this.state.bookedDatesMap != null && this.state.bookedDatesMap.size > 0) {
            const year: number = date.getFullYear();
            const month: number = date.getMonth() + 1;
            const day: number = date.getDate();

            const key = year.toString() + "-" + month.toString() + "-" + day.toString();
            return (this.state.bookedDatesMap.has(key));
        }
    }

    checkReturnDateAvailability = (date: Date) => {
        if (this.state.bookedReturnDatesMap != null && this.state.bookedReturnDatesMap.size > 0) {
            const year: number = date.getFullYear();
            const month: number = date.getMonth() + 1;
            const day: number = date.getDate();

            const key = year.toString() + "-" + month.toString() + "-" + day.toString();
            return (this.state.bookedReturnDatesMap.has(key));
        }
    }

    validateFieldsHandler = () => {
        let errorMessages: string[] = this.state.validateSelectFlightInputFields();
        if (errorMessages.length > 0) {
            let msgStr: string = "Validation errors:\n";
            for (let i = 0; i < errorMessages.length; i++) {
                msgStr += errorMessages[i] + "\n";
            }
            alert(msgStr);
            this.state.setFieldByName("goToNextPage", false);
            return false;
        }
        sessionStorage.setItem('flightType', this.state.flightType.toString());
        sessionStorage.setItem('landingSite', this.state.landingSite.toString());
        sessionStorage.setItem('departureDate', this.state.departureDate);
        sessionStorage.setItem('returnDate', this.state.returnDate);
        sessionStorage.setItem('numOfPassengers', this.state.numOfPassengers.toString());
        this.state.setFieldByName("goToNextPage", true);
        return true;
    }

    componentDidMount() {
        this.state.getAvailableDates(new Date(Date.now()));

        //for some reason the page can sometimes load before Authentication
        //so this is some defensive code to try and prevent that.
        AuthorizeService.isAuthenticated().then((result) => {
            if (result === true) {
                this.state.setFieldByName("loggedIn", true);
            } else {
                this.state.setFieldByName("loggedIn", false);
            }
        }).catch((e: Error) => {
            console.log(e.message);
        });

    }

    render() {
        let flightType: string | number = this.state.flightType > -1 ? this.state.flightType : '';
        let landingSite: string | number = this.state.landingSite > -1 ? this.state.landingSite : '';
        let numOfPassengers: string | number = this.state.numOfPassengers > -1 ? this.state.numOfPassengers : '';

        return (


            <section>
                {this.state.loggedIn === true && <section className="message_layer"><Messages state={this.state} /></section>}
                {this.state.loggedIn === true && <section className="book_flight_group">
                    <h3>Book Flight</h3>
                    <div className="asteriskText"><br />(* required field)</div>
                    <section className="book_flight_box">
                        <section className="book_flight_column_group">

                            <div className="dropDown">
                                <InputLabel id="flight-type-label">Flight Type*</InputLabel>
                                <Select
                                    labelId="flight-type-label"
                                    fullWidth
                                    required
                                    label="Flight Type"
                                    value={flightType}
                                    id="flightType"
                                    name="flightType"
                                    onChange={(event) => { this.state.flightTypeChangeHandlerWithCallBack(event, Constants.TYPE_INT, null, 1, 99, this.state.updateTotalCostHandler); }}
                                >
                                    {FlightTypeList.map((item) => (
                                        <MenuItem key={item.code} value={item.code}>{item.display}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="dropDown">
                                {this.state.flightType === Constants.GLACIER_LANDING_TYPE && <section>
                                    <InputLabel id="landing-site-label">Destination Landing Site*</InputLabel>
                                    <Select

                                        labelId="landing-site-label"
                                        label="Destination Landing Site"
                                        value={landingSite}
                                        fullWidth
                                        id="landingSite"
                                        name="landingSite"
                                        onChange={(event) => {
                                            this.state.fieldChangeHandlerWithCallBack(event, Constants.TYPE_INT, null, 1, 99, this.state.updateTotalCostHandler);
                                        }}
                                    >
                                        {LandingSitesList.map((item) => (
                                            <MenuItem key={item.code} value={item.code}>{item.display}</MenuItem>
                                        ))}
                                    </Select>
                                </section>}
                            </div>
                        </section>
                        <section className="book_flight_column_group">
                            <InputLabel id="flight-dates-label">Flight Dates*</InputLabel>
                            <div className="calendar">

                                <DatePicker
                                    label="Flight Date"
                                    value={this.state.departureDate}
                                    onOpen={() => { this.state.getAvailableDates(new Date(Date.now())) }}
                                    onYearChange={(date) => { this.state.getAvailableDates(date) }}
                                    onMonthChange={(date) => { this.state.getAvailableDates(date) }}
                                    shouldDisableDate={(date) => this.checkDateAvailability(date)}
                                    onChange={(newValue) => {
                                        this.state.setDepartureDate(newValue, this.state.updateTotalCostHandler);
                                    }}

                                    renderInput={(params) => <div className="textBox"><TextField
                                        required
                                        {...params}
                                    /></div>}
                                />

                            </div>
                            <div className="calendar">
                                {this.state.flightType === Constants.GLACIER_LANDING_TYPE && <DatePicker

                                    label="Return Date"
                                    value={this.state.returnDate}
                                    onOpen={() => { this.state.getAvailableReturnDates(new Date(Date.now())) }}
                                    onYearChange={(date) => { this.state.getAvailableReturnDates(date) }}
                                    onMonthChange={(date) => { this.state.getAvailableReturnDates(date) }}
                                    shouldDisableDate={(date) => this.checkReturnDateAvailability(date)}
                                    onChange={(newValue) => {
                                        this.state.setReturnDate(newValue, this.state.updateTotalCostHandler);

                                    }}
                                    renderInput={(params) => <div className="textBox"><TextField
                                        required
                                        id="returnDate"
                                        {...params}
                                    /></div>}
                                />}
                            </div>
                        </section>
                        <section className="book_flight_column_group">
                            <div className="dropDown">
                                <InputLabel id="passenger-number-label">Number of Passengers*</InputLabel>
                                <Select

                                    labelId="passenger-number-label"
                                    label="Number of Passengers"
                                    value={numOfPassengers}
                                    size="small"
                                    required
                                    id="numOfPassengers"
                                    name="numOfPassengers"
                                    onChange={(event) => {
                                        this.state.fieldChangeHandlerWithCallBack(event, Constants.TYPE_INT, null, 1, 99, this.state.updateTotalCostHandler);
                                    }}
                                >
                                    {NumberOfPassengersList.map((item) => (
                                        <MenuItem key={item.code} value={item.code}>{item.display}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </section>
                    </section>
                    <section className="book_flight_box right">
                        <section className="book_flight_column_group">
                            <div className="textBox">
                                <TextField
                                    margin="normal"
                                    id="Total"
                                    label="Total"
                                    variant="outlined"
                                    size="small"
                                    disabled
                                    value={"$" + this.state.totalCost.toFixed(2)}
                                />
                            </div>
                            <div className="button1" onClick={() => { this.validateFieldsHandler(); }}>Continue</div>
                            {this.state.goToNextPage == true && <Redirect push to="/Checkout" />}
                        </section>
                    </section>
                </section>}
            </section>
        )
    }
}

export default BookFlight;