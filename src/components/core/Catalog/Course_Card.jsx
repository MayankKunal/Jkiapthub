import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course,Height}) => {
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
      <div>
        <div>
            <img src={course?.thumbnail} alt="hello" className={`${Height} w-full rounded-xl object-cover`}/>
        </div>
        <div>
            <p>{course?.courseName}</p>
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <span>
                    Ratingings 
                </span>
        </div>
        <p>{course?.price}</p>
      </div>
      </Link>
    </div>
  )
}

export default CourseCard
