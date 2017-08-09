import React from 'react';
import Events from './Events';
import axios from 'axios';
import { Link } from 'react-router-dom';


// import FaBeer from 'react-icons/fa/beer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.events_joined = this.events_joined.bind(this);
    this.events_created = this.events_created.bind(this);
    this.showUserEvents = this.showUserEvents.bind(this);
    this.state = {
      events: [],
      user: this.props.user,
      user_events: []
    }
  }

  componentWillMount() {
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
  events_joined() {
    this.setState({user_events: [{title: '1'}, {title: '2'}]})
  }
  events_created() {
    this.setState({user_events: [{title: '3'}, {title: '4'}]})
  }

  showUserEvents() {
    if (this.state.user.events_signed > 0) {
      return this.this.state.user.events_signed.map((event, index) => <ul>
        <li>{event}</li>
      </ul>
      )
    } else {
      return <div>
        <Link to="/addEvent"><h5 className="profilePointer"><i className="fa fa-address-card-o" href="#" aria-hidden="true"></i>{' '}Crate Evnent</h5></Link>
        <div onChange={this.setGender.bind(this)}>
          <input type="radio" value="MALE" name="gender"/> Male
          <input type="radio" value="FEMALE" name="gender"/> Female
        </div>
            {/* <h3 className="noEvTit">You have no events</h3> */}
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
                    <div className="profilePointer">
                      < a href="#"><img src={this.state.user.myPic} className="prileImg" />
                        {' '}<span className="profileName">{this.state.user.name}</span></a></div>
                    <div >{this.showUserEvents()}</div>
                  </div>
                </div>
                <div className="col-md-9">
                  <Events events={this.state.events} />
                </div>
              </div>
            </div>

            {/* <Events events={this.state.events} /> */}
          </div>
          );
  }
}

export default App;