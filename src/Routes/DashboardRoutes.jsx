import React from 'react';
import Box from '@mui/material/Box';
import { Outlet , useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function DashboardRoutes() {
  const location = useLocation();
  const [value, setValue] = useState(false);
  const [margin, setMargin] = useState('240px')
  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 900 ? setMargin('100px') : setMargin('240px')
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          marginTop: '100px',
          marginLeft: margin
        }}>
        <Sidebar />
        <Outlet />
      </Box>
    </>
  );
}