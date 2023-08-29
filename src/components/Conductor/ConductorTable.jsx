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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteConductor, getAllConductors } from '../../stateManagement/conductorSlice';
import { useNavigate } from 'react-router-dom';
import Modal from "../../Modals/Modal"
import { toast, ToastContainer } from 'react-toastify';
import modalStyles from "../../Modals/Modal.module.css"
import warningLogo from "../../icons/warning.png"
import check from "../../icons/check.png"
import { Button ,IconButton} from '@mui/material';
import View from '../../Modals/View';
import LeaveApplication from '../../Modals/LeaveApplication';
import Attendance from '../../Modals/Attendance';
import { markPresent , markAbsent , fetchSingleConductorAttendance } from '../../stateManagement/conductorSlice';
import EditConductor from "./EditConductor"
import FormModal from '../../Modals/FormModal';

const marked = {
  backgroundColor: '#770043',
};

const unmarked = {
  color: '#770043',
};

const ConductorTable = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ id , setId] = useState("")
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllConductors());
  }, [dispatch]);

  const [mark, setMark] = React.useState({});
  const [start, setStart] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [conductorinfo, setConductorinfo] = React.useState({});
  const conductorsLength = Object.keys(mark).length;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [id, setId] = useState(""); //for edit 
  // const [selectedDriverId, setSelectedDriverId] = React.useState(null);

  const { attendance, singleConductor , conductors } = useSelector((state) => {
    return state.conductor
  })

  const AttendanceMark = async(id, index, e) => {
    try{
      if(e.target.id === 'present' ){
        const response = await dispatch(markPresent({conductor:id}))
        if(response.error){
          toast.error(response.error.message)
        } 
        else{
          setMark((oldobject) => {
            return {
              ...oldobject,
              [index]: e.target.id
            };
        })
        toast.success("Present marked")
        }
      }  
      else if(e.target.id === 'absent'){
      const response = await dispatch(markAbsent({conductor:id}))
      if(response.error){
        toast.error(response.error.message)
      }
      else{
        setMark((oldobject) => {
          return {
            ...oldobject,
            [index]: e.target.id
          };
      })
      toast.success("Absent marked")
      }
      }
    }
    catch(error){
      toast.error("TEST")
    }
  };

  const ViewOpen = async (_id, index, row) => {
    setConductorinfo({ _id: _id, conductor_id: row['conductor_id'], name: row['name'] });
    await dispatch(fetchSingleConductorAttendance(_id))
    setViewModal(true);
  };

  const handleEdit = (conductorId)=> {
    setId(conductorId);
    setIsEditModalOpen(true)
  }

  const closeModal = () => {
    setIsEditModalOpen(false)
  }


  const handleDeleteIcon = (conductorId)=> {
    setDeleteModalOpen(true)
    setId(conductorId)
  }

  const handleDelete = () =>{
    dispatch(deleteConductor(id))
    setDeleteModalOpen(false)
    setSuccessModalOpen(true)
  }

  const StartMarking = () => {
    setStart(true);
  };

  const button = (
    <>
      <Button
        variant={mark === 'present' ? 'contained' : 'outlined'}
        id="present"
        sx={mark === 'present' ? marked : unmarked}
      >
        Present
      </Button>
      <Button
        variant={mark === 'absent' ? 'contained' : 'outlined'}
        id="absent"
        sx={mark === 'absent' ? marked : unmarked}
      >
        Absent
      </Button>
    </>
  );

  const columns = [
    { id: 'conductor_id', label: 'Conductor ID', minWidth: 170 },
    { id: 'name', label: 'Full Name', minWidth: 100 },
    value ? { id: 'status', label: 'Status', minWidth: 100 } : '',
    { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
  ];

  function createData1(conductor_id, name, status, action, id) {
    return { conductor_id, name, status, action, id };
  }

  function createData2(conductor_id, name, action, id) {
    return { conductor_id, name, action, id };
  }

  const rows = value
    ? conductors.map((conductor) =>
      createData1(conductor.conductorId, conductor.name, value ? button : '', 'action', conductor._id)
    )
    : conductors.map((conductor) => createData2(conductor.conductorId, conductor.name, 'action', conductor._id));

  useEffect(() => {
    if (conductorsLength === rows.length) {
      setOpen(true);
    }
  }, [conductorsLength, rows.length]);

  return (
    <>

      {viewModal && (
        <>
          {viewModal === true && (
            <View viewModal={viewModal} setViewModal={setViewModal} conductorinfo={conductorinfo} singleConductor={singleConductor} />
          )}

          {viewModal === 'next' && (
            <LeaveApplication viewModal={viewModal} setViewModal={setViewModal} conductorinfo={conductorinfo} singleConductor={singleConductor} />
          )}
        </>
      )}

      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ fontWeight: 'bold', borderBottom: '3px solid #770043' }}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {/* {console.log(row)} */}
                    {columns.map((column) => {
                      const value = row[column.id];
                      const id = row.id;

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'status' ? (
                            <>
                              <Button
                                variant={mark[index] === 'present' ? 'contained' : 'outlined'}
                                id="present"
                                sx={{
                                  border: '1px solid #770043',
                                  borderRadius: '3px',
                                  textTransform: 'capitalize',
                                  mr: 1,
                                  ...(mark[index] === 'present' ? marked : unmarked),
                                }}
                                onClick={start ? (e) => AttendanceMark(id, index, e) : null}
                              >
                                Present
                              </Button>
                              <Button
                                variant={mark[index] === 'absent' ? 'contained' : 'outlined'}
                                id="absent"
                                sx={{
                                  border: '1px solid #770043',
                                  borderRadius: '3px',
                                  textTransform: 'capitalize',
                                  mr: 1,
                                  ...(mark[index] === 'absent' ? marked : unmarked),
                                }}
                                onClick={start ? (e) => AttendanceMark(id, index, e) : null}
                              >
                                Absent
                              </Button>
                            </>
                          ) : column.id === 'action' ? (
                            <>
                              <IconButton onClick={() => ViewOpen(row.id, index, row)}>
                                <RemoveRedEyeIcon sx={{ color: '#770043' }} />
                              </IconButton>
                              <IconButton >
                                <EditIcon
                                  sx={{
                                    color: '#770043' , 
                                    // marginRight: "20px"
                                  }}
                                  onClick={() => handleEdit(row.id)}
                                />
                              </IconButton>
                              <IconButton>
                                <DeleteIcon
                                  onClick={() => handleDeleteIcon(row.id)}
                                  sx={{ color: '#770043' }} 
                                />
                              </IconButton>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {
          value ?
            <>
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="outlined"
                  sx={{
                    color: start ? '#770043' : '#9A9A9A',
                    border: start ? '1px solid #770043' : '1px solid #9A9A9A',
                    mt: 2,
                    mb: 2,
                    textTransform: 'capitalize',
                    boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                    borderRadius: '10px'
                  }}
                  onClick={StartMarking}>
                  Update Attendance
                </Button>
              </Stack>
            </>
            : null
        }
      </Paper>

      
      {/* Edit Modal  */}
      <FormModal isOpen={isEditModalOpen} onClose={closeModal}>
        <EditConductor closeModal={closeModal} id={id} />
      </FormModal>

     {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
      <div>
        <img src={warningLogo} alt="Warning"/>
        <h2>Delete Confirmation</h2>
        <p style={{fontSize: "14px"}}>Are you sure you want to delete this Conductor?</p>
        <div >
          <button 
          className={modalStyles.btns}
          onClick={handleDelete}>
            Delete
          </button>
          <button 
          className={modalStyles.btns}
          onClick={() => setDeleteModalOpen(false)} >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    {/* Success Modal */}
    <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
      <img src={check} alt="check"/>
      <h2>Successful</h2>
      <p>Deleted Successfully</p>
      <button
      className={modalStyles.btns}
      onClick={() => setSuccessModalOpen(false)}
      >
        Close
      </button>
    </Modal>
    <ToastContainer />
    </>
  );
};

export default ConductorTable;