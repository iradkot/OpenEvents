import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
class EventBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num_of_participants: this.props.event.participants.length,
            participate: localStorage.length>0? (this.props.event.participants.indexOf(JSON.parse(localStorage.User).id) > -1? true: false):0
        }
    }
    joinEvent(event) {
        let user_id = JSON.parse(localStorage.User).id;
        axios.post(`/joinEvent/${event._id}/${user_id}`)
            .then(() => {
                let num_of_participants = this.state.num_of_participants+1;
                this.setState({ participate: true, num_of_participants: num_of_participants })
                window.location.replace("http://localhost:3000/");
            })
    }

    leaveEvent(event) {
        let user_id = JSON.parse(localStorage.User).id;
        axios.post(`/leaveEvent/${event._id}/${user_id}`)
            .then(() => {
                let num_of_participants = this.state.num_of_participants-1;
                this.setState({ participate: false, num_of_participants: num_of_participants });
                window.location.replace("http://localhost:3000/");
            })
    }


    render() {
        let { index,event } = this.props;
        return (
            <div className="col-md-6 event" key={index}>
                <Link to={'../event-page/' + event._id}>
                    <img className="img-responsive" src={event.pic} />
                    <h3>{event.title}</h3></Link><img width="30" className="numPeople" src="images/numPeople.png" /><span className="numPeople">{this.state.num_of_participants}</span>
                <div className="clearfix"></div>

                <p>{event.desc} </p>
                <img className="prileImg eventProPic" src={event.createdby.myPic} />{'    '}<span className="profileName">{event.createdby.name} Create the Event</span>
                <p><i className="fa fa-clock-o" aria-hidden="true"></i> - {event.date.substring(0, 10)} </p>
                <p><img width="18" className="" src="images/location.png" /> - {event.location.city},{event.location.street}-{event.location.num} {'    '} <a  target="_blank" href={'https://www.google.co.il/maps/place/'+event.location.street +',+'+event.location.city}> Get Direction</a></p>
                <p>
                    <button className={this.state.participate? "noShow" : "btnJoin"} onClick={() => { this.joinEvent(event) }}> join</button>
                    <button className={this.state.participate? "btnJoin" : "noShow"} onClick={() => { this.leaveEvent(event) }}> leave</button>
                    <button className="btnJoin facebook"> SHARE ON FACEBOOK</button>
                </p>
 
            </div>

        );

    }
}
export default EventBox;