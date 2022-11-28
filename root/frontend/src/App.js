import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar"

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Home from './pages/Home'
import About from './pages/About'
import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
    //<React.Fragment> 
      //Hi Sebastian 
      <div className="App">
        <h2>Hi Sebastian</h2>
        <Navbar />

        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="about" element={ <About /> } />
        </Routes>
      </div>
      
    //</React.Fragment>
    
      /*<router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Routes>
            <Route path="/" exact component={TodosList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
          </Routes>
        </div>
      </router>*/
    );
  }
}

export default App;