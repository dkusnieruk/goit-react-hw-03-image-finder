// import { Component } from "react";
// import * as basicLightbox from 'basiclightbox'
import css from '../Modal/modal.module.css'
const Modal = props =>{
    return (
        <div className={css.overlay} onClick={props.onClose} >
  <div className={css.modal} >
    <img className={css.image} src={props.imageSrc} alt={props.imageAlt} />
  </div>
</div>
    )
}

export default Modal