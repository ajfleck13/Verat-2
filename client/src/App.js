import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Master from './components/Master'
import Homepage from './components/Homepage/Homepage'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Master /> */}
        <Homepage />
      </div>
    );
  }
}

export default App;
