import React from 'react'
import {useSelector} from 'react-redux'
import {Outlet} from 'react-router-dom'
import SideBar from '../components/core/DashBoard/SideBar'
const DashBoard = () => {
    const {loding:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);
    if(authLoading || profileLoading){
        return <div className="text-center text-white"><i class="fa fa-spinner fa-5x fa-pulse"/> Loading</div>
    }
  return (
<>
    {/* <h1 className='text-white'>Hello</h1> */}
    <div className='relative flex min-h-[calc(100vh-3.5rem)] text-white'>
      <SideBar/>
      <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>

      </div>
    </div>
    </>
  )
}

export default DashBoard
