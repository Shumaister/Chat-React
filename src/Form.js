import React from 'react';
import './Form.css';

function Form(props){
  return (
    <form className="message-form" onSubmit={props.onSubmit}>
      <input className="message-input" type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.message}
      />
      <input type="submit" value="Submit" />
    </form>
);}

export default Form;