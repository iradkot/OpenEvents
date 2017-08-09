import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    
    ///here we decide how to desplay the events:
    renderEvents() {
        // console.log(this.props);
        return this.props.events.map((event, index) => <div className="col-md-6 event" key={index}>
            <Link to={'../event-page/' +event._id}>
                <img className="img-responsive" src={event.pic} />
                <h3>{event.title}</h3>
                <img className="prileImg eventProPic"  src={event.createdby.myPic} />{'    '}<span className="profileName">{event.createdby.name} Create the Event</span>
                <p>Date - {event.date.substring(0,10)} </p>
                <p>{event.desc} </p>
            </Link>
        </div>);
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