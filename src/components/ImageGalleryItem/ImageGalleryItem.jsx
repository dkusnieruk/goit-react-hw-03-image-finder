import { Component } from 'react';
import propTypes from 'prop-types';
import css from '../ImageGalleryItem/imageGalleryItem.module.css';
class ImageGalleryItem extends Component {
  render() {
    return (
      <li key={this.props.id}>
        <a
          className={css.link}
          href={this.props.largeFormatURL}
          onClick={this.props.onClick}
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
  href: propTypes.string,
  onClick: propTypes.func,
  key: propTypes.number,
  src: propTypes.string,
  title: propTypes.string,
};

export default ImageGalleryItem;
