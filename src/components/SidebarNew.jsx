import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
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
import Box from '@mui/material/Box';

const drawerWidth = 240;

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

export default function SidebarNew() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [select , setSelect] = React.useState({})
  const [open, setOpen] = React.useState(true);
  const [width , setWidth] = React.useState(window.innerWidth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Click = (text , index ,e) => {
    text === 'Driver' ? 
    navigate('/driver') : 
    text === 'Students' ?
    navigate('/students') : 
    text === 'Analytics' ? 
    navigate('/main') : 
    text === 'Conductor' ?
    navigate('/conductor') : 
    text === 'Sub Categories' ?
    navigate('/subcategory') :
    null

    console.log(text)
    setSelect({[index]:true})
    console.log(select)

  }

  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 700 ? handleDrawerClose() : handleDrawerOpen();
    };
  
    window.addEventListener('resize', handleResize); 
  
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
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

        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop:'10px', marginBottom:'10px'}}>
<IconButton sx={{backgroundColor:'silver',outline:'1px solid #770043',}}>
    <PersonIcon sx={{color:'white'}}/>
 </IconButton>
 </Box>
 {
  open &&
  <Typography variant='h6' sx={{marginTop:'8px',textAlign:'center'}}>
 Admin
  </Typography>
 }
 </Container>
        <List>
          {['Analytics', 'Students', 'Employee', 'Categories', 'Sub Categories', 'Driver', 'Conductor', 'Notification', 'Logout']
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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

// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import CssBaseline from '@mui/material/CssBaseline';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: '100px',
//   height:window.innerHeight,
//   marginLeft:0,
//   marginRight:'auto',
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: '100px',
//     height:window.innerHeight,
//     marginLeft:0,
//     marginRight:'auto',
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     // marginRight: drawerWidth,
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-start',
// }));

// export default function SidebarNew() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   React.useEffect(()=>{
//     window.innerWidth < 700 ? handleDrawerOpen : handleDrawerClose
//   } , []
//   )

//   return (
//     <Box sx={{ display: 'flex' }}>
//     {/* {console.log(window.innerWidth)} */}
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           {/* <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
//             Persistent drawer
//           </Typography> */}
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerClose}
//             sx={{ ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//     </Box>
//   );
// }

// import React from 'react';
// import './SidebarNew.css';
// import toggleicon from "../assets/more.png"
// import NEDLogo from "../assets/NEDUET_logo.png"
// import menulogos from "../assets/graduation.png"
// import { NavLink } from 'react-router-dom';
// const SidebarNew = ({children}) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const menuItem=[
//     {
//         path:"/",
//         name:"Dashboard"
//     },
//     {
//         path:"/about",
//         name:"About",
       
//     },
//     {
//         path:"/analytics",
//         name:"Analytics",

//     },
//     {
//         path:"/comment",
//         name:"Comment",
       
//     },
//     {
//         path:"/product",
//         name:"Product",
      
//     },
//     {
//         path:"/productList",
//         name:"Product List",
//     }
        
// ]

// console.log("sii",isOpen)
//   return (
//   <div className='main_container'>
//       <div className={isOpen?"sidebar_container_open":"sidebar_container"}>
//       <div className={isOpen?"sidebar_topdiv_open":'sidebar_topdiv'}>
//           <img style={{display: isOpen ? "block" : "none"}}  src={NEDLogo} height={25} width={25}/>
//           <img     src={toggleicon} height={25} width={25}  onClick={()=>setIsOpen(!isOpen)}/>
//       </div>
//       <div className='items_container'>
//    <div className='main_section'>
    
//    {menuItem.map((item,index)=>
          
//           <NavLink to={item.path} key={index} className="link" >
//               <div className='each_item'>
//                 <img   src={menulogos} height={40} width={40}/>
//                 <p style={{display: isOpen ? "inline" : "none"}}>{item.name}</p>
//               </div>
//           </NavLink>
//         )
//         }
//    </div>

//       </div>

     
//     </div>
//     <main>{children}</main>
//   </div>
//   );
// };

// export default SidebarNew;
