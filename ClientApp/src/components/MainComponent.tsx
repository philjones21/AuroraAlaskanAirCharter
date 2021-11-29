import React from "react";
import Paralax from "./ParalaxComponent";
import Header from "./HeaderComponent";
import Welcome from "./WelcomeComponent";
import Cards from "./CardsComponent";
import Footer from "./FooterComponent";
import { Constants } from "../code/Constants";

const Main = () => {

    sessionStorage.clear();

    return (
        <section>
            <section className="open">
                <section className="layer" />
                <section className="layer" />
            </section>
            <section id="main_content">
                <Header activeMenuItem={Constants.HOME} />
                <Paralax/>
                <Welcome/>
                <Cards/>
                <Footer/>
            </section>
        </section>
    )
}

export default Main;