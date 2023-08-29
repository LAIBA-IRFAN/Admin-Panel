import styles from "./Modal.module.css"
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return ReactDOM.createPortal(
      <>
        <div className={styles.modalBackdrop} onClick={onClose} />
        <div className={styles.modalContent}>{children}</div>
      </>,
      document.getElementById("modal")
    );
  };
  
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };
  
  export default Modal;
  