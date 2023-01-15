import { Component } from 'react';
import propTypes from 'prop-types';
import css from '../ImageGallery/imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.gallery}>
          {this.props.apiImg.map((apiImg, index) => {
            return (
              <ImageGalleryItem
                onClick={this.props.onClick}
                apiImg={apiImg}
                index={index}
                key={apiImg.id}
                webformatURL={apiImg.webformatURL}
                largeFormatURL={apiImg.largeImageURL}
                tags={apiImg.tags}
              />
            );
          })}
        </ul>
        <div className={css.buttonPlace}>
        { this.props.imageDifference >=0 && <button onClick={this.props.updateCount} id="LoadMore" className={css.button}>
            Load More Pics
          </button>}
        </div>
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageDifference: propTypes.number,
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
