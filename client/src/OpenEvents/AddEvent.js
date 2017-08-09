import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class addEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title:"",
      desc: "",
      category: "",
      pic: "",
      participants_amount: 10,
      date: new Date("2015-03-25T12:00:00Z"),
      location: {
        city: "",
        street: "",
        num: "",
      },
      user: {_id: JSON.parse(localStorage.User).id}
    }
  }
  handleSubmit(event) {
     event.preventDefault();
    console.log("hi");
    console.log(this.state);
    axios.post(`/create_event/${this.state.user._id}`, {
      title:this.state.title,
      desc: this.state.desc,
      category: this.state.category,
      location: {
          city: this.state.location.city,
          street: this.state.location.street,
          num: this.state.location.num,
      },
      pic:  this.state.pic,
      participants_amount: this.state.participants_amount,
      date: this.state.date
    })
      .then(res => {
        const arrEvent = res.data;
        // console.log(res.data);
        window.location.replace("http://localhost:3000/");
      });
  }
 
   

  render() {
    return (
      <div className="container">
        <h2>Add your event!</h2>
        <form action="#" id="getAddEventForm" onSubmit={this.handleSubmit}>
          {/*Title  */}
          <div className="form-group">
            <label htmlFor="Title">Title :</label>
            <input type="text" required="true" className="form-control" id="title" placeholder="Enter Event Title" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
          </div>
          {/*category  */}
          <div className="form-group">
            <label htmlFor="Category">Category :</label>
            <input type="text" required="true" className="form-control" id="category" placeholder="Enter Event category" value={this.state.category} onChange={(event) => this.setState({category: event.target.value})}/>
          </div>
          {/*desc  */}
          <div className="form-group">
            <label htmlFor="desc">Enter description of the event:</label>
            <input type="text" required="true" className="form-control" id="desc" placeholder="Enter description" value={this.state.desc} onChange={(event) => this.setState({desc: event.target.value})} />
          </div>
          {/*pic url */}
          <div className="form-group">
            <label htmlFor="pic">Enter picture url for the event:</label>
            <input type="text" required="true" className="form-control" id="pic" placeholder="Enter picture url" value={this.state.pic} onChange={(event) => this.setState({pic: event.target.value})} />
          </div>
          {/*participant amount  */}
          <div className="form-group">
            <label htmlFor="participants_amount">Enter how many people can sign in for the event:</label>
            <input type="number" required="true" className="form-control" id="participants_amount" placeholder="Enter participants_amount" value={this.state.participants_amount} onChange={(event) => this.setState({participants_amount: event.target.value})} />
          </div>
          {/*Date  */}
          <div className="form-group">
            <label htmlFor="date">Enter the date for the event:</label>
            <input type="text" required="true" className="form-control" id="date" placeholder="Enter date" value={this.state.date} onChange={(event) => this.setState({date: event.target.value})} />
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
    );
  }
}

export default addEvent;