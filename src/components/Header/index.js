import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    
    <header className="Header">
      <div className="header-left">
        <h1 className="header-title">CodeWords</h1>
      </div>
      <nav className="header-right">
        <NavLink to="/about" className="nav-item rules-nav">
          About
        </NavLink>
        <NavLink to="/rules" className="nav-item rules-nav">
          <i className="fas fa-question-circle"/>
        </NavLink>
        <NavLink to="/" className="nav-item btn-default new-game-btn">
          New Game
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;