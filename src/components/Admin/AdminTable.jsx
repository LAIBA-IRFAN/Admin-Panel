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
import { deleteAdmin, fetchAllAdmins } from '../../stateManagement/AdminSlice';
import { useNavigate } from 'react-router-dom';
import Modal from "../../Modals/Modal";
import modalStyles from "../../Modals/Modal.module.css";
import warningLogo from "../../icons/warning.png";
import check from "../../icons/check.png";
import Button from '@mui/material/Button';
import ClipLoader from 'react-spinners/ClipLoader';
import FormModal from '../../Modals/FormModal';
import AddAdmin from "./AddAdmin"
import EditAdmin from "./EditAdmin"

const AdminTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admins = useSelector((state) => state.admin.admins);
  const [id, setId] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  
  useEffect(() => {
    dispatch(fetchAllAdmins())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleEdit = (batchId) => {
    openEditModal()
    setId(batchId)
  };

  const handleDeleteIcon = (batchId) => {
    setDeleteModalOpen(true);
    setId(batchId);
  };

  const handleDelete = () => {
    dispatch(deleteAdmin(id))
      .then(() => {
        setDeleteModalOpen(false);
        setSuccessModalOpen(true);
        dispatch(fetchAllBatches());
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
      >Admin</h2>
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
        // onClick={() => navigate("/add-batch")}
        onClick={openAddModal}
      >+Add Admin</Button>
      {isLoading ?
        <TableContainer component={Paper} style={{ marginLeft: "20px", marginTop: '40px', height: "400px", maxHeight: '400px', width: "95%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ClipLoader color={'#770043'} loading={isLoading} size={50} />
        </TableContainer>
        : (
          <TableContainer component={Paper} style={{ marginLeft: "20px", marginTop: '40px', maxHeight: '400px', width: "95%", fontFamily: "Outfit" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '15%', fontFamily: "Outfit" }}>
                    No.
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%', fontFamily: "Outfit" }}>
                    ID
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%', fontFamily: "Outfit" }}>
                    Password
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%', fontFamily: "Outfit" }}>
                    Edit
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', borderBottom: '3px solid #770043', width: '20%', fontFamily: "Outfit" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflowY: 'auto', fontFamily: "Outfit" }}>
                {admins.map((admin, index) => (
                  <TableRow key={admin._id}>
                    <TableCell sx={{ fontFamily: "Outfit" }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontFamily: "Outfit" }}>{admin.adminId}</TableCell>
                    <TableCell sx={{ fontFamily: "Outfit" }}>{admin.adminPassword}</TableCell>
                    <TableCell >
                      <EditIcon
                        sx={{
                          color: "#770043",
                          cursor: "pointer"
                        }}
                        onClick={() => handleEdit(admin._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteIcon(admin._id)}
                        sx={{
                          color: "#770043",
                          cursor: "pointer"
                        }}
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
                <p>Are you sure you want to delete this Admin?</p>
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
                </div>
              </div>
              <br />
              <br />
            </Modal>
            <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
              <img src={check} alt="check" />
              <h2>Successful</h2>
              <p>Deleted Successfully</p>
              <button
                className={modalStyles.btns}
                onClick={() => setSuccessModalOpen(false)}
              >
                Close
              </button>
            </Modal>
          </TableContainer>
        )
      }

      {/* Add Modal */}
      <FormModal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddAdmin closeModal={closeAddModal} />
      </FormModal>

      {/* Edit Modal */}
      <FormModal isOpen={isEditModalOpen} onClose={closeEditModal} >
        <EditAdmin id={id}   closeModal={closeEditModal} />
      </FormModal>
    </>
  );
};

export default AdminTable;
