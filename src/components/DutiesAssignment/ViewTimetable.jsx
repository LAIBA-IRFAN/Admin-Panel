import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import SideBar from "../Sidebar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import Shift1Table from "./Shift1Form.jsx";
import Shift2Table from "./Shift2Form";
import { fetchAllBusIds, fetchAllBuses, fetchAllRoutes, verifyUpdates } from "../../stateManagement/timetableSlice";
import { getAllDrivers } from "../../stateManagement/driverSlice";
import { getAllConductors } from "../../stateManagement/conductorSlice";
import Shift1Form from "./Shift1Form.jsx";
import Shift2Form from "./Shift2Form";
import { useSelector } from "react-redux";
import Shift1Duties from "./Shift1Duties";
import Shift2Duties from './Shift2Duties'
import Shift1Edit from "./Shift1Edit";
import Shift2Edit from "./Shift2Edit";
import DeleteBus from "./DeleteBus";

const ViewTimetable = () => {

    const dispatch = useDispatch()
    
    const [shift , setShift] = React.useState()
    const [selectedId , setSelectedId] = React.useState('');
    const [editModal , setEditModal] = React.useState(false);
    const [deleteModal , setDeleteModal] = React.useState(false);
    const [shift1Form , setShift1Form] = useState(false)
    const [shift2Form , setShift2Form] = useState(false)
    const [shift1Table , setShift1Table] = useState(false)
    const [shift2Table , setShift2Table] = useState(false)
    const [viewModal, setViewModal] = React.useState(false);
    const [verifyShift1 , setVerifyShift1] = React.useState(false)
    const [verifyShift2 , setVerifyShift2] = React.useState(false)
    const navigate = useNavigate()
    const value = useLocation().state;
    const date = new Date();
    const currentdate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    const {buses} = useSelector((state) => state.timetable);

    const VerifyUpdates=async()=>{
        const response = await dispatch(verifyUpdates())
        if(response.payload === "All Updates Verified"){
            toast.success(response.payload)  
            setVerifyShift1(false)
            setVerifyShift2(false)
        }
        else{
            toast.error(response.payload.error)
        }
      }

    const OpenShift1=async()=>{
        const response = await dispatch(fetchAllBuses(1))
        console.log(buses.length)
        if(response.payload.length === 0){
            await dispatch(fetchAllRoutes())
            await dispatch(fetchAllBusIds())
            await dispatch(getAllDrivers())
            await dispatch(getAllConductors())
            setShift1Form(true)
            setViewModal(true)
            setShift2Form(false)
            setShift1Table(false)
            setShift2Table(false)

        }
        else{
            console.log(buses)
            await dispatch(fetchAllBuses(1))
            setShift1Table(true)
            setShift1Form(false)
            setShift2Form(false)
            setShift2Table(false)
        }
    }

    const OpenShift2=async()=>{
        const response = await dispatch(fetchAllBuses(2))
        console.log(response.payload.length)
        // if(buses.length === 0){
        if(response.payload.length === 0){
            await dispatch(fetchAllRoutes())
            await dispatch(fetchAllBusIds())
            await dispatch(getAllDrivers())
            await dispatch(getAllConductors())
            setShift2Form(true)
            setViewModal(true)
            setShift1Form(false)
            setShift1Table(false)
            setShift2Table(false)

        }
        else{
            await dispatch(fetchAllBuses(2))
            setShift2Table(true)
            setShift1Table(false)
            setShift1Form(false)
            setShift2Form(false)
            

        }
    }

    return (
        <>
            <Box sx={{}}>
                <CssBaseline />

                <Stack
                direction="row"
                spacing={2}
                sx={{
                    position:'relative',
                }}
                >
                <Button variant="outlined" 
                sx={{
                color:'black',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                
                }}>
                <CalendarMonthIcon sx={{color:'#770043' , marginRight:1}}/>
                {currentdate}</Button> 
                
                <Button variant="outlined" sx={{
                position:'absolute',
                right:'100px',
                color:'#770043',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                }}
                onClick={OpenShift1}>Shift 1</Button>

               <Button variant="outlined" sx={{
                position:'absolute',
                right:'0',
                color:'#770043',
                border: '1px solid #770043',
                boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                borderRadius: '10px',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '18px',
                textAlign:'center',
                textTransform:'capitalize'
                }}
                onClick={OpenShift2}>Shift 2</Button>
                </Stack>
                <br></br>

                <Box
                    component="main"
                >
                {
                    shift1Form ? 
                  <Shift1Form viewModal={viewModal} setViewModal={setViewModal} setShift1Table={setShift1Table} setShift1Form={setShift1Form}/> : 
                  shift2Form ? 
                   <Shift2Form viewModal={viewModal} setViewModal={setViewModal} setShift2Table={setShift2Table} setShift2Form={setShift2Form}/> : 
                   shift1Table ?
                   <Shift1Duties setSelectedId={setSelectedId} editModal={editModal} setEditModal={setEditModal} deleteModal={deleteModal} setDeleteModal={setDeleteModal} setShift={setShift}/> : 
                   shift2Table ?
                   <Shift2Duties setSelectedId={setSelectedId} editModal={editModal} setEditModal={setEditModal} deleteModal={deleteModal} setDeleteModal={setDeleteModal} setShift={setShift}/> : 
                   null
                }

                  { 
                    
                    shift1Table && editModal ? 
                   <Shift1Edit selectedId={selectedId} editModal={editModal} setEditModal={setEditModal} setShift1Table={setShift1Table} setVerifyShift1={setVerifyShift1}/> : 
                   shift1Table && deleteModal ? 
                   <DeleteBus deleteModal={deleteModal} setDeleteModal={setDeleteModal} selectedId={selectedId} setShift1Table={setShift1Table} setShift2Table={setShift2Table} shift={shift}/> : 
                   shift2Table && editModal ?  
                   <Shift2Edit selectedId={selectedId}  editModal={editModal} setEditModal={setEditModal} setShift2Table={setShift2Table} setVerifyShift2={setVerifyShift2}/> : 
                   shift2Table && deleteModal ?  
                   <DeleteBus deleteModal={deleteModal} setDeleteModal={setDeleteModal} selectedId={selectedId} setShift1Table={setShift1Table} setShift2Table={setShift2Table} shift={shift}/> : 
                   null 
                  }

                  {verifyShift1 ?
                    <Button variant="contained" 
                sx={{
                  mt:6,
                  backgroundColor:'#770043',
                  color:'white',
                  textTransform:'capitalize',
                  width:'200px',
                  fontWeight:500,
                  fontSize:'19px'
                }} 
                onClick={()=> VerifyUpdates()}
            >Verify Updates</Button> : 
            verifyShift2 ?
                    <Button variant="contained" 
                sx={{
                  mt:6,
                  backgroundColor:'#770043',
                  color:'white',
                  textTransform:'capitalize',
                  width:'200px',
                  fontWeight:500,
                  fontSize:'19px'
                }} 
            >Verify Updates</Button> : 
            null
                  }

                   

                </Box>
            
                
            </Box>
            <ToastContainer />
        </>
    )
}

export default ViewTimetable

