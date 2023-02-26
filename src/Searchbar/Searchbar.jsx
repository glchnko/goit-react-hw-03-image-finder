import s from './searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {

   hendleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formValue = e.currentTarget.elements.input.value;
    this.props.onSubmit ({ formValue });  
    // form.reset();
   };

   render () {
       return (
          <header className = {s.searchbar}>
              <form className = {s.searchForm} onSubmit={ this.hendleSubmit }>
                <button type="submit" className={s.searchFormButton}>
                  <FaSearch size={ 20 } fillOpacity = { 0.8 }/> 
                </button>

                <input
                  className = {s.searchFormInput}
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  name='input'
                  value={ this.props.searchResult }
                />
              </form>
          </header>
)} 
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar