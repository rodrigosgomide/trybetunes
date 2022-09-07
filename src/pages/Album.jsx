import React, { Component } from 'react';
import { PropTypes, match as matchPropTypes } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    collectionName: '',
    artistName: '',
    musics: [],
    favorites: [],
    loading: false,
    songToAdd: {},
    // userFavoritesSongs: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    getMusics(id)
      .then((result) => {
        const songs = result.filter((music) => music.kind === 'song');
        this.setState({
          artistName: result[0].artistName,
          collectionName: result[0].collectionName,
          musics: songs,
          favorites: songs.map(({ trackId }) => ({
            [trackId]: false,
          })),
        });
      });

    this.setState({ loading: true });
    getFavoriteSongs()
      .then((result) => {
        const { favorites } = this.state;
        const favTrackId = result.map(({ trackId }) => trackId);
        const x = favorites.map((fav) => {
          if (favTrackId.includes(Number(Object.keys(fav)))) {
            return ({ [Object.keys(fav)]: !fav[Object.keys(fav)] });
          }
          return (fav);
        });
        this.setState({
          loading: false,
          // userFavoritesSongs: result,
          favorites: x,
        });
      });
  }

  componentDidUpdate() {
    const { songToAdd, loading } = this.state;
    if (loading) {
      addSong(songToAdd).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  handlerCheckBox = (event) => {
    const { id, name } = event.target;
    const { favorites, musics } = this.state;

    const favoriteSongs = favorites.map((song) => {
      if (song[id] !== undefined) {
        return ({ [id]: !song[id] });
      }
      return song;
    });

    this.setState({
      loading: true,
      songToAdd: musics[name],
      favorites: favoriteSongs,
    });
  };

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

  musicsList = () => {
    const { musics, favorites } = this.state;
    if (favorites.length > 0) {
      return (
        <ul>
          {musics.map((music, index) => {
            const { trackId } = music;
            if (music.kind === 'song') {
              return (<MusicCard
                key={ index }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                handlerCheckBox={ this.handlerCheckBox }
                checked={ favorites[index][trackId] }
                trackId={ music.trackId }
                id={ music.trackId }
                index={ index }
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
      {this.artistData()}
      {this.musicsList()}
    </div>
  );

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? this.loading() : this.load()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(matchPropTypes).isRequired,
};

export default Album;
