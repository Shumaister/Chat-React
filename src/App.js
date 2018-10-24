import React, { Component } from 'react';
import './App.css';

// Components
import Header from './Componets/Header'
import Footer from './Componets/Footer'
import Room from './Componets/Room'
import Login from './Login'

// Socket
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

class App extends Component {

  constructor() {
    super();
    this.state = { username: '', chatRoom: '' };
  }

  handleLogin(username, chatRoom) {
    this.setState({ loggedIn: true, username, chatRoom });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="Content">
        {
          this.state.loggedIn ? 
          (<Room socket={socket} username={this.state.username} chatRoom={this.state.chatRoom} />) : 
          (<Login socket = {socket} handleLogin={(username, chatRoom) => this.handleLogin(username, chatRoom)}/>)
        }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
