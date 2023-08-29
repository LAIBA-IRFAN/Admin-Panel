import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Box } from "@mui/material"
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../API/postAPI";
import { FaLock } from "react-icons/fa"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {toast , ToastContainer} from "react-toastify"
import IconButton from '@mui/material/IconButton';
import { ClipLoader } from "react-spinners";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const formik = useFormik({
    initialValues: {
      adminId: '',
      adminPassword: '',
    },
    onSubmit: values => {
      if (!values.adminId || !values.adminPassword) {
        toast.error('Please fill in all the fields.');
        setLoading(false);
        return;
      }
  
      console.log('va', values);
      setLoading(true);
      dispatch(loginApi(values))
        .then((res) => {
          // console.log("resssss", res)
          if (res.meta.requestStatus === 'rejected') {
            toast.error('Error Signing In');
            setLoading(false);
            return;
            // throw new Error(res.meta.payload)
          } else {
            console.log('hello');
            setLoading(false);
            navigate('/analytics');
          }
        })
        .catch((e) => {
          console.log('ooops login failed', e);
        });
    },
  });


  return (
    <Box sx={{ backgroundColor: '#770043', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={formik.handleSubmit}>
        <Container sx={{ display: 'flex', flexDirection: 'column', height: 'auto', width: {md: "450px" , xs:"300px"}, backgroundColor: 'white', borderRadius: "25px", fontFamily: "Outfit", padding: "10%" }}>

          <Typography variant="h5" gutterBottom
            sx={{ marginTop: '3%', fontFamily: "Outfit", color: "#770043" }}>
            Login
          </Typography>

          <Typography variant="body1" gutterBottom
            sx={{ marginTop: '3%', fontFamily: "Outfit" }}>
            Enter your e-mail and password to continue
          </Typography>

          {/* display err */}
          {/* {serverErr || appErr ? <h2 className = "error">{serverErr} {appErr}</h2>: null} */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            <TextField
              id="outlined"
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                fontFamily: 'Outfit',
                margin: '5px',
                width: '100%',
              }}
              value={formik.values.adminId}
              onChange={formik.handleChange('adminId')}
              onBlur={formik.handleBlur('adminId')}
              type="text"
              name="adminId"
              placeholder="Enter UserID"
              inputProps={{
                style: {
                  fontFamily: 'Outfit',
                  fontSize: '16px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon size="20px" color="gray" />
                  </InputAdornment>
                ),
                style: {
                  fontFamily: 'Outfit',
                  fontSize: '16px',
                },
              }}
            />

            <TextField
              id="outlined"
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                fontFamily: 'Outfit',
                display: 'flex',
                justifyContent: 'center',
                margin: '5px',
                width: '100%',
              }}
              value={formik.values.adminPassword}
              name="adminPassword"
              onChange={formik.handleChange('adminPassword')}
              onBlur={formik.handleBlur('adminPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              inputProps={{
                style: {
                  fontFamily: 'Outfit',
                  fontSize: '16px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock size="20px" color="gray" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  fontFamily: 'Outfit',
                  fontSize: '16px',
                },
              }}
            />
            {loading ? (
              <Button variant="contained"
                disabled
                sx={{
                  color: 'white',
                  backgroundColor: '#770043',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  fontSize: '18px',
                  fontFamily: "Outfit",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#770043",
                    border: "1px solid #770043"
                  }
                }}>
                {<ClipLoader color="#770043" size="18px"/>}
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: 'white',
                  backgroundColor: '#770043',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  fontSize: '18px',
                  fontFamily: "Outfit",
                  width: "100%",
                  margin: "5px auto",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#770043",
                    border: "1px solid #770043"
                  }
                }}
              >
                Login
              </Button>

            )}
          </Box>


        </Container>
      </form>
      <ToastContainer/>
    </Box>

  )

}

export default Login;