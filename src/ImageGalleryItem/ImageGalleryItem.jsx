import s from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class ImageGalleryItem extends Component {
    state = {
        largeImage: '',
    }

    clickItem = () => {
        const bigImg = this.state.largeImage;
        this.props.onClick({bigImg});
    }

    componentDidMount () {
        this.setState({ largeImage: this.props.largeImage });
    }

    render() {

    return (
        <li onClick={ this.clickItem } className={s.imageGalleryItem }>
            <img src= { this.props.url } alt='image' className={s.imageGalleryItemImage }/>
        </li>
    )};
};

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ImageGalleryItem;