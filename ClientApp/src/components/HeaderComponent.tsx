import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Constants } from "../code/Constants";
import AuthorizeService from "./api-authorization/AuthorizeService";
import LoginMenuAurora from "./api-authorization/LoginMenuAurora";
const logo = require("../images/Aurora_Logo_optimized.svg") as string;

const Header = ({ activeMenuItem }) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const menuToggle = () => {
        const menu = document.querySelector(".navigation_menu");
        if (menu != null && menu != undefined) {
            menu.classList.toggle("show");
        }
    }

    const handleClick = (event) => {
        try {
            document.querySelectorAll(".menu_item").forEach((menuItem) => {
                if (event.target.id != menuItem.id) {
                    menuItem.classList.remove("active");
                }
            });
        } catch (error) {

        }
    };

    const setActiveMenuItem = () => {
        try {
            switch (activeMenuItem) {
                case Constants.HOME:
                    document.querySelector("#home_menu_item").classList.add("active");
                    break;
                case Constants.ABOUT:
                    document.querySelector("#about_menu_item").classList.add("active");
                    break;
                case Constants.CONTACT:
                    document.querySelector("#contact_menu_item").classList.add("active");
                    break;
                case Constants.BOOK:
                    document.querySelector("#purchase_menu_item").classList.add("active");
                    break;
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        setActiveMenuItem();

        AuthorizeService.isAuthenticated().then((result) => {
            if (result === true) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }).catch((e: Error) => {
            console.log(e.message);
        });
    });

    //onClick={() => state.getAvailableDates(new Date(Date.now()))}

   return (
        <header>
           <Link to="/" ><img className="logo" src={ logo } alt=""/></Link>
            <i className="fa fa-bars x2" onClick={() => menuToggle()}></i>
            <section className="navigation_menu">
                <ul>
                   <li><Link id="home_menu_item" className="menu_item" to="/" onClick={(event) => { handleClick(event) }}>Home</Link></li>
                   <li><Link id="purchase_menu_item" className="menu_item" to="/SelectFlight" >Book</Link></li>
                   <li><Link id="about_menu_item" className="menu_item" to="/About">About</Link></li>
                   <li><Link id="contact_menu_item" className="menu_item" to="/Contact">Contact</Link></li>
                   <li><LoginMenuAurora/></li>
                  
                </ul>
                <i className="fa fa-times x2" onClick={() => menuToggle()}></i>
            </section>
        </header>
    )
}

export default Header;