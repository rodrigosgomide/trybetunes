import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    checkButton: true,
  };

  handlerSearch = (event) => {
    const { value } = event.target;
    const minUserCharacteres = 2;
    if (value.length >= minUserCharacteres) {
      this.setState({ checkButton: false });
    } else {
      this.setState({ checkButton: true });
    }
  };

  render() {
    const { checkButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handlerSearch }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ checkButton }
            // onClick={ this.handlerButton }
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
