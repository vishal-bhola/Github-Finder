import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';

class App extends Component{
  render(){
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>
      </div>
    );
  }
} 

export default App;
