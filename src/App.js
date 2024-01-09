
import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './Pages/Home';
import Navbar from './components/common/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import Signup from './Pages/Signup';
import VerifyEmail from './Pages/VerifyEmail';
import Login from './Pages/Login';
import About from './Pages/About';
import OpenRoute from './components/core/Auth/OpenRoute'
import DashBoard from './Pages/DashBoard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import MyProfile from './components/core/DashBoard/MyProfile';
import Error from './Pages/Error';
import EnrolledCourses from './components/core/DashBoard/EnrolledCourses';
import Cart from './components/core/DashBoard/Cart/index';

import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";

import AddCourse from "./components/core/DashBoard/addCourse"
import MyCourses from './components/core/DashBoard/MyCourses/MyCourses';
import EditCourse from './components/core/DashBoard/EditCourse';
import Catalog from './Pages/Catalog';
function App() {

  const { user } = useSelector((state) => state.profile)
  return (
   <div className='w-screen min-h-screen bg-black flex flex-col font-inte'> 
   <Navbar/>

   <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="catalog/:catalogName" element={<Catalog/>}/>
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="about"
          element={
            
              <About/>
           
          }
        />  
        <Route 
            element={
              <PrivateRoute>
                <DashBoard/>
              </PrivateRoute>
            }
        >

<Route
          path="dashboard/my-profile"
          element={
            <PrivateRoute><MyProfile/></PrivateRoute>
            
            
            
          }
        /> 

<Route
          path="dashboard/enrolled-courses"
          element={
            <PrivateRoute><EnrolledCourses/></PrivateRoute>
            
            
            
          }
        /> 

      


        

{
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }
        {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
          </>
        )
      }
        </Route>

<Route path="*" element={<Error/>}/>
    </Routes>

{/* <Routes>
  <Route path='/' element={<OpenRoute></OpenRoute>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  
  <Route
          path="/forgot-password"
          element={
       
              <ForgotPassword />
          
          }
        />
  <Route
          path="/update-password/:id"
          element={
              <UpdatePassword />
          }
        />  
        <Route
          path="/verify-email"
          element={
              <VerifyEmail/>
          }
        />  
</Routes> */}


   </div>
  );
}

export default App;
