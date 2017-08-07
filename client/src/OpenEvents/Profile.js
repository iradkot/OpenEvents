import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        age: 0,
        aboutme: '',
        myevents: []
      }
    }
    
    console.log(this.state.user);
  }

  componentWillMount() {
    var retrievedObject = localStorage.getItem('User');
    var User = JSON.parse(retrievedObject);
    this.setState({ user: User});
    var that = this;
    // 
     axios.get(`/profile`, {
     params:{ _id: this.props.match.params.user
    }})
      .then(res => {
        var User = res.data;
        that.setState({ user: User });
      });
    
  }

  render() {
   
    return (

      <div >
        <h1>Profile Page</h1>
        <ul>
          <li>User  first Name : {this.state.user.first_name}</li>
          <li>User last Name : {this.state.user.last_name}</li>
          <li>User age : {this.state.user.age}</li>
          <li>User about me : {this.state.user.aboutme}</li>
          {/*<li>User events : {this.state.user.myevents.length}</li> */}
        </ul>
      </div>


    );
  }
}

export default App;