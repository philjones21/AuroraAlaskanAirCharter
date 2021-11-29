import React from "react";
const mountStElias = require("../images/Aurora_mt-st-elias_tn.jpg") as string;


const WelcomeComponent = () => {
    return (
        <section id="Welcome">
            <section id="content_welcome">
                <h3>Welcome to</h3>
                <h2>Aurora Alaskan Air Charters</h2>
                <section>
                    <div><img id="st_elias_tn1" src={mountStElias} alt="Mt. Elias"/></div>
                    <article><br/>Come and join us on an adventure in the Wrangell-St. Elias mountain ranges of Alaska.  We specialize in fight seeing tours and glacial landings. The Wrangell-St. Elias National Park covers an area of 13.2 million acres with peaks rising as high as 18,008 ft. The park is the same size as Yellowstone National Park, Yosemite National Park, and Switzerland combined! At Aurora Alaskan Air Charters we provide our customers with a safe flying experience and highly trained air crew. Come and book a flight with us today for the adventure of a lifetime!</article>
                </section>
            </section>
        </section>
    )
}

export default WelcomeComponent;