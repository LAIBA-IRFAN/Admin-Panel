import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashboardRoutes from './DashboardRoutes';
export const PrivateRoutes = () => {
    const isUser = useSelector((state) => state.user.auth.userLoggedin)
    console.log("🚀 ~ file: PrivateRoutes.jsx:5 ~ PrivateRoutes ~ isUser:", isUser)
    return (

    isUser ? 

   <DashboardRoutes/>
    : 
    <Navigate to='/'/>
  )
}