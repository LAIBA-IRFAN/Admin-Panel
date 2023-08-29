import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from "../Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import InfoTable from "./StudentTable";
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { feesStatusChangedByAdmin, fetchAllBatches, fetchAllDisciplines, getPaidFeesStudents, getPendingFeesStudents, getUnpaidFeesStudents } from '../../stateManagement/studentSlices';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent'
import DeleteStudent from './DeleteStudent';
import { fetchCategories } from '../../stateManagement/CategorySlice';

const StudentList=()=>{
    const dispatch = useDispatch()
    const [viewModal , setViewModal] = React.useState(false)
    const [studentIds, setStudentIds] = React.useState({studentIds:[]})
    const [editModal , setEditModal] = React.useState(false)
    const [deleteModal , setDeleteModal] = React.useState(false)
    const [filter1 , setFilter1] = React.useState(false)
    const [filter2 , setFilter2] = React.useState(false)
    const [selectedId , setSelectedId] = React.useState('');
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    const PaidFeesStudents=async()=>{
        await dispatch(getPaidFeesStudents())
        popupState.close
        setFilter1(true)
        setFilter2(false)
        
    }

    const UnpaidFeesStudents=async()=>{
        await dispatch(getUnpaidFeesStudents())
        popupState.close
        setFilter2(true)
        setFilter1(false)
        
    }

    const CloseFilter =()=>{
        setFilter1(false)
        setFilter2(false)

    }

    const FeesStatusChange=async()=>{
        await dispatch(feesStatusChangedByAdmin(studentIds))
        console.log('TEST')
        await dispatch(getPendingFeesStudents())
    }

    const AddStudentButton=async()=>{
        console.log('ADD STUDENT TEST')
        await dispatch(fetchCategories())
        await dispatch(fetchAllBatches())
        await dispatch(fetchAllDisciplines())
        setViewModal(true)
    }

    return(
        <>
            {viewModal && <AddStudent viewModal={viewModal}  setViewModal={setViewModal}/>}
            <Button variant="contained" sx={{
                        color: 'white',
                        backgroundColor: '#770043',
                        marginLeft: 'auto',
                        marginRight: 1,
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
                        onClick={AddStudentButton }>+Add a Student</Button>

                      <Button variant="contained" sx={{
                        color: '#770043',
                        backgroundColor: 'white',
                        marginLeft: '0',
                        marginRight: 'auto',
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
     
                        '&:hover': {
                            backgroundColor: '#ffffff',
                            color: "#770043",
                            border: "1px solid #770043"
                        },
                    }}
                        onClick={() => navigate("/add-driver")}
                        {...bindTrigger(popupState)}>
                        {filter1 ? 
                        <>
                          <Typography>
                          Paid Fees Students
                          </Typography> 
                         <IconButton onClick={CloseFilter}>
                      <CloseIcon/>
                      </IconButton>
                      </>
                        : 
                        filter2 ? 
                        <>
                          <Typography>
                          Unpaid Fees Students
                          </Typography> 
                         <IconButton onClick={CloseFilter}>
                      <CloseIcon/>
                      </IconButton>
                      </>
                        :
                        <Typography>
                        Filter
                          </Typography> 
                      

                        }
                        
                        </Button>
        <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={PaidFeesStudents}>Paid Fees Students</MenuItem>
        <MenuItem onClick={UnpaidFeesStudents}>Unpaid Fees Students</MenuItem>
                 </Menu>
                        
           
            
                <InfoTable filter1={filter1} filter2={filter2} studentIds={studentIds} setStudentIds={setStudentIds} setEditModal={setEditModal} setDeleteModal={setDeleteModal} selectedId={selectedId} setSelectedId={setSelectedId}/>
            
            <br></br>
            {
                filter1 === false && filter2 === false &&
                <Button variant="contained" endIcon={<SendIcon />}
            onClick={FeesStatusChange}
            >  Send</Button>
            }
            <br></br><br></br>
            {
                editModal ? 
                <EditStudent editModal={editModal} setEditModal={setEditModal} selectedId={selectedId}/> : 
                deleteModal ?
                <DeleteStudent selectedId={selectedId} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/> : 
                null
            }
    </>
    )

}

export default StudentList;