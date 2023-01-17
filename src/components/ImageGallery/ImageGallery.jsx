import { Component } from 'react';
import propTypes from 'prop-types';
import css from '../ImageGallery/imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.gallery}>
          {this.props.pictures.map((picture, index) => {
            return (
              <ImageGalleryItem
                onClickModal={this.props.onClickModal}
                picture={picture}
                index={index}
                webformatURL={picture.webformatURL}
                largeFormatURL={picture.largeImageURL}
                tags={picture.tags}
              />
            );
          })}
        </ul>
        <div className={css.buttonPlace}>
          {this.props.totalHits - this.props.pictures.length > 0 && (
            <button
              onClick={this.props.updateCount}
              id="LoadMore"
              className={css.button}
            >
              Load More Pics
            </button>
          )}
        </div>
      </>
    );
  }
}

ImageGallery.propTypes = {
  totalHits: propTypes.number,
  onClick: propTypes.func,
  tags: propTypes.string,
  apiImg: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      largeFormatURL: propTypes.string,
      webformatURL: propTypes.string,
    })
  ),
};

export default ImageGallery;
