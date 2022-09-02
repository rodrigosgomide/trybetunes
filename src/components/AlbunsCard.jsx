import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbunsCard extends Component {
  render() {
    const { album, collectionId } = this.props;
    return (
      <div>
        <div>{album}</div>
        <div>
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `album/${collectionId}` }
          >
            Escutar
          </Link>
        </div>
      </div>
    );
  }
}

AlbunsCard.propTypes = {
  album: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbunsCard;
