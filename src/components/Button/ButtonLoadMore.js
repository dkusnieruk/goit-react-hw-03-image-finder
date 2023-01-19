import { Component } from 'react';

import propTypes from 'prop-types';

import css from '../Button/button.module.css';

class ButtonLoadMorePics extends Component {
  render() {
    return (
      <button
        onClick={this.props.updateCount}
        id="LoadMore"
        className={css.button}
      >
        Load More Pics
      </button>
    );
  }
}

ButtonLoadMorePics.propTypes = {
  updateCount: propTypes.func,
};

export default ButtonLoadMorePics;
