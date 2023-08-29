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


export default function TodaysAttendanceTableConductor({ filter1 , filter2}) {

const {conductorsAbsentToday,conductorsLateToday,todaysAttendance} = useSelector((state)=> state.conductor)
const columns = [
  { id: 'conductor_id', label: 'Conductor ID' },
  { id: 'name', label: 'Full Name' },
  { id: 'status', label: 'Status' }, 

];


function createData( conductor_id , name , status  ) {
  return { conductor_id , name , status };
}
const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time;
  };

const filteredConductorsLateToday=conductorsLateToday.filter((row)=> 
//  parseTime(row.time) === parseTime('4:31 PM')
row.time > '4:30 PM'
)

const rows = 
filter1 ?
conductorsAbsentToday.map((row)=> createData(
    row.conductor.conductorId , 
    row.conductor.name ,
    row.isPresent === true ? 'Present' : 'Absent')) : 

filter2 ?
filteredConductorsLateToday.map((row)=> createData(
    row.conductor.conductorId , 
    row.conductor.name ,
    // row.time > '04:30 PM' ? 
    'Late' 
    // : null
    )) : 

todaysAttendance.map((row)=> createData(
  row.conductor.conductorId , 
  row.conductor.name ,
  row.isPresent === true ? 'Present' : 'Absent'))
  

  return (
    <Paper sx={{ overflow: 'hidden'  }}>
    {/* {console.log(selectedDate)} */}
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