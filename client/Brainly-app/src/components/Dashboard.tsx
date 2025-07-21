
import { useEffect } from 'react'
import MainContainer from './MainContainer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/userSlice'
import type { RootState } from '../store/store'
import { useNavigate } from 'react-router'



const Dashboard = () => {
 
  const user = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()
  const jwt=localStorage.getItem('jwt')
  const navigate=useNavigate()

  const isSessionActive=async()=>{
      
      try {

        const response=await axios.post('http://localhost:3000/api/v1/user/authenticate-user',{},{
        headers:{
          authorization:jwt
        }

      })
      if(response.status==200){
        dispatch(setUser(response.data.user))
      }
        
      } catch  {
        localStorage.removeItem('jwt')
        navigate('/authentication')
      }
      
  }

  useEffect(()=>{
    if(jwt){
      isSessionActive()
    }else{
      navigate('/authentication')
    }
  },[jwt])



  return (
    <div className='flex'>
      
      <div className='bg-gray-200 flex-1 '>
        {user?
          <MainContainer></MainContainer>
        :
          <div className='w-screen h-screen flex items-center justify-center' >
              <div className='hover:shadow-lg shadow-zinc-700 rounded-full'>
                <div className='w-24  h-24 border-8 border-t-amber-400 border-blue-200 animate-spin rounded-full'  >

              </div>
              </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Dashboard