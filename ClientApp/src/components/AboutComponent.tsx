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
                            This demonstration Single Page Web Application is premised on a fictional Air Taxi/Charter company
                            called Aurora Alaskan Air Charters that operates near the Mt. Wrangell/St. Elias National Park in
                            Alaska.  This web app was built with .Net Core/C# and a React/Typescript front-end. It utilizes Entity Framework ORM,
                            Restful API's, .Net Identity Server for User Management, JWT Tokens, OAuth2.0, and Stripe API for Credit Card Payment processing.
                            This web app is Containerized with Docker, runs on Linux OS, and is deployed to the MS Azure Cloud.
                            <br/><br/>
                            Feel free to explore and book an order for a flight using fake data. On the "Check Out" page there is a
                            fake Credit Card Number you can use.
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