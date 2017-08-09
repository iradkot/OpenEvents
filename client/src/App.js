import React from 'react';
import ReactDom from 'react-dom';
import Header from './OpenEvents/common/Header';
import Register from './OpenEvents/common/RegisterForm';
import Routesss from './Routes';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
constructor(props) {
  super(props);
  this.updateUser = this.updateUser.bind(this);
  this.logout = this.logout.bind(this);
  this.state = {user: {}};
}
//constructor
//bind this


//componentdidmount 
componentDidMount(){
  if(localStorage.User) {
    let user = JSON.parse(localStorage.User);
      this.setState({ user: user });    
  }
}
//  check if thwre is a user in the localstorage  - put in the state
  logout() {
    localStorage.clear();
      this.setState({ user: {} });
    window.location.replace("http://localhost:3000/");
  }
  updateUser(user){
    this.setState({user:user});
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header logout={this.logout}/>
          {/* <Register /> */}
          <Routesss updateUser={this.updateUser} user={this.state.user}/>
        </div>
      </BrowserRouter>

    );
  }
}

ReactDom.render(
  <App/>, document.getElementById('react-app'));