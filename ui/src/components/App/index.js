// Dependencies
import axios from 'axios';
import React, { Component } from 'react';
//Internals
import Highlights from './components/Highlights';
import Products from '../Products';
import './index.css';

class App extends Component {

  render() {
    return (
      <div>
        <div className="content">
       	  <Highlights />
        </div>
        <div className="content">
          <Products />
        </div>
      </div>
    );
  }
}

export default App;
