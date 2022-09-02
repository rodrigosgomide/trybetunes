import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    collectionName: '',
    artistName: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    getMusics(id)
      .then((result) => {
        console.log(result);
      });
  }

  // artistData = () => {
  //   const { artistName, collectionName } = this.state;
  //   if (artistName.length > 0 && collectionName.length > 0) {
  //     return (
  //       <div>
  //         <div data-testid="artist-name">{artistName}</div>
  //         <div data-testid="album-name">{collectionName}</div>
  //       </div>);
  //   }
  // };

  render() {
    const { artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
