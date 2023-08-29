import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {fetchAllNotifications} from '../../../stateManagement/notficationSlice'

const NotificationSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notifications = useSelector((state) => state.notification.notification.slice(0, 10));

  
    useEffect(() => {
      dispatch(fetchAllNotifications())
    }, [dispatch]);

  return (
    <Box sx={{margin: "0px", overflow: "auto", padding:"0px"}}>
   <Box sx={{borderBottom: "2px solid #770043" , padding : "0px"}}>
   <Box sx={{display: "flex" , justifyContent: "space-between" , padding:"10px" , margin: "0px 10px"}}>
   <Typography sx={{ fontFamily: 'Outfit', fontWeight: "500" , textAlign: "left" , fontSize: "18px" , color: "black"}}>
                Notification Posted
            </Typography>
            <Typography 
            sx={{ fontFamily: 'Outfit', fontWeight: "300",color: "#770043" , cursor: "pointer", textDecoration: "underline"}}
            onClick={()=> navigate("/notification")}
            >
                see more
            </Typography>
   </Box>
   </Box>

   <Box
  sx={{
    height: "250px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    padding: "0px 15px",
     "&::-webkit-scrollbar": {
      width: "6px", 
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white", 
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#ccc", 
    },
  }}
>
  {notifications.map((info) => (
    <Box
      key={info._id} 
      sx={{
        width: "100%",
        display: "flex",
        padding: "10px 0px",
        borderBottom: "1px dotted gray",
      }}
    >
      <Typography sx={{ fontFamily: "Outfit" , flexBasis: "90%", fontSize: "14px", paddingLeft: "15px"}}>
      <Typography sx={{ color: "#770043", fontWeight: "600", fontFamily:"Outfit",padding: 0 , margin: 0}}>
        {info.title}
        </Typography> 
        {info.message}
        
        </Typography>
     
      <Typography
        sx={{
          fontSize: "12px",
          color: "#770043",
          fontFamily: "Outfit",
          flexBasis: "10%"
        }}
      >
        {info.date}
      </Typography>
    </Box>
  ))}
</Box>

    </Box>
  )
}

export default NotificationSection