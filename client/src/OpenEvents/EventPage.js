import React from 'react';
import axios from 'axios';
import EditEvent from './EditEvent';

// const EventPage = ({ match }) => (
//   <div>
//     <h3>topicId Param: {match.params.eventid}</h3>
//     <h4>Path: {match.path}</h4>
//     <h4>URL: {match.url}</h4>
//     <h4>isExact: {`${match.isExact}`}</h4>
//   </div>)

class EventPage extends React.Component {
    constructor(props) {
        super(props)
        this.getEvent = this.getEvent.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.leaveEvent = this.leaveEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.state = {
            eventObj: {},
            editMode: false,
            eventFull: false,
            participate: false,
            eventOwner: false,
            loading: false
        }
    }
    componentWillMount() {
        this.getEvent();

    }

    editEvent() {
        this.setState({ editMode: true });
    }
    // tester 
    deleteEvent() {
        if (registerRef() && this.state.eventOwner) {
            axios.delete(`/deleteEvent/${this.state.eventObj._id}`)
                .then(() => {
                    window.location.replace("http://localhost:3000/");
                })
        }
    }
    joinEvent() {
        this.setState({ loading: true });
        if (registerRef()) {
            let user_obj = JSON.parse(localStorage.User);
            let user_id = user_obj.id;
            let event_id = this.state.eventObj._id;
            if (this.state.participate) {
                alert('You are already signed in to this event');
            }
            else if (this.state.eventOwner) {
                alert('It is not possible to join an event you created');
            }
            else if (this.state.eventFull) {
                alert("This event is full")
            }
            else {
                axios.post(`/joinEvent/${event_id}/${user_id}`)
                    .then(() => {
                        alert('you joined the event!');
                        this.setState({ participate: true, loading: false })
                    })
            }
        }
        else {
            this.setState({ loading: false });
        }
    }
    renderParticipants() {
        // console.log(this.props);
        if (this.state.eventObj.participants) {
            return this.state.eventObj.participants.map((guest, index) => <div className="col-md-6 guests" key={index}>
                <img className="img-responsive participantImg"  src={guest.myPic} />
                <h3>{guest.name}</h3>
            </div>);
        }
    }
    leaveEvent() {
        this.setState({ loading: true });
        if (registerRef()) {
            let user_obj = JSON.parse(localStorage.User);
            let user_id = user_obj._id;
            let event_id = this.state.eventObj._id;

            if (this.state.participate) {
                axios.post(`/leaveEvent/${event_id}/${user_id}`)
                    .then(() => {
                        alert('you left the event');
                        this.setState({ participate: false, loading: false });
                    })
            }
            else if (this.state.eventOwner) {
                alert('You cant join or leave an event you created, you can delete tho');
            }
            else {
                alert('you are not signed in this event');
            }
        }
    }
    render() {
        let class_join_btn = this.state.participate || this.state.eventOwner || this.state.eventFull || this.state.loading && !(localStorage.length > 0) ? 'noShow' : "btn btn-large btn-block btn-primary";
        let class_leave_btn = this.state.participate || this.state.loading && (localStorage.length > 0) ? "btn btn-large btn-block btn-warning" : 'noShow';
        let class_delete_btn = this.state.eventOwner ? "btn btn-large btn-block btn-danger" : 'noShow';
        let class_loading = this.state.loading ? "" : "noShow";

        if (this.state.editMode) {

            return (
                <div>
                    <EditEvent eventObj={this.state.eventObj} />
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <img className="img-responsive" src={this.state.eventObj.pic} alt={this.state.eventObj.title} />
                        <h1 className="text-center">{this.state.eventObj.title}</h1>
                        <h4>{this.state.eventObj.desc}</h4>
                        <span className="Participants"> Going to event<br/>{this.renderParticipants()}</span>
                        
                    </div>
                    <div> </div>
                    <h1 className={class_loading}>Loading!</h1>
                    <button type="button" onClick={this.joinEvent} className={class_join_btn}>Join Event!</button>
                    <button type="button" onClick={this.leaveEvent} className={class_leave_btn}>Leave Event.</button>
                    <button type="button" onClick={this.deleteEvent} className={class_delete_btn}>Delete Event</button>
                    <button type="button" onClick={this.editEvent}>Edit event</button>
                </div>
            );
        }
    }
    /// get the event to the event page + checks the user connection to the event
    getEvent() {
        var that = this;
        axios.get('/event/' + this.props.match.params.eventid)
            .then(res => {
                that.setState({ eventObj: res.data });
                //checks if event is full
                res.data.participants < res.data.participants_amount - 1 ? eventFull = false : eventFull = true;
                that.setState({ eventFull: eventFull });
                //if we have a user
                if (localStorage.User) {
                    //checks if user joined allready to the event
                    let user_obj = JSON.parse(localStorage.User);
                    let user_id = user_obj.id;
                    console.log('the event object:');
                    console.log(that.state.eventObj);

                    var eventFull;
                    for (let i = 0; i < that.state.eventObj.participants.length; i++) {
                        if (that.state.eventObj.participants[i]._id === user_id) {
                            that.setState({ participate: true });
                        }
                    }
                    if (that.state.eventObj.createdby._id === user_id) {
                        that.setState({ eventOwner: true });
                    }
                }
            })
    }
}
export default EventPage;

function hasToBeYours() {

}
// cheking if the user conected true the localstorage
function registerRef() {
    if (localStorage.length > 0) {
        return true;
    }
    else {
        alert("Hi! you neet to sign in or register to do that.");
        return false;
    }
}