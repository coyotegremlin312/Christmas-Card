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
  
  constructor() {
    super()
    this.state = {
      name: '',
      message: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToMessageBoard = this.addToMessageBoard.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  addToMessageBoard = (event) => {
    const URL = 'http://localhost:5000/messages'
    event.preventDefault()
    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        message: this.state.message,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          //   console.log('Request success: ', res)
          this.setState({
            name: '',
            message: '',
          })
        } else {
          //   console.log('Request failure: ', res)
        }
      })
      .catch((error) => {
        // console.log('Request failure: ', error)
      })
  }

  render() {
    return (
      <div className="MessageZone">
        <div className="MessageDirections">Want to send us a holiday message back? Just write it below and it will display on our Holiday Message Board.</div>
        <form onSubmit={this.addToMessageBoard} className="guestBookForm">
          <textarea
            className="InputMessage"
            type="text"
            placeholder="Write Message Here"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <input
            className="InputName"
            type="text"
            name="name"
            placeholder="Write Name Here"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <div className="Submit">
            <button type="submit" value="Submit" className="PostButton">
              Submit Message
            </button>
          </div>
        </form>
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

/*render(){
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
}*/