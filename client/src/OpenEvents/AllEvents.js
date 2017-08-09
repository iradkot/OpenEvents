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
    }
  }

  componentWillMount() {
    console.log("allEvents user")
   // get events from DB
    axios.get(`/events`)
      .then(res => {
        const arrEvent = res.data;
        console.log(arrEvent);
        this.setState({ events: arrEvent });
      });
  }

  showUserEvents(){
    if(this.props.user.events_signed > 0) {
      return this.props.user.events_signed.map((event,index) => <ul>
        <li>{event}</li>
        </ul>
        )
    } else {
      return <div>
        
      <li className="profilePointer"><a  href="/addEven" role="button"><i className="fa fa-address-card-o" href="#" aria-hidden="true"></i>{' '}Crate Evnent</a></li>
      <li className="profilePointer">{' '}<a  href="#" role="button"><i className="fa fa-check-circle-o" aria-hidden="true"></i>{' '}Events Created</a></li>
      <li className="profilePointer"><a  href="#" role="button"><i className="fa fa-child" aria-hidden="true"></i>{' '}Events Joined</a></li>
      
      <h3 className="noEvTit">You have no events</h3>
      </div>
    }
  }

  render() {
    var className = this.props.user ? "userIn" : "noShow";
    return (
      <div>
        <div className="container ">
          <div className="row">
            {/* the profile container*/}
            <div className="col-md-3 profileContainer">
              <div className="profileHolder">
                <div  className="profilePointer">
                  < a href="#"><img src={this.props.user.myPic} className="prileImg"/>
                 {' '}<span className="profileName">{this.props.user.name}</span></a></div>
                <div >{this.showUserEvents()}</div>
              </div>
            </div>
            <div className="col-md-9">
              <Events user={this.props.user} events={this.state.events} />
            </div>
          </div>
        </div>
        {/* <Events events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;