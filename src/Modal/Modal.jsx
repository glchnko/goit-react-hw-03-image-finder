import s from './modal.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import ReactDOM from "react-dom";

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

    
    closeModal = ({target, currentTarget, key}) => {

        if (target === currentTarget || key === 'Esc') {
          this.props.onClick();
        }
    }
  
     componentDidMount () {
        document.addEventListener("keydown", this.closeModal);
     }

     componentWillUnmount () {
        document.removeEventListener("keydown", this.closeModal);
     }

    render () {
    return ReactDOM.createPortal (
        <div className= {s.overlay } onClick={ this.closeModal }>  
             { this.props.children }
        </div>, 
        modalRoot
    )}
};

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default Modal;