import React from 'react';
import axios from 'axios';

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.sendEdit = this.sendEdit.bind(this);
        this.state = {
            event_id: this.props.eventObj._id,
            title: this.props.eventObj.title,
            desc: this.props.eventObj.desc,
            category: this.props.eventObj.category,
            pic: this.props.eventObj.pic,
            participants_amount: this.props.eventObj.participants_amount,
            date: this.props.eventObj.date,
            location: this.props.eventObj.location
        }
    }
    sendEdit() {
        // let user_obj = JSON.parse(localStorage.User)
        axios.put(`/edit_event/${this.state.event_id}`, {
            title: this.state.title,
            desc: this.state.desc,
            category: this.state.category,
            location: {
                city: this.state.location.city,
                street: this.state.location.street,
                num: this.state.location.num,
            },
            pic: this.state.pic,
            participants_amount: this.state.participants_amount,
            date: this.state.date
        })
            .then(res => {

                window.location.replace(`http://localhost:3000/event-page/${this.state.event_id}`);
            })
    }

    render() {
        return (
            <div>
                <h2>Add your event!</h2>
                <form action="#" id="getAddEventForm" onSubmit={this.sendEdit}>
                    {/*Title  */}
                    <div className="form-group">
                        <label htmlFor="Title">Title :</label>
                        <input type="text" required="true" className="form-control" id="title" placeholder="Enter Event Title" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                    </div>
                    {/*category  */}
                    {/*<div className="form-group">
                        <label htmlFor="Category">Category :</label>
                        <input type="text" required="true" className="form-control" id="category" placeholder="Enter Event category" value={this.state.category} onChange={(event) => this.setState({ category: event.target.value })} />
                    </div>*/}
                    <div className="form-group">
                        <label>
                            Event Category:
                            <select value={this.state.value} onChange={this.handleChange}>
                            <option value="shabat">Shabbat</option>
                            <option value="sport">Sport</option>
                            <option value="art">Art</option>
                            <option value="meetUp">Meet-Up</option>
                            </select>
                        </label>
                    </div>
                    {/*desc  */}
                    <div className="form-group">
                        <label htmlFor="desc">Enter description of the event:</label>
                        <input type="text" required="true" className="form-control" id="desc" placeholder="Enter description" value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} />
                    </div>
                    {/*pic url */}
                    <div className="form-group">
                        <label htmlFor="pic">Enter picture url for the event:</label>
                        <input type="text" required="true" className="form-control" id="pic" placeholder="Enter picture url" value={this.state.pic} onChange={(event) => this.setState({ pic: event.target.value })} />
                    </div>
                    {/*participant amount  */}
                    <div className="form-group">
                        <label htmlFor="participants_amount">Enter how many people can sign in for the event:</label>
                        <input type="number" required="true" className="form-control" id="participants_amount" placeholder="Enter participants_amount" value={this.state.participants_amount} onChange={(event) => this.setState({ participants_amount: event.target.value })} />
                    </div>
                    {/*Date  */}
                    <div className="form-group">
                        <label htmlFor="date">Enter the date for the event:</label>
                        <input type="text" required="true" className="form-control" id="date" placeholder="Enter date" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
                    </div>
                    {/*location  */}
                    <h2>Adress</h2>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" required="true" className="form-control" id="city" placeholder="Enter The City" value={this.state.location.city} onChange={(event) => { const location = Object.assign({}, this.state.location, { city: event.target.value }); this.setState({ location }); }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="street">Street:</label>
                        <input type="text" required="true" className="form-control" id="street" placeholder="Enter The Street" value={this.state.location.street} onChange={(event) => { const location = Object.assign({}, this.state.location, { street: event.target.value }); this.setState({ location }); }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numHouse">Number Of The House:</label>
                        <input type="number" required="true" className="form-control" id="numHouse" placeholder="Enter The Number Of The House" value={this.state.location.num} onChange={(event) => { const location = Object.assign({}, this.state.location, { num: event.target.value }); this.setState({ location }); }} />
                    </div>
                    <button type="submit" required="true" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditEvent;
