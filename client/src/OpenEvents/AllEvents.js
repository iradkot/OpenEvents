import React from 'react';
import Events from './Events';
import axios from 'axios';
import { Link } from 'react-router-dom';


// import FaBeer from 'react-icons/fa/beer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.showUserEvents = this.showUserEvents.bind(this);
    this.state = {
      events: [],
      user: this.props.user
    }
    console.log(this.props.user)
  }

  componentWillMount() {
    console.log("allEvents user")
    console.log(this.state.user)
    this.setState({ user: this.props.user })
    // getting the user from DB
    axios.get(`/profile`, {
      params: {
        _id: this.state.user.id
      }
    })
      .then(res => {
        var User = res.data;
        this.setState({ user: User });
      });
    // get events from DB
    axios.get(`/events`)
      .then(res => {
        const arrEvent = res.data;
        this.setState({ events: arrEvent });
      });

  }

  showUserEvents(){
    if(this.state.user.events_signed > 0) {
      return this.this.state.user.events_signed.map((event,index) => <ul>
        <li>{event}</li>
        </ul>
        )
    } else {
      return <div>
      <a href="#"><h5 className="profilePointer"><i className="fa fa-address-card-o" href="#" aria-hidden="true"></i>{' '}Crate Evnent</h5></a>
      <h3 className="noEvTit">You have no events</h3>
      </div>
    }
  }

  render() {
    var className = this.state.user ? "userIn" : "noShow";
    return (
      <div>
        <div className="container ">
          <div className="row">
            {/* the profile container*/}
            <div className="col-md-3 profileContainer">
              <div className="profileHolder">
                <div  className="profilePointer">
                  < a href="#"><img src={this.state.user.myPic} className="prileImg"/>
                 {' '}<span className="profileName">{this.state.user.name}</span></a></div>
                <div >{this.showUserEvents()}</div>
              </div>
            </div>
            <div className="col-md-9">
              <Events events={this.state.events} />
            </div>
          </div>
        </div>
        <h1>Our events:
          <div ><button type="button" className="btn btn-default" className={className}><Link to="/addEvent">Add event</Link></button></div>
        </h1>

        {/* <Events events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;