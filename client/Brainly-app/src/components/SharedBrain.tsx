import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Card from './Layout/Card';
import type { ContentItems } from './MainContainer';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTags } from '../store/tagsSlice';
import { BACKEND_URL } from '../utils/Backend';



const breakpointColumnsObj = {
  default: 3,
  1400: 2,
  768: 1,

};


const SharedBrain = () => {

    const [contentData,setContentData]=useState<ContentItems[]>([])
    const [userName,setUserName]=useState<string|null>(null)

    const dispatch = useDispatch()

    const {hash}=useParams()

    const navigate=useNavigate()


    const getContentData=async()=>{
        try {
          const response= await axios.get(BACKEND_URL+`/api/v1/user/brain/share/${hash}`)
          const tags=await axios.get( BACKEND_URL+'/api/v1/user/tags')
          const allTags=tags.data.tags
          dispatch (setTags(allTags))
          setContentData(response.data.content)
          setUserName(response.data.username)
          console.log(response)

        } catch (error) {
          console.log(error)
          if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message);
            navigate('/dashboard')

          } else {
            alert('An unexpected error occurred');
            navigate('/dashboard')
          }
        }
        
    }
    useEffect(()=>{
      getContentData()
    },[])
  return (
    <div>
        <div className='w-11/12 mx-auto'>

          <div className=' text-3xl font font-medium mt-12' >
            {userName?
              <>Your are viewing <span className='font-bold text-[#5046e4]'>{userName}</span>'s Brain</>
            :
              <>Brain Share Id is Invalid</>}
          </div>
          <div className='' >
            <Masonry 
                breakpointCols={breakpointColumnsObj}
                className="flex gap-1 px-2 mt-12 w-11/12  "
                columnClassName="masonry-column"
            >

                {contentData && contentData.map((x) => {
                  return(
                    <Card key={x._id} title={x.title} type={x.type} tags={x.tags} link={x.link} text={x.text} timestamps={x.updatedAt} id={x._id} />
                  )
                })}    

            </Masonry>
          </div>

        </div>

    </div>
  )
}

export default SharedBrain