import React from "react";
import "./style.css";
import axios from "axios";
const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  },
  {
    senderId: "Junlan",
    text: "hello"
  }
];
class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: DUMMY_DATA
    };
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} //dummy data change later
        />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}
class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <li key={message.id} className="message">
              <div>{message.senderId}</div>
              <div>{message.text}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.sendMessage(this.state.message);
    // this.setState({
    //   message: ""
    // });

    var new_messages = this.state.message;
    console.log(new_messages);

    axios
      .get("http://localhost:4000/api/buyer/messages/textbox", {
        params: {
          // send to backend
          // userId: user.id,
          messages: new_messages
        }
      })
      .then(response => {
        //get from backend
        console.log(response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

function Title() {
  return <p className="title">My Chat Room</p>;
}
export default MessagePage;
