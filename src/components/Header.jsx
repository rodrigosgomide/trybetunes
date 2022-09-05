import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './NavBar';

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

  loadingCheck = () => {
    const { loading, userName } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div data-testid="header-user-name">
        {`Bem vindo ${userName} !`}
        <NavBar />
      </div>);
  };

  render() {
    return (
      <header data-testid="header-component">
        {this.loadingCheck()}
      </header>
    );
  }
}

export default Header;
