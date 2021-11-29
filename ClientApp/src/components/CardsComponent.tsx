import React, { useEffect } from "react";
import VanillaTilt from 'vanilla-tilt';
import { Link } from 'react-router-dom';


const Cards = () => {

    //Call listener if you want to add some functionality to execute after tilting.
    const tiltListener = () => {
        return new Promise<boolean>((inResolve, inReject) => {
            const elements: any = document.querySelectorAll(".card");
            if (elements != null) {
                VanillaTilt.init(elements, {
                    max: 25,
                    speed: 400
                });
                elements.forEach((element) => {
                    element.addEventListener("tiltChange", () => {
                        inResolve(true);
                    });
                });
            } else {
                inReject(true);
            }
        });
    }

    const triggerMouseOverAnimation = (event) => {
        if (event === null) return;

        const overlayElement: Element | null = document.querySelector(".cards_overlay");
        if (overlayElement != null) {
            overlayElement.classList.remove("in-active");
            overlayElement.classList.add("active");
        }
        event.target.classList.add("active");
    }

    const addMouseOverListener = () => {
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("mouseover", triggerMouseOverAnimation);
        });
    }

    const triggerMouseOutAnimation = (event) => {
        const overlayElement: Element | null = document.querySelector(".cards_overlay");
        if (overlayElement != null) {
            overlayElement.classList.remove("active");
            overlayElement.classList.add("in-active");
        }
    }

    const addMouseOutListener = () => {
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("mouseout", triggerMouseOutAnimation);
        });

    }

    useEffect(() => {
        addMouseOutListener();
        addMouseOverListener();

        const elements: any = document.querySelectorAll(".card");
        if (elements != null) {
            VanillaTilt.init(elements, {
                max: 20,
                speed: 400,
                "max-glare": .3,
                glare: true
            });
        }
    });

    return (
        <section id="Cards">
            <section id="cards_overlay" className="cards_overlay" />
            <section id="cards_container">
                <svg id="cards_top_wave" version="1.1" viewBox="0 0 317.5 23.694">
                    <g>
                        <path d="m0-0.30231v21.206c3.4959-0.03239 8.8051-0.03927 18.962-0.03927 24.254 0 72.76-1.04e-4 105.83-2.205 33.073-2.2049 50.712-6.6143 82.462-8.8191 31.75-2.2048 77.611-2.205 104.95-2.205 2.0962 0 3.4063-0.00187 5.2911-0.00207v-7.9354z" fill="#1d1d47" />
                    </g>
                </svg>
                <section className="cards_content_container">
                    <section className="card" id="card1">
                        <section className="card_content">
                            <div className="cardsThumb" id="cardThumb1" />
                            <h3>Flight Seeing</h3>
                            <article>
                                Take a flight-seeing tour of the Wrangell-St. Elias Mountains.
                            </article>
                            <Link to="/MoreInfo/FlightSeeing">Read More</Link>
                        </section>
                    </section>
                    <section className="card" id="card2">
                        <section className="card_content">
                            <div className="cardsThumb" id="cardThumb2" />
                            <h3>Glacier Landing</h3>
                            <article>
                                Explore the mountains yourself by booking a glacier landing.
                            </article>
                            <Link to="/MoreInfo/GlacierLandings">Read More</Link>
                        </section>
                    </section>
                    <section className="card" id="card3">
                        <section className="card_content">
                            <div className="cardsThumb" id="cardThumb3" />
                            <h3>Customer Experiences</h3>
                            <article>
                                "Flying above the Wrangell-St. Elias mountains is breathtaking!"
                            </article>
                            <Link to="/MoreInfo/Testimonials">Read More</Link>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default Cards;