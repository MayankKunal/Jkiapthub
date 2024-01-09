import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import CoursesTable from '../InstructorCourses/CoursesTable';

const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    let navigate= useNavigate();
    const [courses,setCourses]=useState([]);
    useEffect(()=>
    {
        const fetchCourses=async()=>
        {
            const result =await fetchInstructorCourses(token);
            if(result)
            console.log("Result123",result);
            setCourses(result);
        }
        fetchCourses();
    },[]);
    console.log('====================================');
    console.log("Course value",courses);
    console.log('====================================');
  return (
    <div>
      <h1>My Courses</h1>
      <IconBtn text="Add Courses" 
      onclick={()=>navigate("/dashboard/add-course")}
      icoClass="plus"
      />
      {
        courses && <CoursesTable courses={courses} setCourses={setCourses}/>
      }
    </div>
  )
}

export default MyCourses
