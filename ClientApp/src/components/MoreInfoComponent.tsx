import React from "react";
import { Constants } from "../code/Constants";
import Header from "./HeaderComponent";
import { Link } from 'react-router-dom';
const mountainsImage = require("../images/Aurora4_mountains.svg");



const MoreInfo = ({ type }) => {
    let moreInfoImage;
    let titleText = "";

    switch (type) {
        case Constants.MORE_INFO_FLIGHT_SEEING:
            moreInfoImage = require("../images/flight_seeing.jpg");
            titleText = "Flight Seeing";
            break;
        case Constants.MORE_INFO_GLACIAL_LANDING:
            moreInfoImage = require("../images/glacier_landing.jpg");
            titleText = "Glacier Landings";
            break;
        case Constants.MORE_INFO_TESTIMONIALS:
            moreInfoImage = require("../images/customer.jpg");
            titleText = "Testimonials";
            break;
    }
        

    const menuToggle = () => {
        const menu = document.querySelector("#navigation");
        if (menu != null && menu != undefined) {
            menu.classList.toggle("show");
        }
    }

    return (
        <section className="more_info">
            <section className="open">
                <section className="layer" />
                <section className="layer" />
            </section>

            <section className="more_info_content">
                <Header activeMenuItem={""}/>
                <section className="more_info_main_content">
                    <section className="bannerText">
                        <h2>{ titleText }</h2><br />
                        {type !== Constants.ABOUT && type !== Constants.CONTACT && <h3>Wrangell-St. Elias</h3>}
                        {type === Constants.MORE_INFO_FLIGHT_SEEING && <article>
                            <br />
                            Our flight-seeing tours are customized to the changing weather conditions to make sure you
                            get the best possible views under the safest conditions. Our air crews have years of mountain
                            flying experience and have extensive knowlege of the Wrangell-St. Elias region. We also give
                            you the option to cancel if you decide the weather conditions will not provide you with
                            the experience you expect.<br />
                        </article>}
                        {type === Constants.MORE_INFO_GLACIAL_LANDING && <article>
                            <br />
                            Aurora Alaskan Air Charters specializes in glacier landings.  Our experienced air crews have
                            made thousands of glacier landings and your safety is always a priority. Spend a day hiking on snow
                            covered mountains or for the more adventurous mountaineer types, we'll drop you off and pick you up
                            after you've completed your ascent.<br />
                        </article>}
                        {type === Constants.MORE_INFO_TESTIMONIALS && <article>
                            <br />
                            &quot;We took one of Aurora's flight seeing tours. It was an amazing experience.
                            We got absolutely amazing photos of the peaks and mountain glaciers. We'll never
                            forget this experience.&quot;
                            <br /><br />- Deborah, Seattle
                            <br /><br />&quot;Aurora Alaskan Air Charter took my group and I to the base of Mount
                            Wrangell. We set up base camp and spent the week climbing various peaks. I highly
                            recommend them to anyone looking to go climbing in the Wrangell-St. Elias park.&quot;
                            <br /><br />- Josh, Dallas <br />
                        </article>}
                        <Link to="/SelectFlight" >Book a Tour</Link>
                    </section>
                    <img className="more_info_image" src={moreInfoImage} alt="" />
                </section>
                <img src={mountainsImage} className="more_info_mountains" ></img>
            </section>
        </section>
    )
}

export default MoreInfo;