import React, { Component } from 'react';

import './Chat.css';
import From from './Form'
import Messages from './Messages'

class Chat extends Component {
  constructor() {
    super();
    this.state = { message: '', messages: []};

    this.styleForUser = this.styleForUser.bind(this);
  }

  colorForUsers = [ '#1B4F72', '#186A3B', '#CA6F1E', '#5B2C6F', '#A93226', '#000000'] 
  
  
  componentWillMount() {
    this.props.socket.on('message', message => {
      this.setState({ messages: this.state.messages.concat(message)});
    });
  }
  
  handleSubmit(event) {
    this.props.socket.emit('message', this.state.message);
    this.setState({ message: '' });
    event.preventDefault();
  }

  handleWritingMessage(event) {
    this.setState({ message: event.target.value });
  }

  // Recibe un usuario y te retorna el style con el que se ve su nombre
  styleForUser(user) {
    return {fontWeight: 'bold', color: this.colorForUsers[user.color]};
  }

  mensagesInRoom(){
    var mensajes = this.state.messages;

    //esto lo tuve que hacer asi porque no me reconoce nada fuera de la funcion
    var lista = this.colorForUsers;

    mensajes.forEach(function setColorUsers(mensaje) {
      mensaje.styleForUserName = {fontWeight: 'bold', color: lista[mensaje.userSender.color]};
    });

    return mensajes;
  }

  render() {
    return (
      <div className="Chat">
        <div className="users-container">
          <h3>Usuarios conectados:</h3>
            <div ref="messageList">
            {
              this.props.users.map((user, i) => {
              return (
                <p key={i} style={this.styleForUser(user)} > { user.nombre } </p>);
              })
            }          
      </div>
      </div>
        <div className="messages-container">
          <h3>Mensajes:</h3>
          <Messages 
           userloged = { this.props.username } 
           messages = { this.mensagesInRoom() } 
           />
          <From
            onSubmit={ (e) => this.handleSubmit(e) }
            onChange={ (e) => this.handleWritingMessage(e) }
            placeholder='Escribe un mensaje'
            message={ this.state.message }
          />
        </div>

      </div>
    );
  }
}

export default Chat;
