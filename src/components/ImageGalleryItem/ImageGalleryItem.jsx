import { Component } from 'react';
import propTypes from 'prop-types';
import css from '../ImageGalleryItem/imageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  render() {
    return (
      <li key={this.props.picture.id} id={this.props.picture.id}>
        <a
          className={css.link}
          href={this.props.largeFormatURL}
          onClick={this.props.onClickModal}
          title={this.props.tags}
        >
          <img
            src={this.props.webformatURL}
            alt={this.props.tags}
            className={css.image}
          />
        </a>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeFormatURL: propTypes.string,
  onClickModal: propTypes.func,
  id: propTypes.number,
  webformatURL: propTypes.string,
  title: propTypes.string,
  tags: propTypes.string,
};

export default ImageGalleryItem;
