import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ComplainSection = () => {
    const navigate = useNavigate()

    const Array = [
        {
            user: "Laiba (Student)",
            message : "Point 6 are Non functional TodayPoint 6 are Non functional TodayPoint 6 are Non functional TodayPoint 6 are Non functional Today",
            date: "12-03-2012"
        },
        {
            user: "Ali (Drriver)",
            message : "Off timings will be 4:50 today",
            date: "22-11-2016"
        },
        {
            user: "Mushtaq (Conductor)",
            message : "Point fee submission deadline is 5th of this month ",
            date: "23-05-2023"
        },
        {
            user: "Nimra (Student)",
            message : "Point 3 & 4 is merged until 20th of this month",
            date: "09-03-2022"
        },
        {
            user: "Rameesha (Student)",
            message : "Point 3 & 4 is merged until 20th of this month",
            date: "09-03-2022"
        },{
            user: "Laiba (Student)",
            message : "Point 3 & 4 is merged until 20th of this month",
            date: "09-03-2022"
        },{
            user: "Laiba (Student)",
            message : "Point 3 & 4 is merged until 20th of this month",
            date: "09-03-2022"
        },
        
    ]
  return (
    <Box sx={{margin: "14px", overflow: "auto"}}>
   <Box sx={{display: "flex" , justifyContent: "space-between" }}>
   <Typography sx={{ fontFamily: 'Outfit', fontWeight: "500" , textAlign: "left" , fontSize: "18px" , color: "black"}}>
                Complain Received
            </Typography>
            <Typography 
            sx={{ fontFamily: 'Outfit', fontWeight: "300",color: "#770043" , cursor: "pointer", textDecoration: "underline"}}
            onClick={()=> navigate("/chat")}
            >
                see more
            </Typography>
   </Box>
   <hr/>

   <Box
  sx={{
    height: "250px",
    overflowY: "auto",
    scrollbarWidth: "thin", 
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
  {Array.map((info) => (
    <Box sx={{ borderBottom: "1px dotted gray", padding: "10px 0px",}}>
    <Box
      key={info.id} 
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <Typography
    sx={{
        color: "#770043",
        fontWeight: "600",
        fontFamily:"Outfit",
        flexBasis: "82%"
    }}
    >{info.user}</Typography>
      <Typography
        sx={{
          fontSize: "12px",
          color: "#770043",
          fontFamily: "Outfit",
          flexBasis: "18%"
        }}
      >
        {info.date}
      </Typography>
    </Box>
    <Typography sx={{ fontFamily: "Outfit", fontSize: "14px"}}>{info.message}</Typography>
    </Box>
  ))}
</Box>

    </Box>
  )
}

export default ComplainSection