import propTypes from 'prop-types';
import css from '../Modal/modal.module.css';

const Modal = props => {
  console.log(props);
  return (
    <div className={css.overlay} onClick={props.onClose}>
      <div className={css.modal}>
        <img className={css.image} src={props.imageSrc} alt={props.imageAlt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: propTypes.func,
  imageSrc: propTypes.string,
  ima: propTypes.string,
};

export default Modal;
