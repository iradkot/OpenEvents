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
                <h3>{event.title}</h3></Link><img width="30" className="numPeople" src="images/numPeople.png"/><span className="numPeople">{event.participants.length}</span>
                <div className="clearfix"></div>
                
                <p>{event.desc} </p>
                <img className="prileImg eventProPic"  src={event.createdby.myPic} />{'    '}<span className="profileName">{event.createdby.name} Create the Event</span>
                <p><i className="fa fa-clock-o" aria-hidden="true"></i> - {event.date.substring(0,10)} </p>
                <p><img width="18" className="" src="images/location.png"/> - {event.location.city},{event.location.street}-{event.location.num} {'    '} <a href="#"> Get Direction</a></p>
                <p><button className="btnJoin"> join</button> <button className="btnJoin facebook"> SHARE ON FACEBOOK</button></p>
            
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