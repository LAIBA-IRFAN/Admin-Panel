import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { markPresent , markAbsent} from '../../stateManagement/driverSlice';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Modal from "../../Modals/Modal"
import modalStyles from "../../Modals/Modal.module.css"
import warningLogo from "../../icons/warning.png"
import check from "../../icons/check.png"
import Box from '@mui/material/Box';
import { fetchAllBatches, fetchAllDisciplines, getPaidFeesStudents, getPendingFeesStudents, getSingleStudent, getUnpaidFeesStudents } from '../../stateManagement/studentSlices';
import { fetchCategories } from '../../stateManagement/CategorySlice';
import { fetchAllBusIds } from '../../stateManagement/busSlice';

const BusTable = ({  setDeleteModal, selectedId , setSelectedId }) => {
  const dispatch = useDispatch();

  const {busIds} = useSelector((state)=> state.bus)


  useEffect(() => {
     dispatch(fetchAllBusIds());
  }, [dispatch]);


  const DeleteABusID = (id) => {
    setSelectedId(id)
    setDeleteModal(true)
  };


  const columns = [
    { id: 'busNo', label: 'Bus Number', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
  ];

  function createData(busNo,  action , id) {
    return { busNo,  action , id };
  }


  const rows = 
  busIds.map((busId) =>
  createData( busId.busNo, 'action' , busId._id)
  )

  return (
    <>
    {console.log(rows)}
      <Paper sx={{ overflow: 'hidden' , marginTop:'60px' , width:'100%' }}>
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
                          {column.id === 'action' ? (
                            <>
                              <IconButton onClick={() => DeleteABusID(id)}>
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
      </Paper>
    <ToastContainer />
    </>
  );
};

export default BusTable;
