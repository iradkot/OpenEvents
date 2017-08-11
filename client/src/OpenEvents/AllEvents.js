import React from 'react';
import Events from './Events';
import axios from 'axios';
import { Link } from 'react-router-dom';


// import FaBeer from 'react-icons/fa/beer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.showUserEvents = this.showUserEvents.bind(this);
    this.userEvents = this.userEvents.bind(this);
    this.state = {
      events: [],
      nextevents:[],
      events_signed:[]
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
  componentWillReceiveProps(nextProps){
    this.setState({ events_signed: nextProps.user.events_signed });
    console.log('Up')
    this.forceUpdate()
  }
  componentDidMount(){
    setTimeout(this.userEvents, 1000);
      // this.userEvents()
  }

  userEvents() {
    if(this.state.events_signed!==undefined){
    let userArr = this.state.events_signed;
    console.log(userArr)
    let userEventsArr = getUserEvents(userArr, this.state.events);
    console.log(userEventsArr);
    this.setState({ nextevents: userEventsArr });
    }
    return <h1> hello </h1>
  }

  showUserEvents(){
    if(this.props.user.events_signed > 0) {
      return this.props.user.events_signed.map((event,index) => <ul>
        <li>{event}</li>
        </ul>
        )
    } else {
      if(localStorage.length>0){
      return <div>
      <li className="profilePointer"><Link to="/addEvent"><i className="fa fa-address-card-o" href="#" aria-hidden="true"></i>{' '}Create Event</Link></li>
      <li className="profilePointer">{' '}<a  href="#" role="button"><i className="fa fa-check-circle-o" aria-hidden="true"></i>{' '}Events Created</a></li>
      <li className="profilePointer eventsJoind"><a  href="#" role="button"><i className="fa fa-child" aria-hidden="true"></i>{' '}Events Joined</a></li>
     <hr/>
      <ul>{this.state.nextevents.map((item,index)=>{return(<li key={index} className="titleItem">{item.title}<hr className="hrTitle"/></li>)})}</ul>
      </div>
      }
      else {
        return <h5> You need to sign in to join\Create events </h5>
      }
    }
  }

  render() {
    console.log(this.state)
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
              <Events user={this.props.user} events={this.state.events} userEvent={this.userEvent} />
            </div>
          </div>
        </div>
        {/* <Events events={this.state.events} /> */}
      </div>
    );
  }
}

export default App;

function getUserEvents(userArr, eventsArr) {
  let userObjArr = [];
  for (var i = 0; i < userArr.length; i++) {
    for (var j = 0; j < eventsArr.length; j++) {
      if (userArr[i]===eventsArr[j]._id) {
        userObjArr.push(eventsArr[j]);
      }
      
    }
    
  }
  return userObjArr;
}