import React from 'react';
import weatherApp from './weatherApp';
import Page404 from './weatherApp/common/404';
import About from './weatherApp/common/About';
import SignIn from './weatherApp/common/SignIn';
import EventPage from './weatherApp/EventPage';
import addEvent from './weatherApp/addEvent';
import allEvents from './weatherApp/allEvents';
import Register from './WeatherApp/common/RegisterForm';
import Profile from './weatherApp/Profile';

import { Switch, Route, Redirect } from 'react-router-dom';

const Routesss = () => (
    <div className="container">
        <Switch>
            <Route name="home" exact path='/' component={weatherApp} />
            <Route name="about" exact path='/about' component={About} />
            <Route name="login" exact path='/login' component={SignIn} />
            <Route name="profile" exact path='/profile/:user' component={Profile} />
            <Route exact path='/addEvent' component={addEvent} />
            <Route exact path='/allEvents' component={allEvents} />
            <Route path='/event-page/:eventid' component={EventPage} />
            <Route exact path='/register' component={Register} />
            <Route path="*" component={Page404} />
        </Switch>
    </div>
)

export default Routesss;