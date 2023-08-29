import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import array from "./array";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import { Scrollbar } from 'react-scrollbars-custom';
import { getMessagesOfStudentComplaints , postMessageOfAdminToStudent , changingStatusOfStudentComplaintByAdmin , gettingStatusOfStudentComplaint } from "../../stateManagement/studentChatBoxSlice";
import { getMessagesOfDriverComplaints , postMessageOfAdminToDriver , changingStatusOfDriverComplaintByAdmin , gettingStatusOfDriverComplaint } from "../../stateManagement/driverChatBoxSlice";
import { getMessagesOfConductorComplaints , postMessageOfAdminToConductor , changingStatusOfConductorComplaintByAdmin , gettingStatusOfConductorComplaint } from "../../stateManagement/conductorChatBoxSlice";
import { getMessagesOfEmployeeComplaints , postMessageOfAdminToEmployee , changingStatusOfEmployeeComplaintByAdmin , gettingStatusOfEmployeeComplaint } from "../../stateManagement/employeeChatBoxSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatBox = ({data})=>{

    const dispatch = useDispatch();
    // const previousDate = ''
    // const [previousDate , setPreviousDate] = React.useState('')
    const [messageContent , setMessageContent  ] = React.useState('')
    const [enterMessageCount , setEnterMessageCount] = React.useState(0)

    const Messages = useSelector((state)=>{
        return(
            data.role === 'student' ?
            state.studentChatBox.response : 
            data.role === 'driver' ?
            state.driverChatBox.response : 
            data.role === 'conductor' ?
            state.conductorChatBox.response : 
            state.employeeChatBox.response 

        )
        }) 

        const condition = useSelector((state)=>{
            return(
                data.role === 'student' ?
                state.studentChatBox.condition : 
                data.role === 'driver' ?
                state.driverChatBox.condition : 
                data.role === 'conductor' ?
                state.conductorChatBox.condition : 
                state.employeeChatBox.condition
                )

        })
    

    const enterMessage = async()=>{
        data.role === 'student' ?
        await dispatch(postMessageOfAdminToStudent({studentId:data.id , complainThreadId:data.complainThreadId , messageContent : messageContent}))  : 
        data.role === 'driver' ?
        await dispatch(postMessageOfAdminToDriver({driverId:data.id , complainThreadId:data.complainThreadId , messageContent : messageContent}))  : 
        data.role === 'conductor' ?
        await dispatch(postMessageOfAdminToConductor({conductorId:data.id , complainThreadId:data.complainThreadId , messageContent : messageContent})) : 
        await dispatch(postMessageOfAdminToEmployee({employeeId:data.id , complainThreadId:data.complainThreadId , messageContent : messageContent}))
        
        setMessageContent('')
        setEnterMessageCount(enterMessageCount + 1)
    }

    const MarkResolved = async()=>{
        // console.log('HELLO FROM MARK RESOLVED')
        data.role === 'student' ?
        await dispatch(changingStatusOfStudentComplaintByAdmin({studentId:data.id , complainThreadId:data.complainThreadId}))
        &&
        await dispatch(gettingStatusOfStudentComplaint({studentId:data.id , complainThreadId:data.complainThreadId}))  : 
        data.role === 'driver' ?
        await dispatch(changingStatusOfDriverComplaintByAdmin({driverId:data.id , complainThreadId:data.complainThreadId}))
        &&
        await dispatch(gettingStatusOfDriverComplaint({driverId:data.id , complainThreadId:data.complainThreadId}))  : 
        data.role === 'conductor' ?
        await dispatch(changingStatusOfConductorComplaintByAdmin({conductorId:data.id , complainThreadId:data.complainThreadId}))
        &&
        await dispatch(gettingStatusOfConductorComplaint({conductorId:data.id , complainThreadId:data.complainThreadId}))  : 
        await dispatch(changingStatusOfEmployeeComplaintByAdmin({employeeId:data.id , complainThreadId:data.complainThreadId}))
        &&
        await dispatch(gettingStatusOfEmployeeComplaint({employeeId:data.id , complainThreadId:data.complainThreadId}))   
    }

    useEffect(()=>{
        data.role === 'student' ?
        dispatch(getMessagesOfStudentComplaints({studentId:data.id , complainThreadId:data.complainThreadId}))
        &&
        dispatch(gettingStatusOfStudentComplaint({studentId:data.id , complainThreadId:data.complainThreadId}))  : 
        data.role === 'driver' ?
        dispatch(getMessagesOfDriverComplaints({driverId:data.id , complainThreadId:data.complainThreadId}))
        &&
        dispatch(gettingStatusOfDriverComplaint({driverId:data.id , complainThreadId:data.complainThreadId}))  : 
        data.role === 'conductor' ?
        dispatch(getMessagesOfConductorComplaints({conductorId:data.id , complainThreadId:data.complainThreadId}))
        &&
        dispatch(gettingStatusOfConductorComplaint({conductorId:data.id , complainThreadId:data.complainThreadId})) : 
        dispatch(getMessagesOfEmployeeComplaints({employeeId:data.id , complainThreadId:data.complainThreadId}))
        &&
        dispatch(gettingStatusOfEmployeeComplaint({employeeId:data.id , complainThreadId:data.complainThreadId}))
    }, [data , enterMessageCount])


    return(
        <>
        <Box 
        sx={{
     backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(28, 18, 23, 0.1)',
    borderRadius: '15px',
    width: '58.8%',
    float: 'right',
    height: '88%',
    marginTop: '50px',
    // overflowY: 'scroll',
    position: 'absolute',
    top: '20px', 
    right: '1px', 
    overflow: 'hidden'
    
        }}>
           
            <Stack
            sx={{
                backgroundColor: '#FDFDFD',
                // opacity: '0.3',
                borderBottom: '1px solid #9A9A9A',
                borderRadius: '15px 15px 0px 0px',
                height: '80px',
                padding:'20px'
            }}>
                <Stack direction={'row'}>
                <Stack direction={'column'}>
                <Avatar alt="Travis Howard" src={data.profilePhoto} />

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
                        {data.name}
                    </Typography>

                    <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '23px',
                        color: '#000000'
                    }}>
                        {data.id}
                    </Typography>
                </Stack>
                <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '19px',
                        color: '#9A9A9A',
                        paddingLeft:'15px',
                        paddingTop:'3px'
                    }}>
                        {data.complainThreadId}
                    </Typography>
                    {condition && condition.status === 'Resolved' ?
                    <Button variant="outlined"
                    sx={{
                        background: '#FDFDFD',
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px',
                        width: '181px',
                        height: '56px',
                        float:'right',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 0
                    }}>
                    
                    <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '23px',
                        textAlign: 'center',
                         color: '#770043',
                         marginTop:'5px',
                         textTransform:'capitalize'

                    }}>
                    Resolved
                    </Typography>

                    </Button> : 
                    condition && condition.status === 'Unresolved' ?
                    <Button variant="outlined"
                    onClick={MarkResolved}
                    sx={{
                        background: '#FDFDFD',
                        border: '1px solid #770043',
                        boxShadow: '0px 0px 20px rgba(28, 18, 23, 0.1)',
                        borderRadius: '10px',
                        width: '181px',
                        height: '56px',
                        float: 'right',
                        marginLeft: 'auto',
                        marginRight: 0,
                    }}>
                    <Box
                    sx={{
                        lineHeight: '23px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                         <DoneIcon
                        sx={{
                            color:'#770043',
                            marginRight: '5px'
                        }}
                    />
                    
                    <Typography
                    sx={{
                        fontFamily: 'Outfit',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '18px',
                         color: '#770043',
                         marginTop:'5px',
                         textTransform:'capitalize'

                    }}>

                        Mark resolved
                    </Typography>
                    </Box>

                    </Button>  : 
                    null
                    }  
                </Stack>

            
            </Stack>
            <Scrollbar>
            <Box 
            // sx={{marginBottom:'200px'}}
            >

            {
            
                Messages.map((message , index)=>{
                return(
            <>
            <Stack
            sx={{
                padding:'20px',
            }}>
            <Box 
                sx={{
                    position: 'absolute',
                    width: '5.22px',
                    height: '10.44px',
                    left: '13.05px',
                    top: '0px',
                    backgroundColor: '#F2F2F7',
                    transform: 'matrix(-1, 0, 0, 1, 0, 0)'
                }}
            />
             {message.messageSentFrom === 'student' || message.messageSentFrom === 'driver' ||
             message.messageSentFrom === 'conductor' || message.messageSentFrom === 'employee' ?
             <>
             {/* { 
                previousDate !== message.createdAt.substring(0, 10) && */}
             {/* <Box 
             sx={{
                backgroundColor:'#F2F2F7' , 
                margin:'0 auto' , 
                width:'110px',
                textAlign:'center', 
                borderRadius:'20px'
                }}>
                
            {message.createdAt.substring(0, 10)  }
            
             </Box> */}
             {/* } */}
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '3.48134px 6.96267px 3.48134px 0px',
                width: '289.93px',
                height: '51.02px',
                backgroundColor: '#F2F2F7',
                borderRadius: '0px 5.222px 5.222px 0px'
            }}>

            {message.messageContent}

            </Box>
            </>
            : 
            <>
            {/* {previousDate !== message.createdAt.substring(0, 10) && */}
             {/* <Box 
             sx={{
                backgroundColor:'#F2F2F7' , 
                margin:'0 auto' , 
                width:'110px',
                textAlign:'center', 
                borderRadius:'20px'
                }}>
                
                {message.createdAt.substring(0, 10)  }
             </Box> */}
             {/* } */}
            <Box 
                sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '.48134px 0px 3.48134px 6.96267px',
                width: '289.93px',
                height: '51.02px',
                backgroundColor: '#770043',
                borderRadius: '5.222px 0px 0px 5.222px',
                flex: 'none',
                order: 0,
                flexGrow: 0,
                marginLeft:'auto',
                marginRight:0,
                marginTop:'10px',
                color:'white'
            }}>
            {message.messageContent}
            <DoneAllIcon
                sx={{
                    width: '19px',
                    height: '19px',
                    marginTop:'auto',
                    marginBottom:0,
                    marginLeft:'auto',
                    marginRight:1
                    
                }}
            />
            </Box>
            </>

             }

            </Stack>

            </>)
            })}
            </Box>
            </Scrollbar>

            <Stack direction={'row'}
                sx={{
                    position: 'fixed',
        bottom: 5, 
        marginTop: 'auto',
        marginBottom: 0,
        padding: '8px',
                }}>

            <TextField variant="outlined"
            value = {messageContent}
            onChange= {(e) => setMessageContent(e.target.value) }

            InputLabelProps={{
            shrink: true 
            }} 
            sx={{
                width:'47rem',
                // position:'relative'
            }}
            />

            <IconButton onClick= {enterMessage}>
            <SendIcon 
                sx={{
                    color:'#770043'
                }}
            />
            </IconButton>
            

            </Stack>
            {/* </Scrollbar> */}
        </Box>

        </>
    )

}

export default ChatBox;
