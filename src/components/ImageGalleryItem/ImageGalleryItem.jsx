import { Component } from "react";
import css from '../ImageGalleryItem/imageGalleryItem.module.css'
class ImageGalleryItem extends Component {
    render(){
       
        return(
            <li className='' 
            key={this.props.key}>
  <img src=
  {this.props.largeImageURL} 
  alt={this.props.tags}
  className={css.image} />
</li>
        )
    }
}

export default ImageGalleryItem