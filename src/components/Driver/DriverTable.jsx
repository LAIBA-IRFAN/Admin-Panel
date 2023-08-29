import React, { useEffect , useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Attendance from '../../Modals/Attendance';
import { IconButton, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import View from '../../Modals/View';
import LeaveApplication from '../../Modals/LeaveApplication';
import { getAllDrivers, deleteDriver, fetchSingleDriverAttendance } from '../../stateManagement/driverSlice';
import { markPresent, markAbsent, markLeave } from '../../stateManagement/driverSlice';
import { useNavigate } from 'react-router-dom';
import Modal from "../../Modals/Modal"
import modalStyles from "../../Modals/Modal.module.css"
import EditDriver from "./EditDriver"
import warningLogo from "../../icons/warning.png"
import check from "../../icons/check.png"
import Box from '@mui/material/Box';
import FormModal from '../../Modals/FormModal';

const marked = {
  backgroundColor: '#770043',
};

const unmarked = {
  color: '#770043',
};

const DriverTable = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const drivers = useSelector((state) => state.driver.drivers);

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  const [mark, setMark] = React.useState({});
  const [start, setStart] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [driverinfo, setDriverinfo] = React.useState({});
  const driversLength = Object.keys(mark).length;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [successModalOpen, setSuccessModalOpen] = React.useState(false);
  const [selectedDriverId, setSelectedDriverId] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [id, setId] = useState(""); //for edit 

  const { attendance, singleDriver, error } = useSelector((state) => {
    return state.driver
  })

  const AttendanceMark = async (id, index, e) => {
    try {
      if (e.target.id === 'present') {
        const response = await dispatch(markPresent({ driver: id }))
        if (response.error) {
          toast.error(response.error.message)
        }
        else {
          setMark((oldobject) => {
            return {
              ...oldobject,
              [index]: e.target.id
            };
          })
          toast.success("Present marked")
        }
      }
      else if (e.target.id === 'absent') {
        const response = await dispatch(markAbsent({ driver: id }))
        if (response.error) {
          toast.error(response.error.message)
        }
        else {
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
    catch (error) {
      toast.error(error)
    }
  };

  const ViewOpen = async (_id, index, row) => {
    setDriverinfo({ _id: _id, driver_id: row['driver_id'], name: row['name'] });
    await dispatch(fetchSingleDriverAttendance(_id))
    setViewModal(true);
  };

  const EditDriverHandle = (driverid) => {
    setId(driverid);
    setIsEditModalOpen(true)
  };

  const closeModal = () => {
    setIsEditModalOpen(false)
  }

  const DeleteDriver = (id) => {
    setSelectedDriverId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteDriver(selectedDriverId))
    setDeleteModalOpen(false);
    setSuccessModalOpen(true)
  };

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
    { id: 'driver_id', label: 'Driver ID', minWidth: 170 },
    { id: 'name', label: 'Full Name', minWidth: 100 },
    value ? { id: 'status', label: 'Status', minWidth: 100 } : '',
    { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
  ];

  function createData1(driver_id, name, status, action, id) {
    return { driver_id, name, status, action, id };
  }

  function createData2(driver_id, name, action, id) {
    return { driver_id, name, action, id };
  }

  const rows = value
    ? drivers.map((driver) =>
      createData1(driver.driverId, driver.name, value ? button : '', 'action', driver._id)
    )
    : drivers.map((driver) => createData2(driver.driverId, driver.name, 'action', driver._id));

  useEffect(() => {
    if (driversLength === rows.length) {
      setOpen(true);
    }
  }, [driversLength, rows.length]);

  return (
    <>
      {/* {rows.length === driversLength && <Attendance open={open} handleOpen={handleOpen} handleClose={handleClose} />} */}

      {viewModal && (
        <>
          {viewModal === true && (
            <View viewModal={viewModal} setViewModal={setViewModal} driverinfo={driverinfo} singleDriver={singleDriver} />
          )}

          {viewModal === 'next' && (
            <LeaveApplication viewModal={viewModal} setViewModal={setViewModal} driverinfo={driverinfo} singleDriver={singleDriver} />
          )}
        </>
      )}

      <Paper sx={{ overflow: 'hidden' }}>
        {/* {console.log(error)} */}
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
                              {/* <Button
                                variant={mark[index] === 'leave' ? 'contained' : 'outlined'}
                                id="leave"
                                sx={{
                                  border: '1px solid #770043',
                                  borderRadius: '3px',
                                  textTransform: 'capitalize',
                                  ...(mark[index] === 'leave' ? marked : unmarked),
                                }}
                                onClick={start ? (e) => AttendanceMark(id ,index, e) : null}
                              >
                                Leave
                              </Button> */}
                            </>
                          ) : column.id === 'action' ? (
                            <>
                              <IconButton onClick={() => ViewOpen(row.id, index, row)}>
                                <RemoveRedEyeIcon sx={{ color: '#770043' }} />
                              </IconButton>
                              <IconButton onClick={() => EditDriverHandle(row.id)}>
                                <EditIcon sx={{ color: '#770043' }} />
                              </IconButton>
                              <IconButton onClick={() => DeleteDriver(row.id)}>
                                <DeleteIcon sx={{ color: '#770043' }} />
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
        <EditDriver closeModal={closeModal} id={id} />
      </FormModal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div>
          <img src={warningLogo} alt="Warning" />
          <h2>Delete Confirmation</h2>
          <p>Are you sure you want to delete this driver?</p>
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

      {/* Success Modal  */}
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
      <ToastContainer />
    </>
  );
};

export default DriverTable;