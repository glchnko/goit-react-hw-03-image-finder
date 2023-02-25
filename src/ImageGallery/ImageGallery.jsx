import s from './imageGallery.module.css';
import  PropTypes from 'prop-types';  
import { Component } from 'react';
import axios from 'axios';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalDetails from '../Modal/ModalDetails';

const ApiKey = '32164638-6ed73bf6b46ba78dbe457113a';

class ImageGallery extends  Component {

    state = {
       images: [], 
       page: 1,
       searchWord: '',
       status: 'clear',
       loading: false,
       results: 0,
       showModal: false,
       largeImage: ''
    };


    async getImages ( serarchWord, searchPage) {
       const result = await axios.get(`https://pixabay.com/api/?q=${ serarchWord }&page=1&key=${ ApiKey }&image_type=photo&orientation=horizontal&per_page=${ 12 * searchPage }`);
       return result;
    }

    componentDidUpdate (prevProps, prevState) {

        const prevSearchWord =  prevProps.searchWord;
        const currentSearchWord = this.props.searchWord;
        const prevPage = prevState.page;
        const curPage = this.state.page;
    
         if (currentSearchWord !== prevSearchWord) {

            this.setState ({ loading: true, page: 1});
            
            this.getImages ( currentSearchWord, 1)
            .then( response => { 
                const { hits, total } = response.data;
                this.setState({ images: hits, results: total }) 
            } )
            .catch(() => { this.setState({ status: 'err' }) })
            .finally(() => this.setState({ status: 'loaded', loading: false }));
         }

         if (curPage !== prevPage ) {
   
            this.setState ({ loading: true });

            this.getImages ( currentSearchWord, curPage)
            .then( response => { 
                this.setState({ images: response.data.hits }) 
            })
            .catch(() => { this.setState({ status: 'err' }) })
            .finally(() => this.setState({ status: 'loaded' , loading: false}))
         }

    }

    loadMoreClick = () => {
        this.setState((prevState) => { return { page: prevState.page + 1 } })
    }

    showModal = (largeImg) => {
        this.setState({ showModal: true, largeImage: largeImg.bigImg });
    }

    closeModal = () => {
        this.setState ({ showModal: false, largeImage: '' })
    }
 
    render () {

        const { images , status,  results, showModal, largeImage, loading } = this.state;

        if (status === 'clear') {
            return ( <div>Input some search word...</div> )
        };

        if (status === 'err') {
            return ( <div>Some problems with Api!</div> )
        };

        if (status === 'loaded') {
        return ( 
            <>
                {showModal && 
                <Modal onClick ={ this.closeModal }>
                    <ModalDetails url={ largeImage } />
                </Modal> 
                }
                <ul className={s.imageGallery }>
                   { images.map((element)=> 
                   <ImageGalleryItem key = { element.id } url= { element.webformatURL } largeImage = { element.largeImageURL } onClick={ largeimg => this.showModal(largeimg) }/>) }            
                </ul>
                {loading &&  <Loader/>}
                {results > images.length && <Button onClick={ this.loadMoreClick }/>}
            </>
        )};
    }
};

ImageGallery.propTypes = {
    searchWord: PropTypes.string.isRequired
}

export default ImageGallery;