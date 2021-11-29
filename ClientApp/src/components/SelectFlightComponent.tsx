import React, { useState, useEffect } from "react";
import BookFlight from "./BookFlightComponent";
import ShoppingHeader from "./ShoppingHeaderComponent";
import { Constants } from "../code/Constants";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { preLoadImages } from "../code/SharedFunctions"

const SelectFlight = () => {
    //const [imagesLoaded, setImagesLoaded] = useState(false);
    //const images: string[] = ["../images/Cart_SelectFlight_opt.svg", "../images/Cart_PlaceOrder_opt.svg"];


    sessionStorage.clear();
    return (
        <section className="checkout">
            <ShoppingHeader step={Constants.SELECT_FLIGHT} />
            <section className="check_out_container book_flight">

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <BookFlight />
                </LocalizationProvider>
            </section>
        </section >
    )
}

export default SelectFlight;