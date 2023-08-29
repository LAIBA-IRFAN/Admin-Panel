import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllEmployees , deleteEmployee} from '../../stateManagement/employeeSlice';
import { useNavigate } from 'react-router-dom';
import Modal from "../../Modals/Modal";
import modalStyles from "../../Modals/Modal.module.css";
import warningLogo from "../../icons/warning.png";
import check from "../../icons/check.png";
import Button from '@mui/material/Button';
import ClipLoader from 'react-spinners/ClipLoader';
import EditEmployee from './EditEmployee';
import FormModal from '../../Modals/FormModal';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employee.employees);
  const [id, setId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isEditModalOpen) {
      setIsLoading(true);
      dispatch(fetchAllEmployees())
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // Handle error if needed
        });
    }
  }, [dispatch, isEditModalOpen]);

  const handleEdit = (employeeId) => {
    setId(employeeId);
    setIsEditModalOpen(true)
  };

  const handleDeleteIcon = (employeeID) => {
    setDeleteModalOpen(true);
    setId(employeeID);
  };

  const closeModal = ()=> {
    setDeleteModalOpen(false);
    setIsEditModalOpen(false)
    dispatch(fetchAllEmployees());
  }

  const handleDelete = () => {
    dispatch(deleteEmployee(id))
      .then(() => {
        setDeleteModalOpen(false);
        setSuccessModalOpen(true);
        setIsLoading(true);
        dispatch(fetchAllEmployees());
        triggerRerender();
      })
      .catch((error) => {
        setDeleteModalOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2
        style={{
          margin: "20px",
          fontFamily: 'Outfit',
          fontWeight: 300
        }}
      >Employee</h2>
    
      {isLoading ?
        <TableContainer component={Paper} style={{ marginLeft: "20px", marginTop: '40px', height: "400px", maxHeight: '400px', width: "95%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ClipLoader color={'#770043'} loading={isLoading} size={50} />
        </TableContainer>
        : (
          <TableContainer component={Paper} style={{ marginLeft: "20px", marginTop: '40px', maxHeight: '400px', width: "95%" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%' ,fontFamily: "Outfit"}}>
                    Employee ID
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%',fontFamily: "Outfit" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '26%' ,fontFamily: "Outfit"}}>
                    Email
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '17%',fontFamily: "Outfit" }}>
                    Edit
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '17%',fontFamily: "Outfit" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflowY: 'auto' }}>
                {employees.map((employee) => (
                  <TableRow key={employee._id}>
                    <TableCell sx={{fontFamily: "Outfit"}}>{employee.employeeId}</TableCell>
                    <TableCell sx={{fontFamily: "Outfit"}}>{employee.name}</TableCell>
                    <TableCell sx={{fontFamily: "Outfit"}}>{employee.email}</TableCell>
                    <TableCell>
                      <EditIcon
                        sx={{
                          color: "#770043",
                          cursor :"pointer"
                        }}
                        onClick={() => handleEdit(employee._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        sx={{
                          color: "#770043",
                          cursor :"pointer"
                        }}
                        onClick={() => handleDeleteIcon(employee._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
              <div>
                <img src={warningLogo} alt="Warning" />
                <h2>Delete Confirmation</h2>
                <p style={{fontSize: "14px"}}>Are you sure you want to delete this Discipline?</p>
                <div>
                  <button
                    className={modalStyles.btns}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className={modalStyles.btns}
                    onClick={() => setDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <br />
              <br />
                </div>
              </div>
        
            </Modal>
            <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
              <img src={check} alt="check" />
              <h2>Successful</h2>
              <p>Deleted Successfully</p>
              <button
                className={modalStyles.btns}
                onClick={() => {
                  setSuccessModalOpen(false)
                  setIsLoading(false)}}
              >
                Close
              </button>
              <br />
              <br />
            </Modal>
          </TableContainer>
        )
      }
      <FormModal isOpen={isEditModalOpen} onClose={closeModal}>
        <EditEmployee closeModal={closeModal} id ={id}/>
      </FormModal>
    </>
  );
};

export default EmployeeTable;
