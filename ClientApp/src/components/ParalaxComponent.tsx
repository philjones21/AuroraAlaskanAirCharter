import React, { useEffect } from "react";

const plane = require("../images/Aurora4_plane3.svg") as string;
const mountains = require("../images/Aurora4_mountains.svg") as string;
const trees = require("../images/Aurora4_trees.svg") as string;
const sky = require("../images/Aurora4_sky.svg") as string;

const Paralax = () => {

    function displayMainUI() {
        const mainOverlay: HTMLElement = document.querySelector("#main_overlay");
        const mainContent: HTMLElement = document.querySelector("#main_content");
        if (mainContent != null && mainOverlay != null) {
            mainContent.style.display = "block";
            mainOverlay.style.display = "none";
        }

    }

    const paralaxAnimate = () => {
        const planeElement = document.getElementById("plane_image");
        const mountainsElement = document.getElementById("mountains_image");
        const textElement = document.getElementById("paralax_1_text");
        const btnElement = document.getElementById("paralax_1_btn");
        const headerElement = document.querySelector("header");

        if (planeElement != null && mountainsElement != null && textElement != null &&
            btnElement != null && headerElement != null) {
            let scrollValue = window.scrollY;
            planeElement.style.left = (scrollValue * 1.25 * -1) + 'px';
            planeElement.style.top = (scrollValue * .25) + 'px';
            mountainsElement.style.top = (scrollValue * .4) + 'px';
            textElement.style.marginTop = (scrollValue * 1) + 'px';
            btnElement.style.marginTop = (scrollValue * 1) + 'px';
            headerElement.style.top = (scrollValue * .25 * -1) + 'px';
        }

    }

    useEffect(() => {
        window.addEventListener("scroll", paralaxAnimate);

        return () => {
            window.removeEventListener("scroll", paralaxAnimate);
        }
    });

    return (
        <section>
            {sky != null && plane != null && mountains != null && trees != null &&
                <section id="paralax_1_section">
                    <img id="trees_image" src={trees} alt="" />
                    <img id="plane_image" src={plane} alt="" />
                    <img id="mountains_image" src={mountains} alt="" />
                    <h2 id="paralax_1_text">Aurora Alaskan Air Charters</h2>
                    <a href="#Welcome" id="paralax_1_btn">Explore</a>
                </section>}
        </section >
    )
}

export default Paralax;