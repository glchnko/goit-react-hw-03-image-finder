import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";


class App extends Component {

    state = {
      searchWord: '',
    };
   
    hendleSearch = (res) => {
        this.setState ({ searchWord: res.formValue });
    };

    render () {
       return (
        <>  
         <Searchbar onSubmit = {(res) => this.hendleSearch(res)}/> 
         <ImageGallery searchWord = { this.state.searchWord } />
        </>
    )};
};

export default App;