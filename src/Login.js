import React, { Component } from 'react';
import './Login.css';
import Form from './Form'

class Login extends Component {
  constructor() {
    super();
    this.state = { username: '', chatRoom: '', newChat: true, rooms: [], initialOption: ['Crea tu propia sala'] };
  }

  componentWillMount() {
    this.props.socket.on('salasExitentes', rooms => {
      this.setState({ rooms: this.state.initialOption.concat(rooms) });
    })
  }

  handleSubmit(event) {
    this.props.handleLogin(this.state.username, this.state.chatRoom);
    event.preventDefault();
  }

  handleWritingMessage(event) {
    this.setState({ username: event.target.value });
  }

  handleWritingSala(event) {
    this.setState({ chatRoom: event.target.value });
  }

  handleClickRoom(e){
    var opc = e.target[e.target.value].text;

    if(e.target.value === '0')
      this.setState({ newChat: true }); 
    else
      this.setState({ newChat: false, chatRoom: opc })
  }

  setChatsRooms(){
    return (this.state.rooms.map((chat, i) => 
      <option key={i} value={i}>{chat}</option>
    ));
  }

  render() {
    return (
      <div>
      <h1>Bienvenido</h1>
        <h4>Sala:</h4> 
        <select onClick={(e)=> {this.handleClickRoom(e)}} className="select-form">{this.setChatsRooms()} </select>
        {
        this.state.newChat ?
        <div> 
          <Form
            onChange={ (e) => this.handleWritingSala(e) }
            placeholder='Ingresa el nombre de la sala' /> 
        </div> : null       
        }
        <div>    
          <h4>Nick:</h4>
          <Form
            onSubmit={ (e) => this.handleSubmit(e) }
            onChange={ (e) => this.handleWritingMessage(e) }
            placeholder='Ingresa tu nombre'
            />
          </div> 
        </div>
    );
  }
}

export default Login;