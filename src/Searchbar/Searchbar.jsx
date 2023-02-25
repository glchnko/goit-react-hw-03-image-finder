import { Component } from "react";
import PropTypes from 'prop-types';
import s from './searchbar.module.css'


class Searchbar extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formValue = form.elements.input.value;
        this.props.onSubmit ({ formValue });
    }

    render(){
        return (
        <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.button}>
           <span className={s.buttonLabel}>Search</span>
         </button>

        <input
         className={s.input}
         type="text"
         autocomplete="off"
         autofocus
         placeholder="Search images and photos"
         name='input'
         value={ this.props.searchResult }
        />
        </form>
        </header>
        )
    }
}

// Searchbar.PropTypes = {
//     onSubmit: PropTypes.func.isRequired,
// }

export default Searchbar;