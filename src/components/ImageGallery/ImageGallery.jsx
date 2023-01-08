import { Component } from "react";
import css from '../ImageGallery/imageGallery.module.css'
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
class ImageGallery extends Component {
    
    render()

    { 
        return(
            <ul className={css.gallery}>
                
                {
                this.props.apiImg.map((apiImg, index) =>{
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
                    )
                })
                 
                }
            </ul>
        )
    }
}

export default ImageGallery