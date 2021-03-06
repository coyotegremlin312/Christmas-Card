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
            <div className="Hola">Hello All!</div>
            <div className="BodyOfNote">We hope you are having a wonderful holiday season! May your tree be filled with gifts, your table be full of yummy (and probably bad for you) food, and your days be filled with family and friends! Have a wonderful Christmas, New Year, and 2019!</div>
            <div className="OurSignature">Jordan & Ashley</div>
          </div>
          <img className="Stamp" src="https://vignette.wikia.nocookie.net/peanuts/images/3/3c/StampFlyingAce.jpg/revision/latest?cb=20140422132642"></img>
        </header>
        <div className="MessageCard">
          <LeaveMessage />
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
      messages: '',
      messageList: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToMessageBoard = this.addToMessageBoard.bind(this);
    this.createList = this.createList.bind(this);
    this.displayMessageBoard = this.displayMessageBoard.bind(this);
  }

  componentDidMount = () => {
    this.displayMessageBoard();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  createList = (signature) => {
    return (
      <div key={signature._id} className="signature">
        <h3 className="h3msg">{signature.message}</h3>
        <h2 className="h2sig">-{signature.name}</h2>
      </div>
    )
  }

  addToMessageBoard = (event) => {
    const URL = "https://glacial-inlet-67939.herokuapp.com/messages"
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
          console.log('Request success: ', res)
          this.setState({
            name: '',
            message: '',
          });
          this.displayMessageBoard();
        } else {
          console.log('Request failure: ', res)
        }
      })
      .catch((error) => {
        console.log('Request failure: ', error)
      })
  }

  displayMessageBoard = (event) => {
    const URL = "https://glacial-inlet-67939.herokuapp.com/messages"
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ messages: res })
      })
      .then(() => {
        const messageList = this.state.messages.map(this.createList)
        this.setState({ messageList })
      })
  }
  
  render() {
    return (
      <div className="Everything">
      <div className="MessageZone">
        <div className="MessageDirections">Want to send us a holiday message back? Just write it below and it will display on our Holiday Message Board.</div>
        <form onSubmit={this.addToMessageBoard} className="SendZone">
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
            placeholder="Write Name Here"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div className="Submit">
            <button type="submit" value="Submit" className="PostButton">
              Post Message
            </button>
          </div>
        </form>
      </div>
      <div className="MessageBoardBox">
        <h1 className="Title">Holiday Message Board</h1>
        <div className="MessageBoardMessages">{this.state.messageList}</div>
      </div>
    </div>
    )
	}
}

export default App;
