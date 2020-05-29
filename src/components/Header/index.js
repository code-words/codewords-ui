import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";

class Header extends Component {
  constructor() {
    super()
    this.state = {
      isHover: false
    }
  }

  toggleHover = () => {
    this.setState({isHover: !this.state.isHover})
  }

  render() {
    const label = (
      <CopyToClipboard text="PlayCodewords.com">
        <h5 className="label">
          Click to Copy Link 
          <i className="far fa-copy" style={{padding: "5px"}} />
        </h5>
      </CopyToClipboard>
    );
    
    return (
      <header className="Header">
        <div 
          className="header-left"
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          <CopyToClipboard text="PlayCodewords.com">
            <h1 className="header-title">CodeWords</h1>
          </CopyToClipboard>
            {this.state.isHover && label}
        </div>
        <nav className="header-right">
          <NavLink
            to="/rules"
            title="Rule List"
            className="nav-item rules-nav btn-default new-game-btn"
          >
            Rule List 
          </NavLink>
          <NavLink to="/about" className="nav-item btn-default new-game-btn">
            About Us
          </NavLink>
          <NavLink to="/" className="nav-item btn-default new-game-btn">
            New Game
          </NavLink>
        </nav>
      </header>
    );
  }
};

export default Header;