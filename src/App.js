import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import {Route} from "react-router-dom";
import Tree from './components/Tree'

class App extends Component {
  render() {
    return (
        <div>
            <div style={ {margin: '0 auto'}}>Searching form </div>
            <Route path="/tree" component={Tree} />
        </div>

    );
  }
}

export default App;
