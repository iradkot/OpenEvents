import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class addEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.today = this.today.bind(this);
    this.state = {
      title: "",
      desc: "",
      pic: "",
      participants_amount: 10,
      user: this.props.user,
      date: "",
      category : "shabat",
        location: {
          city:  "",
          street: "" ,
          num:  0 ,
        },
    }
  }
  // send the vent data to the server
  handleSubmit(event) {
    event.preventDefault();
    console.log("hi");
    console.log(this.state);
    axios.post(`/create_event`, {
      title: this.state.title,
      desc: this.state.desc,
      pic: this.state.pic,
      date: this.state.date,
      category: this.state.category,
        location: {
          city:  this.state.location.city,
          street:  this.state.location.street ,
          num:  this.state.location.num ,
        },
        participants_amount: this.state.participants_amount,
        createdby: this.props.user
    }).then(function(res){
      window.location.replace("http://localhost:3000/");
// redirect to the event page
    }).catch(function(err,res){
//if status code 401 - redirect login, else show error. 
    });
  }
// set the category with data from select from
handleChange(event) {
    this.setState({category: event.target.value});
  }

// cteate today date and set state of the date
  today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + dd + '-' + mm;
    this.setState({ date: today });
  }
  // use before the rendering
  componentWillMount() {
    this.today();
    // get user info fro DB
    // axios.get(`/profile`, {
    //  params:{ _id: this.state.user.id
    // }})
    //   .then(res => {
    //     var User = res.data;
    //     this.setState({ user: User });
    //   });
  }
 
  render() {
    console.log(this.props.user);
    return (
      <div className="container">
        <h2>Customize Event!</h2>
        <form action="#" id="getAddEventForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="Title">Event Title :</label>
            <input type="text" className="form-control" id="title" placeholder="Enter Event Title" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Describe your event:</label>
            <input type="text" className="form-control" id="desc" placeholder="Enter description" value={this.state.desc} onChange={(event) => this.setState({ desc: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="pic">Insert Picture:</label>
            <input type="pic" className="form-control" id="pic" placeholder="Enter picture url" value={this.state.pic} onChange={(event) => this.setState({ pic: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Event Date:</label>
            <input type="date" className="form-control"  value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="time">Enter the time of the event:</label>
            <input type="time" className="form-control" value={this.state.time} onChange={(event) => console.log(event)}/>
          </div> */}
            {/*participant amount  */}
          <div className="form-group">
            <label htmlFor="participants_amount">Event Capacity:</label>
            <input type="number" required="true" className="form-control" id="participants_amount" placeholder="Enter participants_amount" value={this.state.participants_amount} onChange={(event) => this.setState({participants_amount: event.target.value})} />
          </div>
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

          <h2>Address</h2>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" className="form-control" id="city" placeholder="Enter The City" value={this.state.location.city} onChange={(event) => { const location = Object.assign({}, this.state.location, { city: event.target.value }); this.setState({ location }); }} />

          </div>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input type="text" className="form-control" id="street" placeholder="Enter The Street" value={this.state.location.street} onChange={(event) => { const location = Object.assign({}, this.state.location, { street: event.target.value }); this.setState({ location }); }} />
          </div>
          <div className="form-group">
            <label htmlFor="numHouse">House Number:</label>
            <input type="number" className="form-control" id="numHouse" placeholder="Enter The Number Of The House" value={this.state.location.num} onChange={(event) => { const location = Object.assign({}, this.state.location, { num: event.target.value }); this.setState({ location }); }} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

export default addEvent;