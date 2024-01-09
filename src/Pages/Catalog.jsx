import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import {useParams} from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/Course_Card';



const Catalog = () => {
 
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(()=> {
      const getCategories = async() => {
          const res = await apiConnector("GET", categories.CATEGORIES_API);
          const category_id = 
          res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
          setCategoryId(category_id);
      }
      getCategories();
  },[catalogName]);

  useEffect(() => {
      const getCategoryDetails = async() => {
          try{
              const res = await getCatalogaPageData(categoryId);
              console.log("PRinting res: ", res);
              setCatalogPageData(res);
          }
          catch(error) {
              console.log(error)
          }
      }
      if(categoryId) {
          getCategoryDetails();
      }
      
  },[categoryId]);


  return (
    <div className='text-white'>
      <div>
        <p>
         {`Home/Catalog/`}
         <span>{catalogPageData?.data.selectedCategory?.name}</span>
        </p>
        <p>
        {catalogPageData?.data.selectedCategory?.name}
        </p>
        <p>
        {catalogPageData?.data.selectedCategory?.description}
        </p>
      </div>
      <div>
        <div>Couses to get you started</div>
        <div className='flex gap-x-3'>
          <p>MostPoular</p>
          <p>New</p>
        </div>
        <CourseSlider Courses={catalogPageData?.data?.data?.selectedCategory?.courses}/>
        <div>
          <p>Top Course in <span> {catalogPageData?.data.selectedCategory?.name}</span></p>
          <div>
            <CourseSlider  Courses={catalogPageData?.data?.data?.differentCategory?.courses} />
          </div>
        </div>
        <div>
          <div>Frequently Bought Together</div>
               <div className='py-8 '>
                <div className='grid grid-cols-1 lg:grid-cols-2'> 
                         {
                          catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course,index)=>
                          (
                            <div>
                            <CourseCard course={course} key={index} />
                            </div>
                          ))
                         }
                </div>
               </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Catalog
