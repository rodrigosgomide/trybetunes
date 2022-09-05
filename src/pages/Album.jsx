import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    collectionName: '',
    artistName: '',
    musics: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    getMusics(id)
      .then((result) => {
        this.setState({ artistName: result[0].artistName });
        this.setState({ collectionName: result[0].collectionName });
        this.setState({ musics: result });
      });
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

  musicsList = () => {
    const { musics } = this.state;
    if (musics.length > 0) {
      return (
        <ul>
          {musics.map((music) => {
            if (music.kind === 'song') {
              return (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />);
            }
            return null;
          })}
        </ul>);
    }
    return null;
  };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        {this.artistData()}
        {this.musicsList()}
      </div>
    );
  }
}

export default Album;
