import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checked,
      id,
      handlerCheckBox,
    } = this.props;

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
          htmlFor={ id }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            id={ id }
            onClick={ handlerCheckBox }
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
  checked: false,
  id: 0,
  handlerCheckBox: () => {},
};

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  checked: PropTypes.bool,
  id: PropTypes.number,
  handlerCheckBox: PropTypes.func,
};

export default MusicCard;
