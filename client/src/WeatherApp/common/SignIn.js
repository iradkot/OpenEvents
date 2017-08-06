import React from 'react';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkUserLog = this.checkUserLog.bind(this);
    this.state = {
      email: "",
      password: ""
    }
  }
  checkUserLog(event) {
    event.preventDefault();
    axios.get(`/user`, {
      params: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        console.log(res);
        if (res.data) {
          var User = res.data;
          // Put the object into storage
          localStorage.setItem('User', JSON.stringify(User));
          // Retrieve the object from storage
          var retrievedObject = localStorage.getItem('User');
          window.location.replace("http://localhost:3000/")
        }
        else  {
          alert("wrong username\password, Try again");
        }

      });
  }
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form action="#" onSubmit={this.checkUserLog} >
          <div className="form-group userNameF">
            <input type="text" className="form-control" id="email" placeholder="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
          </div>
          <div className="form-group userPassF">
            <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
          </div>
          <button type="submit" className="btn btn-default">login</button>
        </form>
      </div>
    );
  }
}

export default App;