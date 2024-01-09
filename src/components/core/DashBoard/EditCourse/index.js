import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import RenderSteps from '../addCourse/RenderSteps'
import { setEditCourse,setCourse} from '../../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
export default function EditCourse() {
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const {course}=useSelector((state)=>state.course);
    const [loading,setLoading]=useState();
    const {token}=useSelector((state)=>state.auth);
    useEffect(()=>
    {
      const populateCourseDetails=async()=>
      {
        setLoading(true);
        const result=await getFullDetailsOfCourse(courseId,token);
        if(result?.courseDetails)
        {
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }
        setLoading(false);
      }

      populateCourseDetails();
    },[])
    if(loading) return <div className="loader">Loading...</div>;
  return (
    <div className='text-white'>
 <h1>Edit Course</h1>
<div>
    {
        course?(<RenderSteps/>):(<p>Course not Found</p>)
    }
</div>
    </div>
  )
}
