import React from "react";
import { Constants } from "../code/Constants";
import Header from "./HeaderComponent";
import { Link } from 'react-router-dom';
const mountainsImage = require("../images/Aurora4_mountains.svg");
const aboutImage = require("../images/window_view.jpg");


const About = () => {

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
                <Header activeMenuItem={Constants.ABOUT}/>
                <section className="more_info_main_content">
                    <section className="bannerText">
                        <h2>About</h2><br />
                        <h3>Aurora Alaskan Air Charter</h3>
                        <article>
                            This demonstration Web Application is premised on a fictitional Air Taxi/Charter company
                            called Aurora Alaskan Air Charters that operates near the Mt. Wrangell/St. Elias National Park in
                            Alaska.  This web app was built with a React front-end and .Net Core on the server side. It uses .Net Core
                            Identity for user management and also allows for Google account login using AuthO 2.0. It also utilizes
                            Stripe .Net for Credit Card Payment processing (using fake test data). This web app is Containerized with
                            Docker and deployed to the MS Azure Cloud.
                            <br/><br/>
                            Feel free to explore and book an order for a flight using fake data. When logging in, you will see
                            a demo user ID you can use and on the "Check Out" page there is a fake Credit Card Number you can use.
                        </article>
                        <Link to="/SelectFlight">Book a Tour</Link>
                    </section>
                    <img className="more_info_image" src={aboutImage} alt="" />
                </section>
                <img src={mountainsImage} className="more_info_mountains" ></img>
            </section>
        </section>
    )
}

export default About;