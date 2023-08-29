import React from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ChatBox from "./ChatBox";
import { Scrollbar } from 'react-scrollbars-custom';
import CircularProgress from '@mui/material/CircularProgress';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentComplaints } from "../../stateManagement/chatListSlice";
import { getAllDriverComplaints } from "../../stateManagement/chatListSlice";
import { getAllConductorComplaints } from "../../stateManagement/chatListSlice";
import { getAllEmployeeComplaints } from "../../stateManagement/chatListSlice";

const ChatList=()=>{
    // const [value , setValue ] = React.useState(false);
    const [data , setData] = React.useState({
        profilePhoto:'',
        name:'',
        roleId:'',
        id:'',
        complainThreadId:'',
        role:''
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLoading , setIsLoading] = React.useState(false)
    const [selectValue , setSelectValue] = React.useState('student')
    const [filterCondition , setFilterCondition] = React.useState('')

    const dispatch = useDispatch()

    const chatList = useSelector((state)=>{
        return state.chatList.response;
    })

    const SelectValue=(event)=>{
        setSelectValue(event.target.value)   
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };  
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const GetComplaints=(condition)=>{
        setIsLoading(true)
        selectValue === 'student' ?
        dispatch(getAllStudentComplaints(condition)) : 
        selectValue === 'driver' ?
        dispatch(getAllDriverComplaints(condition)) : 
        selectValue === 'conductor' ?
        dispatch(getAllConductorComplaints(condition)) : 
        dispatch(getAllEmployeeComplaints(condition))
        setIsLoading(false)

        setFilterCondition(condition)

    }
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    

    return(
        <>
        { data.profilePhoto !== '' && data.name !== '' && data.id !== '' && data.complainThreadId !== '' && data.role !== '' ?
        <ChatBox data={data}/>
        : null
        }

        <Box sx={{
            marginTop:'-33px', 
            marginLeft:'-20px'
        }}>
        <Stack 
        sx={{
            borderRadius: '0px 30px 0px 0px',
            
        }}>
        <Stack direction={'row'} 
        spacing={5}>
        <Stack direction={'row'}
        // spacing={10}
        sx={{
            padding:'15px',
        }}
        >
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/NEDUET_logo.svg/800px-NEDUET_logo.svg.png"
            width={'80'}
            height={'80'}
        />
        <select id="select" name="options" 
        style={{height:'30px', marginTop:'30px' , marginLeft:'40px'}} onChange={SelectValue}>
          <option value="student">Students</option>
          <option value="driver">Drivers</option>
          <option value="conductor">Conductors</option>
          <option value="employee">Employees</option>
        </select>
        </Stack>
        
        
        </Stack>
        <TextField 
        id="outlined-basic" variant="outlined" size="small"
        InputProps={{
        startAdornment: (
        <IconButton>
        <SearchIcon/>
        </IconButton>
        ),
        placeholder: "Search" ,
        endAdornment: (
        <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        <TuneIcon sx={{ color:"#770043" }}/>
        </IconButton>        
        ),
        
        }}
          
          sx={{
            width:'300px',
            marginLeft:'8px',
            marginBottom: '5px'
          }}
        />
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
            // padding:'30px'
        }}
      >
      {
        ['resolved' , 'unresolved' ].map((condition,index)=>{
        return(
            <>
            <Box sx={{
                paddingLeft:'20px',
                paddingRight:'20px'
            }}>
            <Button variant="text"
            onClick={()=>GetComplaints(condition)}
            sx={{
                color:'black',
                textTransform:'capitalize'
            }}>
            <Typography variant="body1" gutterBottom>{condition}</Typography>
            <Divider/> 

            </Button>
            </Box>
            </>
            
        )
      }
            
      )

      }
        
      </Popover>
        </Stack>
        <Stack direction={'column'}
        sx={{
            backgroundColor:'white',
            height:'63%',
            width:'25%', 
            paddingLeft:'3%',
            // overflowY: 'scroll',
            position:"absolute"
   
        }}>
        <Scrollbar 
        // style={{ width: 250, height: 250 }}
        >
        <Typography variant="body1" gutterBottom
        sx={{
            color:'#770043',
            fontFamily: 'Outfit',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '15px',
            marginTop:'15px'
        }}>
        Filtered by {filterCondition}
      </Typography>
      {/* <CircularProgress value={isLoading}/> */}
      {
        chatList.map((element,index)=>
        {
            return(
                <>
                <div
                sx={{
                    padding:'20px'
                }}
                onClick={()=> {
                        setData({
                profilePhoto:selectValue === 'student' ? 
                element?.student?.profilePhoto  : 
                selectValue === 'driver' ? 
                element?.driver?.profilePhoto  : 
                selectValue === 'conductor' ?
                element?.conductor?.profilePhoto : 
                element?.employee?.profilePhoto,
                name:selectValue === 'student' ? 
                element?.student?.name  : 
                selectValue === 'driver' ? 
                element?.driver?.name  : 
                selectValue === 'conductor' ?
                element?.conductor?.name : 
                element?.employee?.name,
                roleId:selectValue === 'student' ? 
                element?.student?.studentId  : 
                selectValue === 'driver' ? 
                element?.driver?.driverId  : 
                selectValue === 'conductor' ?
                element?.conductor?.conductorId : 
                element?.employee?.employeeId,
                id:selectValue === 'student' ? 
                element?.studentId : 
                selectValue === 'driver' ? 
                element?.driverId  : 
                selectValue === 'conductor' ?
                element?.conductorId : 
                element?.employeeId,
                complainThreadId:element.complainThreadId,
                role:selectValue === 'student' ? 
                'student'  : 
                selectValue === 'driver' ? 
                'driver'  : 
                selectValue === 'conductor' ?
                'conductor' : 
                'employee',
                        })
                    }
                    
                    }>
                <Box sx={{paddingTop:'20px', paddingBottom:'20px'}}>
                <Stack direction={'row'}>
                <Stack direction={'column'}>
                <Avatar alt="Travis Howard" 
                src={selectValue === 'student' ? 
                element?.student?.profilePhoto  : 
                selectValue === 'driver' ? 
                element?.driver?.profilePhoto  : 
                selectValue === 'conductor' ?
                element?.conductor?.profilePhoto : 
                element?.employee?.profilePhoto  }  />

                </Stack>

                <Stack direction={'column'}
                sx={{
                    paddingLeft:'10px'
                }}>
                    <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        fontSize: '18px',
                        lineHeight: '23px',
                        color: '#000000'
                    }}>
                       {selectValue === 'student' ? 
                element?.student?.name  : 
                selectValue === 'driver' ? 
                element?.driver?.name  : 
                selectValue === 'conductor' ?
                element?.conductor?.name : 
                element?.employee?.name }
                    </Typography>

                    {/* <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '23px',
                        color: '#000000'
                    }}>
                   {selectValue === 'student' ? 
                element?.student?.studentId  : 
                selectValue === 'driver' ? 
                element?.driver?.driverId  : 
                element?.conductor?.conductorId }
                    </Typography> */}
                    <Stack direction={'column'}>

                    <Chip label= {`${element.complainThreadId}`}
                    sx={{
                        marginTop:'5px',
                        marginBottom:'3px'
                    }}
                    />

                    </Stack>
                </Stack>
                </Stack>
                </Box>
                </div>
            
                <Divider variant="inset" /> 
                </>
            )
        }
        

        )
      }
      </Scrollbar>
        </Stack> 
        {/* </Stack> */}
        </Box>
        </>
    )

}

export default ChatList;

