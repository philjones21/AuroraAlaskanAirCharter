import React from "react";
import { Constants } from "../code/Constants";
import Header from "./HeaderComponent";
const mountainsImage = require("../images/Aurora4_mountains.svg");
const contactImage = require("../images/solo_plane.svg");



const Contact = () => {

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
                <Header activeMenuItem={Constants.CONTACT}/>
                <section className="more_info_main_content">
                    <section className="bannerText">
                        <h2>Contact</h2><br />
                        <h3></h3>
                        <article>
                            Software Engineer:&nbsp; Philip Jones
                        </article>
                        <article>
                            Email:&nbsp;
                            <a id="contacts_email" href="mailto:philjones21@yahoo.com">philjones21@yahoo.com</a>
                        </article>
                    </section>
                    <img className="more_info_image" src={contactImage} alt="" />
                </section>
                <img src={mountainsImage} className="more_info_mountains" ></img>
            </section>

        </section>
    )
}

export default Contact;