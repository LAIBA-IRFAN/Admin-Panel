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

const marked = {
  backgroundColor:'#770043'
}

const unmarked = {
  color:'#770043'
}

export default function ConductorStatsTable({selectedMonth , filter}) {

const {allConductorsAttendance , AttendanceBelowAvgCount} = useSelector((state)=> state.conductor)
const columns = [
  { id: 'conductor_id', label: 'Conductor ID' },
  { id: 'name', label: 'Full Name' },
  { id: 'days_present', label: 'No. of Days Present' }, 
  {
    id: 'days_absent',
    label: 'No. of Days Absent'
  } ,
  {
    id: 'percentage',
    label: 'Percentage'
  }
];


function createData( conductor_id , name , days_present  , days_absent , percentage  ) {
  return { conductor_id , name , days_present  ,  days_absent , percentage };
}


const rows = 
filter ? 
AttendanceBelowAvgCount.map((row)=> createData(
  row.conductor.conductorId , 
  row.conductor.name ,
  row.conductorAttendanceCount[selectedMonth].count  ,
  row.conductorAttendanceCount[selectedMonth].absent ,
  row.conductorAttendanceCount[selectedMonth].percentage ))
  : 

allConductorsAttendance.map((row)=> createData(
  row.conductor.conductorId , 
  row.conductor.name ,
  row.conductorAttendanceCount[selectedMonth].count  ,
  row.conductorAttendanceCount[selectedMonth].absent ,
  row.conductorAttendanceCount[selectedMonth].percentage ))
  

  return (
    <Paper sx={{ overflow: 'hidden'  }}>
    {console.log(selectedMonth)}
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