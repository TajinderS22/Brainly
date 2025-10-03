/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState } from "react";
import Card from "./Layout/Card"
import Button from "./ui/Button"
import PlusIcon from "./ui/icons/PlusIcon"
import ShareIcon from "./ui/icons/ShareIcon"
import Masonry from 'react-masonry-css';
import Sidebar from "./Layout/Sidebar";
import CreateContentModel from "./CreateContentModel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "../store/tagsSlice";
import type { RootState } from "../store/store";
import StopIcon from "./ui/icons/StopIcon";
import { setContent } from "../store/ContentSlice";
import BrainIcon from "./ui/icons/BrainIcon";
import MobileSidebar from "./Layout/MobileSidebar";
import { BACKEND_URL } from "../utils/Backend";


const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  885: 1,

};

export type ContentItems={
  title:string,
  link?:string,
  text?:string,
  tags?:string[],
  type:string,
  updatedAt?:string,
  _id:string

}


const MainContainer = () => {
  const[isModelOpen,setIsModelOpen]=useState(false)

  const [jwt, setjwt] = useState<string | null>(null)
  const dispatch=useDispatch()
  const [isBrainShared,setIsBrainShared]=useState(false)

  const user=useSelector((state:RootState)=>state.user)
  const ContentDataState=useSelector((state:RootState)=>state.contentDataState)
  const contentData=useSelector((state:RootState)=>state.content)

  const [isSidebarMobile,setIsSidebarMobile]=useState(false)

  // const [contentData, setContentData] = useState<ContentItems[]>([]);
  const [allContentData, setAllContentData] = useState<ContentItems[]>([]);


  const getShareData=async()=>{
    const response= await axios.get(BACKEND_URL+"/api/v1/user/brain/share",{
      headers:{
        authorization:jwt
      }
    })
    if(response?.data?.data?.hash){
      setIsBrainShared(true)
    }
  }

  const handleBrainShare = async () => {
    // const userId = user && typeof user === 'object' && '_id' in user ? (user as { _id: string })._id : undefined;
    try {
      if (jwt) {
        if(isBrainShared){
         const response = await axios.post(BACKEND_URL+"/api/v1/user/brain/share",{
            share:false
          },{
            headers:{
              authorization:jwt
            }
          })

          setIsBrainShared(false)
          alert(response.data.message)
          navigator.clipboard.writeText('')

        }else{
         const response = await axios.post(BACKEND_URL+"/api/v1/user/brain/share",{
            share:true
          },{
            headers:{
              authorization:jwt
            }
          })
          setIsBrainShared(true)
          alert(response.data.message)
          const shareableLink=BACKEND_URL+":5173"+response.data.link
          await navigator.clipboard.writeText(shareableLink)

        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getContentData=async()=>{
    try {
        const response=await axios.get( BACKEND_URL+'/api/v1/user/content',{
          headers:{authorization:jwt}
        })
        const tags=await axios.get( BACKEND_URL+'/api/v1/user/tags')
        const allTags=tags.data.tags
        dispatch(setTags(allTags))
        const data=response.data?.Response
        console.log(data)
        setAllContentData(data)
        dispatch(setContent(data))
    } catch (error) {
      console.error(error)
      
    }
  }
  useEffect(()=>{
    const token =localStorage.getItem('jwt')
    setjwt(token)
  },[])
  useEffect(()=>{
    if(jwt&&user){
      getContentData()
      console.log(contentData)
      getShareData()
    }
  },[jwt,isModelOpen,ContentDataState])
  return (
    
    <div>
      {isModelOpen&&
      <div className="fixed z-50 top-0 w-full h-screen">
        <CreateContentModel setIsModelOpen={setIsModelOpen} />
      </div>
      }
      {isSidebarMobile&&
        <div className="h-full  " >
          <MobileSidebar isSidebarMobile={isSidebarMobile} allContentData={allContentData} setIsSidebarMobile={setIsSidebarMobile} />
        </div>
      }
      <div className="flex">
        <div className="absolute m-2 mx-6 w-12 sm:hidden " onClick={()=>{
          setIsSidebarMobile(true)
        }} >
          <BrainIcon/>
        </div>
        <div className='bg-gray-100 xl:w-fit w-22 md:pr-12  min-h-screen hidden sm:block '>
          <Sidebar allContentData={allContentData} />
        </div>
        <div className="flex-1 w-11/12">
          <div className="sm:mt-14 mt-18  mx-4 flex  ml-12 items-center justify-between ">
              <p className="md:text-4xl text-xl font-bold">All Cells</p>
              <div className="flex">
                <Button varients="secondary" size='lg' text={`${isBrainShared?'Stop Sharing':'Share Brain'}`} startIcon={isBrainShared?<StopIcon/>:<ShareIcon size="lg"/>} 
                onClick={()=>{
                  handleBrainShare()
                }}
                />
                <Button varients="primary" size='lg' text="Add Content" startIcon={<PlusIcon size="lg"/>} 
                onClick={()=>{
                  setIsModelOpen(true)
                }}
                />
              </div>
            </div>
            <div className="flex md:hidden items-center flex-col">
              {contentData && contentData.map((x:ContentItems) => {
                return(
                  <Card key={x._id} title={x.title} type={x.type} tags={x.tags} link={x.link} text={x.text} timestamps={x.updatedAt} id={x._id} />
                )
              })} 
            </div>

            <div className="items-center md:block hidden " >
              {!contentData && <div className="text-2xl text-purple-700 "> Lets create some cells </div>}
              <Masonry 
                breakpointCols={breakpointColumnsObj}
                className="flex gap-1 px-2 mt-12 w-11/12  "
                columnClassName="masonry-column"
                >
              
              {contentData && contentData.map((x:ContentItems) => {
                return(
                  <Card key={x._id} title={x.title} type={x.type} tags={x.tags} link={x.link} text={x.text} timestamps={x.updatedAt} id={x._id} />
                )
              })}    

              </Masonry>
            </div>
          </div>

        </div>
    </div>
  )
}

export default MainContainer