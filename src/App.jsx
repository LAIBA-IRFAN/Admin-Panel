import React from "react";
import "./App.css";
import { useEffect } from "react";
import AddRoute from "./components/Schedule/AddRoute";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./components/Students/StudentList";
import Analytics from "./components/Analytics/Analytics";
import Login from "./Pages/Login";
import { PrivateRoutes } from "./Routes/PrivateRoutes";
import ChatList from "./components/Chat/ChatList";
import DriverList from "./components/Driver/DriverList";
import AddNewDriver from "./components/Driver/AddNewDriver";
import EditDriver from "./components/Driver/EditDriver";
import AddNewConductor from "./components/Conductor/AddNewConductor";
import MarkAttendance from './components/Driver/MarkAttendance';
import ViewAttendanceStats from './components/Driver/ViewAttendanceStats'
import EditConductor from "./components/Conductor/EditConductor";
import Schedule from "./components/Schedule/Schedule";
import NotificationList from "./components/Push-Notification/NotificationList";
import ConductorList from "./components/Conductor/ConductorList";
import ViewTodaysAttendance from "./components/Driver/ViewTodaysAttendance";
import SubCategoryList from '../src/components/SubCategory/SubCategoryList';
import AddBatch from '../src/components/SubCategory/Batch/AddBatch';
import EditBatch from '../src/components/SubCategory/Batch/EditBatch';
import AddDiscipline from '../src/components/SubCategory/Discipline/AddDiscipline';
import EditDiscipline from '../src/components/SubCategory/Discipline/EditDiscipline';
import MarkAttendanceConductor from "./components/Conductor/MarkAttendanceConductor";
import ViewAttendanceStatsConductor from "./components/Conductor/ViewAttendanceStatsConductor";
import ViewTodaysAttendanceConductor from "./components/Conductor/ViewTodaysAttendanceConductor";
import ViewTimetable from "./components/DutiesAssignment/ViewTimetable";
// import Shift1Duties from "./components/DutiesAssignment/Shift1Duties";
import EmployeeList from '../src/components/Employee/EmployeeList';
import Admin from "../src/components/Admin/AdminTable"
import Category from "../src/components/Category/CategoryTable"
import BusList from "./components/Bus/BusList";



function App() {
  const isUser = useSelector((state) => state.user.auth.userLoggedin);
  console.log("🚀 ~ file: App.jsx:103 ~ App ~ isUser:", isUser);
  useEffect(() => { }, []);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
                    
          <Route path="/admin" element={<Admin />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/drivers" element={<DriverList />} />
          <Route path="/add-driver" element={<AddNewDriver />} />
          <Route path="/edit-driver/:id" element={<EditDriver />} />
          <Route path="/add-conductor" element={<AddNewConductor />} />
          <Route path="/edit-conductor/:id" element={<EditConductor />} />
          <Route path="/timetable" element={<Schedule />} />
          <Route path="/conductors" element={<ConductorList />} />
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/subcategory" element={<SubCategoryList />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/add-batch" element={<AddBatch />} />
          <Route path="/edit-batch/:id" element={<EditBatch />} />
          <Route path="/add-discipline" element={<AddDiscipline />} />
          <Route path="/edit-discipline/:id" element={<EditDiscipline />} />
          <Route path='/markattendance' element={<MarkAttendance />} />
          <Route path='/viewattendancestats' element={<ViewAttendanceStats />} />
          <Route path='/viewtodaysattendance' element={<ViewTodaysAttendance />} />
          <Route path='/markattendanceconductor' element={<MarkAttendanceConductor/>} />
          <Route path='/viewattendancestatsconductor' element={<ViewAttendanceStatsConductor/>} />
          <Route path='/viewtodaysattendanceconductor' element={<ViewTodaysAttendanceConductor />} />
          <Route path='/viewtimetable' element={<ViewTimetable />} />
          <Route path='/category' element={<Category />} />
          <Route path='/buslist' element={<BusList/>} />
          {/* <Route path='/viewshift1duties' element={<Shift1Duties/>}/> */}
          
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
