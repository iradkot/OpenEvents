import React from 'react';
import {  Redirect } from 'react-router-dom';


class App extends React.Component{
constructor(props){
    super(props)
    this.conected = this.conected.bind(this);
    this.state = {
        name: this.props.match.params.name,
        id: this.props.match.params.id,
        token: this.props.match.params.token
    }
}
//  Save the token and the name of connected user to local storage
conected(){
    console.log(this.props);
    let User = this.state;
    localStorage.setItem("User", JSON.stringify(User))
}

componentWillMount(){
    this.conected();
}
render(){
    
    return <Redirect to={'../../../'} />
   
}
}

export default App;