import React from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
const MyProfile = () => {

  let user=useSelector((state)=>state.profile);
   console.log('====================================');
   console.log(user);
   console.log('====================================');
  const navigate=useNavigate();
  user=user.user;
    return (
    <div className='text-white'>
      <h1>
My Profile
      </h1>
      <div>
        <div>
            <img src={user?.image} alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px[ rounded-full object-cover'/>
            <div>
                <p >
                   {user?.firstName+ " "+user?.lastName}

                    </p>

                    <p className='text-white'>
                        {user?.email}
                </p>
            </div>
        </div>
        <IconBtn
        text="Edit"
        onclick={()=>
        {
            navigate("/dashboard/settings")
        }}
        >
            </IconBtn>
      </div>
    </div>
  )
}

export default MyProfile
