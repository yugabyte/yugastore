// Dependencies
import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import { NavLink } from 'react-router-dom';
// Internals
import './index.css';

class Navbar extends Component {
  state = {itemsInCart: 0}

  componentDidMount() {
    // TODO: add this
    //fetch('http://localhost:3001/cart/itemsInCart')
    //  .then(res => res.json())
    //  .then(itemsInCart => this.setState({ itemsInCart }));
  }

  constructor(props) {
    super(props);
    this.state = {
      itemsInCart: 0,
    };
  }

  render() {

    return(
    <div className="navbar-fixed">
    <nav className="nav-bar">
      <div className="nav-links">
        <ul>
          <li><NavLink activeClassName="selected" className="nav-link" exact to="/">
            <span className="nav-link-icon"><i className="fas fa-home"></i></span>
            <span className="nav-link-text">Home</span>
          </NavLink></li>
          <li><NavLink activeClassName="selected" className="nav-link" to="/business">
            <span className="nav-link-icon"><i className="fas fa-dollar-sign"></i></span>
            <span className="nav-link-text">Business & Investing</span>
          </NavLink></li>
          <li><NavLink activeClassName="selected" className="nav-link" to="/cookbooks">
            <span className="nav-link-icon"><i className="fas fa-utensils"></i></span>
            <span className="nav-link-text">Cookbooks</span>
          </NavLink></li>
          <li><NavLink activeClassName="selected" className="nav-link" to="/mystery">
            <span className="nav-link-icon"><i className="fas fa-user-secret"></i></span>
            <span className="nav-link-text">Mystery & Suspense</span>
          </NavLink></li>
          <li><NavLink activeClassName="selected" className="nav-link" to="/scifi">
            <span className="nav-link-icon"><i className="fas fa-space-shuttle"></i></span>
            <span className="nav-link-text">Sci-Fi & Fantasy</span>
          </NavLink></li>
        </ul>
      </div>
      <div className="nav-cart">
        <NavLink activeClassName="selected" to="/cart">
          <div>
            <i className="fas fa-cart-arrow-down"></i>
            <span className="nav-cart-count">{this.state.itemsInCart}</span>
          </div>
        </NavLink>
      </div>
    </nav>
    </div>
    )
  }
}

export default Navbar;
