import React, { Component } from 'react';
import "normalize.css";
import "./css/main.css";

import './custom.css'
import BaseLayout from './components/BaseLayout';

export default class App extends Component {
  static displayName = App.name;
    /*
     * 
     * <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
     * 
     */
  render () {
    return (
      <BaseLayout/>
    );
  }
}
