import React from "react";
import { createState } from "../code/State";
import Main from "./MainComponent";
import SelectFlight from "./SelectFlightComponent";
import MoreInfo from "./MoreInfoComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Confirmation from "./ConfirmationComponent";
import Checkout from "./CheckoutComponent";
import { BrowserRouter, Switch, Link } from 'react-router-dom';
import { Route } from 'react-router';
import { Constants } from "../code/Constants";
import AuthorizeRoute from './api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';

class BaseLayout extends React.Component {

    private baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    
    render() {

        return (
            <section className="app_container">
                <BrowserRouter basename={this.baseUrl}>
                    <Switch>
                        <Route exact path='/'>
                            <Main/>
                        </Route>
                        <Route exact path='/MoreInfo/FlightSeeing'>
                            <MoreInfo type={Constants.MORE_INFO_FLIGHT_SEEING} />
                        </Route>
                        <Route exact path='/MoreInfo/GlacierLandings'>
                            <MoreInfo type={Constants.MORE_INFO_GLACIAL_LANDING} />
                        </Route>
                        <Route exact path='/MoreInfo/Testimonials'>
                            <MoreInfo type={Constants.MORE_INFO_TESTIMONIALS} />
                        </Route>
                        <Route exact path='/About'>
                            <About/>
                        </Route>
                        <Route exact path='/Contact'>
                            <Contact />
                        </Route>

                        <AuthorizeRoute exact path='/SelectFlight' component={SelectFlight} />

                        <AuthorizeRoute exact path='/Checkout' component={Checkout} />

                        <AuthorizeRoute exact path='/Confirmation' component={Confirmation} />

                        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
                    </Switch>
                </BrowserRouter>
            </section>
        )
    }
}

export default BaseLayout;

