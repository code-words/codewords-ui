import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <header className="Header">
      <div className="header-left">
        <h1 className="header-title">CodeWords</h1>
      </div>
      <nav className="header-right">
        <NavLink to="/ruleList" className="nav-item rules-nav">
          Instructions
        </NavLink>
        <NavLink to="/startScreen" className="nav-item new-game-nav">
          New Game
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;