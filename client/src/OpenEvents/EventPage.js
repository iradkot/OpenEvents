import React from 'react';
import axios from 'axios';

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
        this.state = {
            eventObj: {},
            eventFull: false,
            participate: false,
            eventOwner: false,
            loading: false
        }
    }
    componentWillMount() {
        this.getEvent();

    }
    // tester 
    componentDidMount() {
        console.log(this.state.eventObj)
    }
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
            let user_id = user_obj._id;
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
        let class_join_btn = this.state.participate || this.state.eventOwner || this.state.eventFull || this.state.loading ? 'noShow' : "btn btn-large btn-block btn-primary";
        let class_leave_btn = this.state.participate || this.state.loading ? "btn btn-large btn-block btn-warning" : 'noShow';
        let class_delete_btn = this.state.eventOwner ? "btn btn-large btn-block btn-danger" : 'noShow';
        let class_loading = this.state.loading ? "" : "noShow";
        return (
            <div className="container">
                <div className="row">
                    And the event id is - {this.props.match.params.eventid},
                      and the object is - {this.state.eventObj.title}
                </div>
                <h1 className={class_loading}>Loading!</h1>
                <button type="button" onClick={this.joinEvent} className={class_join_btn}>Join Event!</button>
                <button type="button" onClick={this.leaveEvent} className={class_leave_btn}>Leave Event.</button>
                <button type="button" onClick={this.deleteEvent} className={class_delete_btn}>Delete Event</button>


            </div>
        );
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
                    let user_id = user_obj._id;
                    var eventFull;

                    if (that.state.eventObj.participants.indexOf(user_id) > -1) {
                        that.setState({ participate: true });
                    }
                    else if (that.state.eventObj.createdby === user_id) {
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