import React from 'react';
import { Redirect } from 'react-router-dom';
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.showEvent = this.showEvent.bind(this);
        this.state = {
            redirect: false,
            chosenEvent: 0
        }
    }
    showEvent(event) {
        this.setState({redirect: true, chosenEvent: event._id })
    }
    ///here we decide how to desplay the events:
    renderEvents() {
        // console.log(this.props);
        return this.props.events.map((event, index) => <div className="col-md-4" key={index}>
            <div className="row">
                <img className="img-responsive"src={event.pic}/>
                <h3>{event.title}</h3><button type="button" onClick={this.showEvent.bind(null, event)}>View Event</button>
            </div>
            {JSON.stringify(event)}
        </div>);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'../event-page/' + this.state.chosenEvent}/>;
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderEvents()}
                    </div>
                </div>
            );
        }
    }
}
export default Events;