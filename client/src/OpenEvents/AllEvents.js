import React from 'react';
import Events from './Events';
import axios from 'axios';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [], user: localStorage.User
    }
  }
  componentWillMount() {
   axios.get(`/events`)
      .then(res => {
        const arrEvent = res.data;
       this.setState({events:arrEvent});
      });

  }
  
  render() {
      var className=this.state.user? "userIn": "noShow";
    return (
      <div>
        <h1>Our events:
          <div ><button type="button" className="btn btn-default" className={className}><Link to="/addEvent">Add event</Link></button></div>
        </h1>
        <Events events={this.state.events} />
        {/* <Events events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;