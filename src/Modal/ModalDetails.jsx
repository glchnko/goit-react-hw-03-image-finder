import s from './modal.module.css';
import PropTypes from 'prop-types';

const ModalDetails = ({ url }) => {
    return(
        <div className= {s.modal }>
            <img src = { url } alt = 'detail-img'/>
        </div>
    )
}

ModalDetails.propTypes = {
    url: PropTypes.string.isRequired
}

export default ModalDetails;