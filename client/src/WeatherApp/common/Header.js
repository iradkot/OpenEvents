import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      user: {}
    }
  }
  componentWillMount() {
    if(localStorage.length>0){
    let user1 = JSON.parse(localStorage.User);
    this.setState({ user: user1});
    }
  }
  logout() {
    localStorage.clear();
    window.location.replace("http://localhost:3000/");
  }
  
  render() {
    var className=localStorage.length>0? "noShow": "show";
    var className2=localStorage.length>0? "Show": "noShow";
    console.log(this.state.user);
    var userId = ''
    if(localStorage.length>0) {
      if (Array.isArray(this.state.user)) {
        userId = this.state.user[0]._id;
      }
      else {
        userId = this.state.user._id;
      }
    }
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to='/allEvents'>All Events</Link>
              </li>
              <li><Link to="/about">About</Link></li>
              <li><Link className={className2} to={'/profile/'+userId}>Profile</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className= {className}><Link to="/register" ><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
              <li className= {className}><Link to="/login" ><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
              <li className= {className2} onClick={this.logout}><Link to="/" ><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>

    );
  }
}

export default App;