import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { fetchASingleBus } from '../../stateManagement/timetableSlice';

const Shift2Duties=({setSelectedId, editModal , setEditModal , deleteModal , setDeleteModal , setShift})=>{

    const {buses, status} = useSelector((state) => state.timetable);
    const dispatch = useDispatch()

    const EditBus=async(id)=>{
      const response = await dispatch(fetchASingleBus({id,shiftNumber:2}))
      if(status === 'succeeded'){
        console.log(id)
        setSelectedId(id)
        setEditModal(true)
      }
    }

    const DeleteABus=async(id)=>{
      await setDeleteModal(true)
      await setSelectedId(id)
      setShift(2)
      console.log(id)
    }

      const columns = [
    { id: 'route_number', label: 'Routes', minWidth: 170 },
    { id: 'bus_number', label: 'Bus No.', minWidth: 100 },
     { id: 'driver_name', label: 'Driver Name', minWidth: 100 } ,
    { id: 'conductor_name', label: 'Conductor Name', minWidth: 170 } , 
    { id: 'editAction', label: 'Action', minWidth: 0  }  ,
    { id: 'deleteAction', label: '', minWidth: 0  }  ,

  ];

  function createData1(route_number, bus_number, driver_name, conductor_name , editAction , deleteAction) {
    return { route_number, bus_number, driver_name, conductor_name , editAction , deleteAction};
  }

  const rows = 
  buses.map((bus) =>
  createData1(bus.routeId.routeNo,bus.busId.busNo ,bus.driverId.name , bus.conductorId.name , bus._id , bus.busId._id)
)

    return(
        <Paper sx={{ overflow: 'hidden'  }}>
  <TableContainer sx={{ maxHeight: 440 }}>

    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{fontWeight:'bold' , borderBottom: '3px solid #770043'}}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .map((row , index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  const id = row['deleteAction']; 
                  const editid = row['editAction']
                  return (
                    <TableCell key={column.id} align={column.align}>
                      { column.id === 'editAction' ?
                      <>
                              <IconButton onClick={() =>  EditBus(id) }>
                                <EditIcon sx={{ color: '#770043' }} />
                              </IconButton>
                            </>
                            : 
                            column.id === 'deleteAction' ?
                      <>
                              <IconButton onClick={() => DeleteABus(editid)}>
                                <DeleteIcon sx={{ color: '#770043' }} />
                              </IconButton> 
                            </> 
                          : 
                       value}
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

    )
}

export default Shift2Duties;