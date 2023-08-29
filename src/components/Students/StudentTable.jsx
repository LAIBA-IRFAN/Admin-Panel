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

const StudentTable = ({ filter1 ,filter2 , studentIds , setStudentIds , setEditModal , setDeleteModal, selectedId , setSelectedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {pending , paid , Unpaid} = useSelector((state) => state.student);


  useEffect(() => {
    dispatch(getPendingFeesStudents());
    dispatch(getPaidFeesStudents())
    dispatch(getUnpaidFeesStudents())
  }, [dispatch]);


  const EditAStudent = async(id) => {
    console.log(id)
    const response = await dispatch(getSingleStudent(id))
    await dispatch(fetchAllDisciplines())
    await dispatch(fetchAllBatches())
    await dispatch(fetchCategories())
    console.log(response)
    if(response && response.payload){
      setEditModal(true);
      setSelectedId(id)
    }
  };

  const DeleteAStudent = (id) => {
    setSelectedId(id)
    setDeleteModal(true)
  };

  const CheckBox=(e,id)=>{
    e.target.checked &&
    setStudentIds((oldObject)=>{
      return{
        studentIds:[...oldObject.studentIds , id],
        // studentIds:[id]
        
      }
    }) 

    console.log(studentIds)
  }



  const columns = [
    { id: 'student_id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Full Name', minWidth: 100 },
     filter1 === false && filter2 === false && { id: 'pending_status', label: 'Status', minWidth: 100 } ,
     filter1 && { id: 'paid_status', label: 'Status', minWidth: 100 } , 
     filter2 && { id: 'Unpaid_status', label: 'Status', minWidth: 100 } , 
    { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
  ];

  function createData1(student_id, name, pending_status, action , id) {
    return { student_id, name, pending_status, action , id };
  }

  function createData2(student_id, name, paid_status , action , id) {
    return { student_id, name, paid_status , action , id};
  }

  function createData3(student_id, name, Unpaid_status , action , id) {
    return { student_id, name, Unpaid_status , action , id};
  }

  const rows = 
  filter1 ?
  paid.map((student) =>
  createData2( student.studentId, student.name, 'status' , 'action' , student.id)
  ) : 
  filter2 ?
  Unpaid.map((student) =>
  createData3( student.studentId, student.name, 'status' , 'action' , student.id)
  ) : 
  pending.map((student) =>
        createData1( student.studentId, student.name, 'status' , 'action' , student.id)
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
                          {column.id === 'pending_status' ? (
                            <>
                            <Checkbox onChange={(e)=>CheckBox(e,id)}/>
                            <Button variant="contained">Pending</Button>
                            </>
                          ) : column.id === 'paid_status' ? (
                            <>
                            <Button variant="contained">Paid</Button>
                            </>
                          ) : column.id === 'Unpaid_status' ? (
                            <>
                            <Button variant="contained">Unpaid</Button>
                            </>
                          ) :column.id === 'action' ? (
                            <>
                              <IconButton onClick={() => EditAStudent(id)}>
                                <EditIcon sx={{ color: '#770043' }} />
                              </IconButton>
                              <IconButton onClick={() => DeleteAStudent(id)}>
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

export default StudentTable;
