import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user
    }
    
    console.log(props.user);
  }

  componentWillMount() {
     axios.get(`/profile`, {
     params:{ _id: this.state.user.id
    }})
      .then(res => {
        var User = res.data;
        this.setState({ user: User });
      });
    
  }

  render() {
   
    return (

      <div >
        <h1>Profile Page</h1>
        <ul>
          <li>User   Name : {this.state.user.name}</li>
          <li>User img  : <img src={this.state.user.myPic} /> </li>
          <li>User email : {this.state.user.email}</li>
          <li>User logins : {this.state.user.loginCount}</li>
          <li>User events : {this.state.user.events_signed}</li> 
        </ul>
      </div>


    );
  }
}

export default App;