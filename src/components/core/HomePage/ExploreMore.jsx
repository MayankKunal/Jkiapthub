import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [course ,setCourse]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrnetCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>
    {
        setCurrentTab(value);
          const result=HomePageExplore.filter((course)=>course.tag === value);
        console.log(result[0]);
        setCourse(result[0].courses);
        setCurrnetCard(result[0].courses[0].heading);
    }
  return (
    <div>
      <div className='text-4xl font-semibold text-center' >
            Unlock the<HighlightText text={"Power of Code"}/>
      </div>
      <p className='text-center text-gray-300 text-lg  mt-3'>
        Learn to build anything you can imagine
      </p>
         <div className='mt-5 flex flex-row bg-gray-800 rounded-full mb-5 border-gray-100 px-2 py-2'>
            {
                tabsName.map((ele,index)=>
                {
                    return(
                        <div className={`text-16[px] flex flex-row items-center gap-2 
                        ${currentTab===ele ?" bg-gray-900 text-gray-50 font-medium":"text-gray-200"}
                        rounded-full transition-all duration-200 px-7 py-2 cursor-pointer hover:bg-gray-900 hover:text-gray-50
                        `} key={index} onClick={()=>setMyCards(ele)}>
                            {ele}
                            </div>
                    )
                })
            }
         </div>
    
    <div className='lg:h-[150px]'>
       
       <div className='absolute flex flex-row justify-between w-full'>
        {
            course.map((ele,index)=>
            {
                <div>
                    <CourseCard 
                    key={index}
                    cardData={ele}
                    currentCard={currentCard}
                    setCurrnetCard={setCurrnetCard}
                    />
                    </div>
            })
        }
       </div>
    
    </div>
    </div>
  )
}

export default ExploreMore
