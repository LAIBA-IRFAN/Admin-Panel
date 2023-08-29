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
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';


export default function TodaysAttendanceTable({ filter1 , filter2}) {

const {driversAbsentToday,driversLateToday,todaysAttendance} = useSelector((state)=> state.driver)
const columns = [
  { id: 'driver_id', label: 'Driver ID' },
  { id: 'name', label: 'Full Name' },
  { id: 'status', label: 'Status' }, 

];


function createData( driver_id , name , status  ) {
  return { driver_id , name , status };
}
const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time;
  };

const filteredDriversLateToday=driversLateToday.filter((row)=> 
//  parseTime(row.time) === parseTime('4:31 PM')
row.time > '4:30 PM'
)

const rows = 
filter1 ?
driversAbsentToday.map((row)=> createData(
    row.driver.driverId , 
    row.driver.name ,
    row.isPresent === true ? 'Present' : 'Absent')) : 

filter2 ?
filteredDriversLateToday.map((row)=> createData(
    row.driver.driverId , 
    row.driver.name ,
    // row.time > '04:30 PM' ? 
    'Late' 
    // : null
    )) : 

todaysAttendance.map((row)=> createData(
  row.driver.driverId , 
  row.driver.name ,
  row.isPresent === true ? 'Present' : 'Absent'))
  

  return (
    <Paper sx={{ overflow: 'hidden'  }}>
    {/* {console.log(selectedDate)} */}
    {console.log(filteredDriversLateToday)}
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
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { value}
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
  );
}