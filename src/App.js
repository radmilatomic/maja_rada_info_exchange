import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Main from './components/main'

class App extends Component {
 render() {
  return (
    <div id="app">
    <Router>
    <div>
    <Header/>
   <Main/>
   <Footer/>
   </div>
   </Router>
    </div>
  );
 }
}
export default App;