import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import admin from '../icons/admin.png'
import analytics from '../icons/analytics.png'
import bus from '../icons/bus.png'
import conductor from '../icons/conductor.png'
import driver from '../icons/driver.png'
import routes from '../icons/routes.png'
import student from '../icons/student.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Navbar from './Navbar'
import { Scrollbar } from 'react-scrollbars-custom';
import { useSelector } from 'react-redux';


const drawerWidth = 220;

const IconBorder = {
  background: '#FFFFFF',
  boxShadow: '0px 0px 90px rgba(28, 18, 23, 0.5)',
  borderRadius: '5px'

} 

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [select , setSelect] = React.useState({})
  const [open, setOpen] = React.useState(true);
  const [width , setWidth] = React.useState(window.innerWidth)
  const {buses} = useSelector((state) => state.timetable);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Click = (text , index ,e) => {
    text === 'Driver' ? 
    navigate('/drivers') : 
    text === 'Students' ?
    navigate('/students') : 
    text === 'Analytics' ? 
    navigate('/analytics') : 
    text === 'Conductor' ?
    navigate('/conductors') :
    text === 'Bus' ?
    navigate('/buslist') :
    text === 'Timetable' ?
    navigate('/viewtimetable') :
    text === 'Routes' ? 
    navigate('/timetable') :  
    text === 'Notification' ? 
    navigate('/notification') :  
    text === 'Sub Category' ? 
    navigate('/subcategory') :  
    text === 'Employee' ? 
    navigate('/employee') :  
    text === 'Admins' ? 
    navigate('/admin') : 
    text === 'Category' ? 
    navigate('/category') : 
    null

    console.log(text)
    setSelect({[index]:true})
    console.log(select)

  }

  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 900 ? handleDrawerClose() : handleDrawerOpen();
    };
  
    window.addEventListener('resize', handleResize); 
  
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (

    <Box sx={{ display: 'flex' }}>
   
       <CssBaseline />
      <AppBar position="fixed" open={open}
      sx={{background: '#FFFFFF',
boxShadow: '0px 0px 10px rgba(28, 18, 23, 0.1)',
borderRadius: '1px'}}>
      <Navbar />

      </AppBar>
      <Drawer variant="permanent" open={open}>
        {/* <DrawerHeader>
          <IconButton 
          // onClick={handleDrawerClose}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader> */}
        {/* <Divider /> */}
        <Container>

        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop:'15px', marginBottom:'10px'}}>
<IconButton sx={{backgroundColor:'silver',outline:'1px solid #770043',}}>
    <PersonIcon sx={{color:'white'}}/>
 </IconButton>
 </Box>
 {
  open && 
  <Typography variant='h6' sx={{marginTop:'8px',textAlign:'center' , marginBottom:'16px'}}>
 Admin
  </Typography>
 }
 </Container>
        <List>
          {['Admins','Analytics', 'Students', 'Routes','Timetable', 'Bus', "Category", "Sub Category",'Driver', 'Conductor' ,'Notification',"Employee"]
          .map((text, index) => (
            <>
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor:select[index] ? '#770043' : 'inherit'
                }}
                onClick={(e)=>Click(text, index ,e)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text === 'Analytics' ?<IconButton sx={IconBorder}><img src={analytics}/></IconButton>  :
                  text === 'Students' ? <IconButton sx={IconBorder}><img src={student}/></IconButton> :
                  text === 'Admins' ? <IconButton sx={IconBorder}><img src={admin}/></IconButton> :
                  text === 'Bus' ? <IconButton sx={IconBorder}><img src={bus}/></IconButton>:
                  text === 'Routes' ? <IconButton sx={IconBorder}><img src={routes}/></IconButton> :
                  text === 'Sub Category' ? <IconButton sx={IconBorder}><img src={conductor}/></IconButton> :
                  text === 'Category' ? <IconButton sx={IconBorder}><img src={conductor}/></IconButton> :
                  text === 'Conductor' ? <IconButton sx={IconBorder}><img src={conductor}/></IconButton> :
                  text === 'Timetable' ? <IconButton sx={IconBorder}><img src={conductor}/></IconButton> :
                  text === 'Driver' ? <IconButton sx={IconBorder}><img src={driver}/></IconButton> : 
                  // text === 'Drver' ? <IconButton sx={IconBorder}><img src={driver}/></IconButton> : 
                  text === 'Notification' ? <IconButton sx={IconBorder}><NotificationsIcon fontSize='small' sx={{color:'#770043'}}/></IconButton> :
                  text === 'Employee' ? <IconButton sx={IconBorder}><NotificationsIcon fontSize='small' sx={{color:'#770043'}}/></IconButton> :
                  <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} 
                sx={{fontFamily: 'Outfit', fontStyle: 'normal',fontWeight: 400, fontSize: '24px',
                    color:select[index] ? 'white' : 'black', opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider />
            </>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
