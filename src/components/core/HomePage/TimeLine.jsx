import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const timeLine=[

    {
        logo:Logo1,
        heading:"LeaderShip",
        Description:"Fully committed to the success company"

    },
    {
        logo:Logo2,
        heading:"LeaderShip",
        Description:"Fully committed to the success company"

    },
    {
        logo:Logo3,
        heading:"LeaderShip",
        Description:"Fully committed to the success company"

    },
]
const TimeLine = () => {
  return (
    <div className='flex flex-row gap-10 items-center'>
        <div className='w-[45%] flex flex-col gap-5'>
            {
                timeLine.map((item,index)=>{
                    return (
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                <img src={item.logo} alt="Img Not Avaliable"/>
                            </div>
                            <div>
                                <h2 className='font-semibold text-[18px]'>{item.heading}</h2>
                                <p className='text-base'>{item.Description}</p>
                                </div>
                        </div>
                    )
                })
            }
        </div>
      
      <div className='relative shadow-blue-200'>
        <img src={TimelineImage} className='shadow-white object-cover h-fit' alt="hello" />
    
    <div className='absolute bg-green-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-40%] translate-y-[-60%]'>
         <div className='flex flex-row gap-5 items-center border-r border-green-300 px-7'>
            <p className='3xl font-bold'>10</p>
            <p className='text-green-300'>Years of Experince</p>
         </div>
             <div className='flex gap-5 items-center px-7'>
             <p className='3xl font-bold'>250</p> 
             <p className='text-green-300'>Type of Courses</p>
             </div>
    </div>

      </div>
    </div>
  )
}

export default TimeLine
