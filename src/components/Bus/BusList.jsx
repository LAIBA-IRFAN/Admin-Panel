import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from "../Navbar";
import CssBaseline from '@mui/material/CssBaseline';
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
import { fetchCategories } from '../../stateManagement/CategorySlice';
import BusTable from './BusTable';
import DeleteSingleBus from './DeleteSingleBus';
import AddBus from './AddBus';

const BusList=()=>{
    const dispatch = useDispatch()
    const [viewModal , setViewModal] = React.useState(false)
    const [deleteModal , setDeleteModal] = React.useState(false)
    const [selectedId , setSelectedId] = React.useState('');
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })


    const AddBusID=async()=>{
        console.log('ADD STUDENT TEST')
        setViewModal(true)
    }

    return(
        <>
            {viewModal && <AddBus viewModal={viewModal}  setViewModal={setViewModal}/>}
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
                        onClick={AddBusID }>+Add a Bus ID</Button>

                      {/* <Button variant="contained" sx={{
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
                 </Menu> */}
                        
           
            
                <BusTable setDeleteModal={setDeleteModal} selectedId={selectedId} setSelectedId={setSelectedId}/>
            
            <br></br>
            {/* {
                filter1 === false && filter2 === false &&
                <Button variant="contained" endIcon={<SendIcon />}
            onClick={FeesStatusChange}
            >  Send</Button>
            } */}
            <br></br><br></br>
            {
                deleteModal ?
                <DeleteSingleBus selectedId={selectedId} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/> : 
                null
            }
    </>
    )

}

export default BusList;