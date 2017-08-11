import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EventsBox from './EventsBox'
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    ///here we decide how to desplay the events:
    renderEvents() {
        // console.log(this.props);
        
        return this.props.events.map((event, index) =><EventsBox userEvents={this.props.userEvents} key={index} event={event} index={index}/>);
        
    }

    render() {

        return (

            <div className="row">
                {this.renderEvents()}
            </div>

        );

    }
}
export default Events;