import React, { Component } from 'react';
import { PropTypes, history as historyPropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    newUserName: '',
    checkButton: true,
    loading: false,
  };

  handlerUsername = (event) => {
    const { value } = event.target;
    const minUserCharacteres = 3;
    this.setState({ newUserName: value });
    if (value.length >= minUserCharacteres) {
      this.setState({ checkButton: false });
    } else {
      this.setState({ checkButton: true });
    }
  };

  handlerButton = (event) => {
    event.preventDefault();
    const { newUserName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    createUser({ name: newUserName })
      .then(() => {
        this.setState({ loading: false });
        history.push('/search');
      });
  };

  render() {
    const { checkButton, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="userName">
            Nome:
            <input
              data-testid="login-name-input"
              type="text"
              onChange={ this.handlerUsername }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ checkButton }
            onClick={ this.handlerButton }
            type="submit"
          >
            Entrar
          </button>
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
};

export default Login;
