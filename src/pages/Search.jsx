import React, { Component } from 'react';
import AlbunsCard from '../components/AlbunsCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    checkButton: true,
    search: '',
    loading: false,
    artist: null,
    albuns: [],
  };

  handlerSearch = (event) => {
    const { value } = event.target;
    const minUserCharacteres = 2;
    this.setState({ search: value });
    if (value.length >= minUserCharacteres) {
      this.setState({ checkButton: false });
    } else {
      this.setState({ checkButton: true });
    }
  };

  handlerButton = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ checkButton: true });
    this.setState({ loading: true });
    searchAlbumsAPI(search)
      .then((response) => {
        this.setState({ artist: search });
        this.setState({ loading: false });
        if (response.length === 0) {
          this.setState({ artist: '' });
        }
        this.setState({ albuns: response });
      });
    this.setState({ search: '' });
  };

  loading = () => <Loading />;

  forms = (check) => (
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
        disabled={ check }
        onClick={ this.handlerButton }
        type="submit"
      >
        Pesquisar
      </button>
    </form>
  );

  artist = () => {
    const { artist } = this.state;
    if (artist !== null && artist.length !== 0) {
      return (
        <div>
          Resultado de álbuns de:
          {' '}
          {artist}
        </div>);
    }
    if (artist !== null && artist.length === 0) {
      return (
        <div>
          Nenhum álbum foi encontrado
          {artist}
        </div>);
    }

    return null;
  };

  albuns = () => {
    const { albuns } = this.state;
    if (albuns.length > 0) {
      return albuns.map((album) => (<AlbunsCard
        key={ album.collectionId }
        album={ album.collectionName }
        collectionId={ album.collectionId }
      />));
    }
    return null;
  };

  render() {
    const { checkButton, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? this.loading() : this.forms(checkButton)}
        {this.artist()}
        {this.albuns()}
      </div>
    );
  }
}

export default Search;
