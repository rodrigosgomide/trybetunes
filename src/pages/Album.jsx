import React, { Component } from 'react';
import { PropTypes, match as matchPropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    collectionName: '',
    artistName: '',
    musics: [],
    favorites: [],
    loading: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getMusics(id)
      .then((result) => {
        this.setState({ artistName: result[0].artistName });
        this.setState({ collectionName: result[0].collectionName });
        this.setState({ musics: result.filter((music) => {
          if (music.kind === 'song') {
            return music;
          }
        }) });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { musics } = this.state;
    if (musics !== prevState.musics) {
      this.setState({ favorites: musics.map(({ trackId }) => ({ [trackId]: false })) });
    }
  }

  artistData = () => {
    const { artistName, collectionName } = this.state;
    if (artistName.length > 0 && collectionName.length > 0) {
      return (
        <div>
          <div data-testid="artist-name">{artistName}</div>
          <div data-testid="album-name">{collectionName}</div>
        </div>);
    }
    return null;
  };

  findMusic = (id) => {
    const { musics } = this.state;
    musics.map((music) => {
      if (music.trackId.toString() === id) {
        return music;
      }
    });
  };

  handlerCheckBox = (event) => {
    const { id } = event.target;
    const { favorites } = this.state;
    this.setState({ loading: true });
    this.setState({ favorites: favorites.map((music) => {
      if (music[id] !== undefined) {
        return ({ [id]: !music[id] });
      }
      return music;
    }) });
    addSong(this.findMusic(id)).then(() => this.setState({ loading: false }));
  };

  musicsList = () => {
    const { musics, favorites } = this.state;
    if (favorites.length > 0) {
      return (
        <ul>
          {musics.map((music) => {
            if (music.kind === 'song') {
              return (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                addSong={ this.handlerCheckBox }
                checked={ favorites.find((track) => track[music.trackId] !== undefined
                  && track[music.trackId]) }
                trackId={ music.trackId }
              />);
            }
            return null;
          })}
        </ul>);
    }
    return null;
  };

  loading = () => <Loading />;

  load = () => (
    <div>
      <Header />
      {this.artistData()}
      {this.musicsList()}
    </div>
  );

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? this.loading() : this.load()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(matchPropTypes).isRequired,
};

export default Album;
