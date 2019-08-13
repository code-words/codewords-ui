import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="Header">
      <div className="header-left">
        <h1 className="header-title">CodeWords</h1>
      </div>
      <nav className="header-right">
        <NavLink
          to="/rules"
          title="Rule List"
          className="nav-item rules-nav btn-default new-game-btn"
        >
          Rule List 
          {/* <i className="fas fa-question-circle" /> */}
        </NavLink>
        <NavLink to="/about" className="nav-item btn-default new-game-btn">
          About Devs
        </NavLink>
        <NavLink to="/" className="nav-item btn-default new-game-btn">
          New Game
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;