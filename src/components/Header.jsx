import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    getUser()
      .then((response) => {
        this.setState({ loading: false });
        this.setState({ userName: response.name });
      });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : <div data-testid="header-user-name">
            {`Bem vindo
            ${userName}
            `}
          </div>}
      </header>
    );
  }
}

export default Header;
