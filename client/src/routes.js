import React from 'react';
import OpenEvents from './OpenEvents';
import Page404 from './OpenEvents/common/404';
import About from './OpenEvents/common/About';
import SignIn from './OpenEvents/common/SignIn';
import EventPage from './OpenEvents/EventPage';
import addEvent from './OpenEvents/addEvent';
import allEvents from './OpenEvents/allEvents';
import Register from './OpenEvents/common/RegisterForm';
import Profile from './OpenEvents/Profile';
import Authentication from './OpenEvents/Athentication';
import { Switch, Route, Redirect } from 'react-router-dom';




const Routesss = (props) => (
     
    <div className="container">
        <Switch>
            <Route name="home" exact path='/' component={allEvents} />
            <Route name="authentication"  path='/authorization/:token/:name/:id' 
            render={(routesProps)=> <Authentication updateUser={props.updateUser}  {...routesProps}/>}
              />
            <Route name="about" exact path='/about' component={About} />
            <Route name="login" exact path='/login' component={SignIn} />
            <Route name="profile" exact path='/profile/:username' component={Profile} />
            <Route exact path='/addEvent' component={addEvent} />
            <Route path='/event-page/:eventid' component={EventPage} />
            <Route exact path='/register' component={Register} />
            <Route path="*" component={Page404} />
        </Switch>
    </div>
)

export default Routesss;