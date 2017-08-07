import React from 'react';
import Events from './Events';
import axios from 'axios';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }
  componentWillMount() {
   axios.get(`/events`)
      .then(res => {
        const arrEvent = res.data;
       this.setState({events:arrEvent});
        console.log(this.state.events[0]);
      });

  }
  
  render() {
    return (
      <div>
        <h1>Home Page:</h1>

      </div>
    );
  }
}

export default App;