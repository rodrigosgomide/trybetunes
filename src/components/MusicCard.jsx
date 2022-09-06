import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, addSong, checked } = this.props;
    return (
      <li>
        {trackName}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="Favorita"
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name=""
            id={ trackId }
            onChange={ addSong }
            defaultChecked={ checked }
          />
          Favorita
        </label>
      </li>
    );
  }
}

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
  trackId: '',
  addSong: () => {},
  checked: false,
};

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  addSong: PropTypes.func,
  checked: PropTypes.bool,
};

export default MusicCard;
