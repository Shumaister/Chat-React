import React, { Component } from 'react';
import Chat from './../Chat';

class Room extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }
  
  componentWillMount() {
   this.props.socket.on('usersOnRoom', users => {
     this.setState({ users });
   });
    
   this.props.socket.emit('subscribeToChatRoom', { username: this.props.username, chatRoom: this.props.chatRoom });
   this.props.socket.emit('usersOnRoom', this.props.username);
  }

  render() {
    return (<Chat socket={this.props.socket} username={this.props.username} users={this.state.users}/>);
  }
}

export default Room;
