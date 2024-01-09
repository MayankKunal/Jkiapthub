import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'
const LearningLanguage = () => {
  return (
    <div  className='mt-[150px] mb-[100px]'>
    <div className=' flex flex-col gap-5 items-center'>

        <div  className='text-4xl font-semibold text-center'>
          Your Swiss Knife For <HighlightText text={"Learning any language"}/>
        </div>
      
      <div className='text-center text-gray-600 mx-auto text-base mt-3 w-[70%]'>
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex flex-row items-center justify-center mt-5'>
        <img src={knowYourProgress} alt="no" className='object-contain -mr-32'/>
        <img src={compareWithOthers} alt="no" className='object-contain'/>
        <img src={planYourLesson} alt="no" className='object-contain -ml-36'/>
       </div>
       <div className='w-fit'>
        <CTAButton active={true} linkto={"/signUp"}>Learn More</CTAButton>
       </div>
    </div>
    </div>
  )
}

export default LearningLanguage
