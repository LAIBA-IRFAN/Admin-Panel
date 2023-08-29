import CssBaseline from '@mui/material/CssBaseline';
import EmployeeTable from "./EmployeeTable"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import AddEmployee from "./AddEmployee"
import FormModal from '../../Modals/FormModal';
import { useDispatch } from 'react-redux';
const EmployeeList = () => {
  const dispatch = useDispatch()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openModal = () => {
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Box sx={{}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{}}
        >
          <Button variant="contained" sx={{
            color: 'white',
            backgroundColor: '#770043',
            marginLeft: 'auto',
            marginRight: 5,
            marginBottom: 3,
            border: '1px solid #770043',
            boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
            borderRadius: '10px',
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            textAlign: 'center',
            textTransform: 'inherit',
            float: "right",
            '&:hover': {
              backgroundColor: '#ffffff',
              color: "#770043",
              border: "1px solid #770043"
            },
          }}
            onClick={openModal}
          >+Add an Employee</Button>
          <EmployeeTable />
        </Box>
      </Box>
      <FormModal isOpen={isAddModalOpen} onClose={closeModal}>
        <AddEmployee closeModal={closeModal}/>
      </FormModal>
    </>
  )
}

export default EmployeeList
