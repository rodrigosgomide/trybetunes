import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
