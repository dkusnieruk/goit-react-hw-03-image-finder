// import { Component } from "react";
// import * as basicLightbox from 'basiclightbox'
import css from '../Modal/modal.module.css'
const Modal = props =>{
    return (
        <div className={css.overlay} onClick={props.onClose} >
  <div className={css.modal} >
    <img className={css.image} src={props.link} alt={props.tags} />
  </div>
</div>
    )
}

export default Modal