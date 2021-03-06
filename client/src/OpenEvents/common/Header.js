import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
    this.state = {
      user: {}
    }
  }
  componentWillMount() {

    if (localStorage.length > 0) {
      let user1 = JSON.parse(localStorage.User);
      this.setState({ user: user1 });
    }

  }
  // logout() {
  //   localStorage.clear();
  //   window.location.replace("http://localhost:3000/");
  // }

  // the animation of the menu
  // componentDidMount() {
  //   console.log("works sticky")
  //   $(function () {
  //     $(window).scroll(function () {
  //       var winTop = $(window).scrollTop();
  //       if (winTop >= 30) {
  //         $("body").addClass("sticky-header");
  //       } else {
  //         $("body").removeClass("sticky-header");
  //       }
  //     })
  //   })
  // }

  render() {
    let class_logout = localStorage.User ? "log logAnim" : "noShow";
    let class_login = localStorage.User ? "noShow" : "log logAnim";
    return (
      <header>
        <img className="logo" width="60" src="/images/logo.png"/>
        <nav className="navbar  sti">
          
          <div className="container">
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav pageNav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {/*<li><Link to={'/profile/' + this.state.user.name}>Profile</Link></li>*/}
              </ul>
              
               
                  <input className="searchTerm" placeholder="Enter your search term ..." />
               
              <ul className="nav navbar-nav navbar-right">
                <li><a target="_self" href="/auth/facebook" className={class_login}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                <li><a target="_self" href="#" onClick={this.props.logout} className={class_logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header >
    );
  }
}

export default App;