import React, { Component } from 'react';
import './App.css';
import SantaUni from './SantaUni.jpg';
import UseTheForce from './UseTheForce.jpg';
import Unicorns from './Unicorns.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="Unicorn" src={SantaUni}></img>
          <div className="Greeting">Merry Christmas</div>
        </header>
        <header className="Postcard">
          <img className="Us" src={UseTheForce}></img>
          <div className="Note"> 
            <div className="Hola">Hola!</div>
            <div className="BodyOfNote">We hope you have had a wonderful 2018!</div>
          </div>
          <img className="Stamp" src="https://vignette.wikia.nocookie.net/peanuts/images/3/3c/StampFlyingAce.jpg/revision/latest?cb=20140422132642"></img>
        </header>
        <div className="MessageCard">
          <LeaveMessage/>
          <MessageBoard/>
        </div>
      </div>
    );
  }
}



class LeaveMessage extends Component {
  render(){
    return (
      <div className="MessageZone">
        <div className="MessageDirections">Want to send us a holiday message back? Just write it below and it will display on our Holiday Message Board.</div>
        <div className="SendZone">
          <input type="text" className="InputMessage" placeholder="Write Message Here"></input>
          <input type="text" className="InputName" placeholder="Write Name Here"></input>
          <button className="PostButton">Post Message</button>
        </div>
      </div>
    )
  }
}

class MessageBoard extends Component {
  render(){
    return(
      <div className="MessageBoardBox">
      <h1 className="Title">Holiday Message Board</h1>
      </div>
    )
  }
}

class PostFromInput extends Component{

}

export default App;