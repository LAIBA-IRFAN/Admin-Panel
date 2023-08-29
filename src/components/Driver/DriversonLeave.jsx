import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllDriversOnLeave , markLeave } from '../../stateManagement/driverSlice';
import { fetchAllConductorsOnLeave , markLeave } from '../../stateManagement/conductorSlice';
import { fetchAllDriversOnLeave } from '../../stateManagement/driverSlice';

const marked = {
  backgroundColor: '#770043',
};

const unmarked = {
  color: '#770043',
};

export default function DriversonLeave({value}) {
  
  const [mark, setMark] = React.useState({});
  const dispatch = useDispatch()
  const {driversOnLeave} = useSelector((state)=> state.driver)

  React.useEffect(()=>{
    dispatch(fetchAllDriversOnLeave()) 
  },[])

  const LeaveMark=async(id , index, e)=>{
    console.log(id)
    const response = await dispatch(markLeave({driver:id}))
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
      toast.success("Leave marked successfully")

    }
  }

  const remove = <Button
  variant='outlined'
  sx={{
    color: '#E40000'
    }}>Remove
  </Button>

  const leaveButton = <Button variant={mark === 'marked' ? 'contained' : 'outlined'} id="marked"
  sx={mark === 'marked' ? marked : unmarked}>Leave</Button>

  const columns = [
    { id: 'driver_id', label: 'Driver ID', minWidth: 170 },
    { id: 'name', label: 'Full Name', minWidth: 100 },
    {
      id: 'leaves',
      label: 'No. of leaves',
      minWidth: 170,
      // align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    value ?
    {
      id: 'leaveButton',
      label: '',
      minWidth: 170,
    } : '',
    // value ?
    // { id: 'remove', label: '', minWidth: 100 }
    // : ''
  ];
  
  function createData1(driver_id, name , leaves , leaveButton  , id ) {
    return { driver_id, name , leaves , leaveButton  , id };
  }
  function createData2(driver_id, name , leaves  , id  ) {
    return { driver_id, name , leaves  , id };
  }
  
  
  const rows = 
  value ?
  driversOnLeave.map((row,index)=>createData1(row.driver.driverId, row.driver.name , row.noOfDays ,value ? leaveButton : null , row.driver._id ))
  : 
  driversOnLeave.map((row,index)=>createData2(row.driver.driverId, row.driver.name , row.noOfDays ,  row.driver._id))


  return (
    <>
    <Typography
    variant="h1"
    sx={{
        // fontFamily: 'Outfit',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: '30px',
        // marginLeft:'auto',
        // marginRight:2,
        // width: '80%',
        marginTop:'20px',
        marginBottom:'20px',
    }}>Drivers on Leave</Typography>
    <Paper sx={{  overflow: 'hidden' , marginBottom:4}}>
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
                      {/* {console.log(row.id)} */}
                      const {id} = row
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'leaveButton'
                            ?   <Button
                                variant={mark[index] === 'marked' ? 'contained' : 'outlined'}
                                id="marked"
                                sx={{
                                  border: '1px solid #770043',
                                  borderRadius: '3px',
                                  textTransform: 'capitalize',
                                  mr: 1,
                                  ...(mark[index] === 'marked' ? marked : unmarked),
                                }}
                                onClick={(e) => LeaveMark(id , index, e) }
                              >
                                Leave
                              </Button>
                            : value}
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
                <Button  variant="outlined"
                sx={{
                  color:'#770043',
                  mt:2,
                  mb:2,
                  textTransform:'capitalize',
                  border: '1px solid #770043',
                  boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                  borderRadius: '10px'
                }}>
                  Mark Leave
                </Button>

                </Stack>
                </>
                : null
          }

    </Paper>
    <ToastContainer />
    </>
  );
}