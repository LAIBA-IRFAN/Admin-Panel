import React from 'react';
import ReactDOM from 'react-dom';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FormModal = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 9999,
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'white',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      width: '60%',
      overflowY: 'auto',
      maxHeight: '500px',
      margin: '20px',
      borderRadius: '20px',
      padding: "20px",
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray',
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#ccc',
      },
    },
    closeButton: {
     float: "right",
      backgroundColor: '#770043',
      color: 'white',
      padding: "0px",
      margin: "10px"

    },
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Box sx={modalStyles.overlay}>
      <Box sx={modalStyles.content}>
        <IconButton
          sx={modalStyles.closeButton}
          onClick={onClose}
          aria-label="close"
          size="10px"
        >
          <CloseIcon  color="gray" />
        </IconButton>
        {children}
      </Box>
    </Box>,
    modalRoot
  );
};

export default FormModal;
