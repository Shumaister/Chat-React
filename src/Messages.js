import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import './Messages.css';

class Messages extends Component {
  
  componentDidUpdate() {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  nameSender(username)
  {  
    return (username === this.props.userloged)? 'Yo:' : username + ':';
  }

  styleForUser(mensaje) {
    return mensaje.styleForUserName;
  }

  render() {
    return (
      <div className="Messages" ref="messageList">
        {
          this.props.messages.map((message, i) => {
            return (
              <p key={ i }>
                <b style={this.styleForUser(message)} >{ this.nameSender(message.userSender.nombre)}</b>
                <span> {message.text}</span>
              </p>);
          })
        }          
      </div>
    );
  }
}

export default Messages;
