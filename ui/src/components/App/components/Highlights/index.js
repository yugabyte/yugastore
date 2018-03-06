//Dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
//Internals
import './index.css';

const Highlights = () => (
  <div className="highlights">
    <h1 id="highlights-title">Books at YugaStore</h1>
    <div className="links-highlights">
      <p>
        <NavLink activeClassName="selected" className="nav-link-highlights" to="/">
          Award winners
        </NavLink>
      </p>
      <p>
        <NavLink activeClassName="selected" className="nav-link-highlights" to="/">
          Deals in Books
        </NavLink>
      </p>
      <p>
        <NavLink activeClassName="selected" className="nav-link-highlights" to="/">
          100 must-read books
        </NavLink>
      </p>
      <p>
        <NavLink activeClassName="selected" className="nav-link-highlights" to="/">
          Classics
        </NavLink>
      </p>
    </div>
  </div>
)

export default Highlights;
