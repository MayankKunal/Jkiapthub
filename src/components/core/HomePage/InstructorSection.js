import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-[100px]'>
    <div className='flex flex-row gap-20 items-center '>

        <div className='w-[50%]'>
             <img src={InstructorImage} alt="heelo"/>
        </div>
      <div className='w-[50%] flex flex-col gap-10'>
          <div className='text-4xl font-semibold w-[50%]'>
            Become an  <HighlightText text={"Instructor"} />
          </div>
          <p className='font-medium text-[16px] w-[70%] text-gray-300'>
            Join our community of passionate learners and teachers who are committed to sharing their knowledge with others. As a certified instructor, you
          </p>
          <div className='w-fit'>
          <CTAButton active={true} linkto={"/signUp"} >
            <div className='flex flex-row gap-2 items-center'>
            Start Teching Today <FaArrowRight/>
            </div>
          </CTAButton>
          </div>
      </div>
    </div>
    </div>
  )
}

export default InstructorSection
