import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Table, Thead, Tr,Th, Tbody, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { fetchCourseDetails, fetchInstructorCourses,deleteCourse} from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import {useNavigate} from 'react-router-dom'
export default function CoursesTable({courses,setCourses}) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
     const {token}=useSelector((state)=>state.auth);
     const [loading,setLoading]=useState(false);
     const [confirmationModal,setConfirmationModal]=useState(null);

     const handleCourseDelete=async(courseId)=>
     {
           setLoading(true);
           
           await deleteCourse({courseId},token);
           const result=await fetchInstructorCourses(token);
           if(result)
           {
            setCourses(result);
           }
           setConfirmationModal(null);
           setLoading(false);
     }
     console.log('====================================');
     console.log("Course value",courses);
     console.log('====================================');
    return (
    <div>
     
     <Table>
        <Thead>
            <Tr>
                <Th>
                     Courses
                </Th>
                <Th>
                     Duration
                </Th>
                <Th>
                     Prices
                </Th>
                <Th>
                     Action
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                courses.length===0?
                (
                    <Tr>
                        <Td>
                            No Courses Found
                        </Td>
                    </Tr>
                ):(
                    courses.map((course)=>
                    (
                        <Tr key={course._id} className='flex gap-x-10 border-gray-800 p-8'>
                            <Td><img 
                               src={course?.thumbnail}
                               alt="hello"
                               className='h-[150px] w-[220px] rounded-lg object-cover'
                            />
                            <div className='flex flex-col'>
                                <p>{course.courseName}</p>
                                <p>{course.courseDescription}</p>
                                <p>Created: </p>
                                {
                                    course.status===COURSE_STATUS.DRAFT?(<p className='text-pink-500'>Drafted</p>):(<p className='text-yellow-500'>Published</p>)
                                }
                            </div>
                            
                            </Td>
                            <Td>
                                2hr 30min
                            </Td>
                            <Td>
                                {course.price}
                            </Td>
                            <Td className='flex gap-5'>
                               <button disabled={loading} onClick={()=>
                            {
                            
                                navigate(`/dashboard/edit-course/${course._id}`);

                            }}>Edit</button>
                               <button disabled={loading} onClick={()=>setConfirmationModal({
                                text1:"Do you want to delete this Course",
                                text2:"All data related to this course will be deleted",
                                btn1Text:"Delete",
                                btn2Text:"Cancel",
                                btn1Handler:!loading?()=>handleCourseDelete(course._id):()=>{},
                                btn2Handler:!loading?()=>setConfirmationModal(null):()=>{}
                               })

                               }>Delete</button>
                               
                            </Td>
                        </Tr>
                    ))
                )
            }
        </Tbody>
     </Table>
  {confirmationModal &&<ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
