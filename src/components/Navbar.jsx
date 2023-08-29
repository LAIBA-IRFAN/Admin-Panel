import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logoutUser } from '../stateManagement/appSlice';

const IconBorder = {
  background: '#FFFFFF',
  boxShadow: '0px 0px 90px rgba(28, 18, 23, 0.5)',
  borderRadius: '5px',
  marginRight:'10px'

} 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  background: '#FFFFFF',
  border: '0.5px solid rgba(154, 154, 154, 0.3)',
  borderRadius: '15px',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#D9D9D9'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#D9D9D9',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation()
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const dispatch=useDispatch()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={()=>{
        // dispatchFunc(logoutAdminAction())
        dispatch(logoutUser())
        navigate("/")
      }
      }
    >
      <MenuItem onClick={handleMenuClose}>
      <IconButton sx={IconBorder} >
      <LogoutIcon fontSize='small' sx={{color:'#770043'}}/></IconButton>
      Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" 
        color="#770043"
        onClick={()=> navigate('/chat')}>
          <Badge badgeContent={4} 
          color="error"
          >
            <ChatIcon sx={{color:'#770043'}}/>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications">
          <Badge badgeContent={17} >
            <NotificationsIcon sx={{color:'#770043'}}/>
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true" >
          <AccountCircle sx={{color:'#770043'}}/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

    //LOGOUT
    const dispatchFunc = useDispatch();




/////this

    //redirect
    // const store = useSelector(state => state?.user);
    // const {userAuth, loading, serverErr, appErr} = store;

    // React.useEffect(() => {
    //   if(!userAuth){ 
    //     navigate('/') 
    //  }

    // }, [userAuth]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static">  */}
        <Toolbar>
        {/* {console.log(location)} */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{color:'black', display: { xs: 'none', sm: 'block' } }}
          >
            Dashboard
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" 
            onClick={()=> navigate('/chat')}>
              <Badge badgeContent={4} 
              color="error"
              >
                <ChatIcon sx={{color:'#770043'}}/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
            >
              <Badge badgeContent={17} 
              color="error">
                <NotificationsIcon sx={{color:'#770043'}}/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{color:'#770043'}}/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon sx={{color:'#770043'}}/>
            </IconButton>
          </Box>
        </Toolbar>
      {/* </AppBar>  */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
// import React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Container from '@mui/material/Container';

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     outline:'1px solid silver',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: 'white',
//     margin:'0 auto',
//     // width: '200px !imp',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       // width: 'auto',
//     },
//   }));
  
//   const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));
  
//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
//   }));
  
//   export default function Navbar() {
//     return (
//       <Box sx={{ flexGrow: 1}}>
//         <AppBar position="static" 
//         sx={{
//         backgroundColor:'white',
//         // width:'70%',
//         // float:'right',
//         width:'69.30rem',
//         marginLeft:'240px'
//         }}>
//           <Toolbar>
//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{ color:'black',flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//             >
//               Dashboard
//             </Typography>
//             <Search sx={{marginRight:'40%',width:'30%'}}>
//               <SearchIconWrapper>
//                 <SearchIcon color='disabled' />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search students"
//                 inputProps={{ 'aria-label': 'search' }}
//                 sx={{color:'silver'}}
//               />
//             </Search>
//             <IconButton>
//               <ListAltIcon/>
//             </IconButton>
//             {/* <Typography variant='p' sx={{color:'black',marginTop:'35px',marginLeft:'-30px'}}>Complaints</Typography> */}
//             {/* <Container> */}
//             <IconButton>
//               <NotificationsIcon/>
//             </IconButton>
//             {/* <Typography variant='p' sx={{color:'black'}}>Notifications</Typography> */}
//             {/* </Container> */}
//           </Toolbar>
//         </AppBar>
//       </Box>
//     );
//   }