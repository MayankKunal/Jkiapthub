import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import { CiStar } from "react-icons/ci";
const RenderCartCourses = () => {

    const {cart}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
  return (
    <div>
      {
        cart.map((course,index)=>
        {
            <div>
                <div>
            <img src={course?.thumbnail} alt="hello"/>
            <div>
                <p>{course?.courseName}</p>
                <p>{course?.category?.name}</p>
                <div>
                    <span>4.8</span>
                    <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<CiStar/>}
                    filledIcon={<FaStar/>}

                    />
                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                </div>
            </div>

            <div>
                <button>
              <RiDeleteBin6Line/>
              <span onClick={()=>dispatch(removeFromCart(course._id))}>Remove</span>
                </button>
                <p>Rs {course?.price}</p>
                </div>
            </div>
        })
      }
    </div>
  )
}

export default RenderCartCourses
