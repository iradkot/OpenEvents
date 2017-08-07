import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      first_name: "",
      last_name: "",
      age: "",
      aboutme: "",
      location: {
        city: "",
        street: "",
        num: "",
      },
      email: "",
      password: "",
      repeatpassword: ""
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("hi");
    console.log(this.state);
    if (this.state.password === this.state.repeatpassword) {
      axios.post(`/create_user`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        age: this.state.age,
        aboutme: this.state.aboutme,
        location: {
          city: this.state.location.city,
          street: this.state.location.street,
          num: this.state.location.num,
        },
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          
          var User = res.data;

          // Put the object into storage
          localStorage.setItem('User', JSON.stringify(User));

          // Retrieve the object from storage
          var retrievedObject = localStorage.getItem('User');

          console.log('retrievedObject: ', JSON.parse(retrievedObject));
          window.location.replace("http://localhost:3000/");
        });
    } else {
      alert("password not the same");
    }

  }



  render() {
    return (
      <div className="container">
        <h2>Registration</h2>
        <form action="#" id="getRegisterForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="FirstName">First Name :</label>
            <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" name="firstName" value={this.state.first_name} onChange={(event) => this.setState({ first_name: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="LastName">Last Name:</label>
            <input type="text" className="form-control" id="LastName" placeholder="Enter Last Name" value={this.state.last_name} onChange={(event) => this.setState({ last_name: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="age">age:</label>
            <input type="number" className="form-control" id="age" placeholder="Enter Age" value={this.state.age} onChange={(event) => this.setState({ age: event.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="aboutMe">About You:</label>
            <input type="text" className="form-control" id="aboutMe" placeholder="Enter Tell us about you" value={this.state.aboutme} onChange={(event) => this.setState({ aboutme: event.target.value })} />
          </div>
          <h2>Adress</h2>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" className="form-control" id="city" placeholder="Enter The City" value={this.state.location.city} onChange={(event) => { const location = Object.assign({}, this.state.location, { city: event.target.value }); this.setState({ location }); }} />

          </div>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input type="text" className="form-control" id="street" placeholder="Enter The Street" value={this.state.location.street} onChange={(event) => { const location = Object.assign({}, this.state.location, { street: event.target.value }); this.setState({ location }); }} />
          </div>
          <div className="form-group">
            <label htmlFor="numHouse">Number Of The House:</label>
            <input type="number" className="form-control" id="numHouse" placeholder="Enter The Number Of The House" value={this.state.location.num} onChange={(event) => { const location = Object.assign({}, this.state.location, { num: event.target.value }); this.setState({ location }); }} />
          </div>
          <h3> User Name & password</h3>
          <div className="form-group registerUserName">
            <input type="text" className="form-control" id="email" placeholder="Enter Your Email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
          </div>
          <div className="form-group ">
            <input type="password" className="form-control" id="newPassword" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
          </div>
          <div className="form-group ">
            <input type="password" className="form-control" id="passwordRepeat" placeholder="Repeat Password" value={this.state.repeatpassword} onChange={(event) => this.setState({ repeatpassword: event.target.value })} />
          </div>

          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;