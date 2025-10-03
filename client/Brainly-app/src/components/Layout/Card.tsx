import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../ui/icons/DeleteIcon"
import DocumentIcon from "../ui/icons/DocumentIcon"
import ImageSvg from "../ui/icons/ImageSvg";
import LinkIcon from "../ui/icons/LinkIcon";
import ShareIcon from "../ui/icons/ShareIcon"
import VideoIcon from "../ui/icons/VideoIcon"
import XIcon from "../ui/icons/Xicon";
import { Tweet } from "react-tweet";
import type { RootState } from "../../store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { setContentDataState } from "../../store/ContentDataStateSlice";


interface CardProps{
  title: string,
  link?: string,
  type: string,
  timestamps?: string,
  tags?: string[],
  isModelOpen?:boolean,
  text?: string,
  id:string

}


function extractYouTubeVideoId(url:string) {
  try {
    const parsedUrl = new URL(url);
    
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.searchParams.has("v")
    ) {
      return parsedUrl.searchParams.get("v");
    }
    if (parsedUrl.pathname.startsWith("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    return null; 
  } catch (e){
    console.warn(e)
    return null;

  }
}

const getTweetId=(link:string)=>{
  try {
    const parsedUrl=new URL(link)
    if(parsedUrl.hostname.includes('x.com')){
      const pathnameContents=(parsedUrl.pathname.split("/"))
      return pathnameContents[pathnameContents.length-1]
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}



const Card = ({title,type,link,text,timestamps,tags,id}:CardProps) => {

  const ContentDataState=useSelector((state:RootState)=>state.contentDataState)

  const dispatch=useDispatch()

  const [jwt,setJwt]=useState<string|null>(null)
  useEffect(()=>{
    const token = localStorage.getItem('jwt')
    setJwt(token)
  },[])

  interface Tag {
    _id: string;
    title: string;
    color?:string
    // add other properties if needed
  }

  const allTags = useSelector((state: RootState) => state.tags as Tag[]);

  const usertags = allTags.filter((tag: Tag) => tags && tags.includes(tag._id));


  

  let videoId:string|null=''
  let tweetId:string|null=''
  if(link){
    if(type=='youtube'){
      videoId=(extractYouTubeVideoId(link))
    }
    if(type=="tweet"){
      tweetId=getTweetId(link)
    }
  }

  const handleContentDeleteClick=async(contentId:string)=>{
   try {
    
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const _response = await axios.delete('http://localhost:3000/api/v1/user/content', {
        data: { contentId },
        headers: {
          authorization: jwt
        }
      })
      
    dispatch(setContentDataState(!ContentDataState))

   } catch (error) {
    console.log(error)
   }
  }



  const embededUrl=`https://www.youtube.com/embed/${videoId}`
  return (
    <div  className={`min-w-[350px] max-w-[400px] min-h-[400px] h-fit overflow-y-scroll overflow-x-clip  bg-slate-100 p-4 rounded-xl m-6
      hover:border-1 hover:border-[#5b51e8]
      border-1 border-zinc-600
      hover:shadow-2xl shadow-[#b4aeff]
      hover:-translate-y-1 transform
      duration-220 ease-in

      mx-6
    `} >
      <div className=" text-2xl font-semibold flex items-center w-full">
        <div>
        {
          type==="video"||type=="youtube"&&
          <VideoIcon/>
        }
        {
          type==="document"&&
          <div >
            <DocumentIcon/>
          </div>
        }
        {
          type==='image'&&
          <ImageSvg/>
        }
        {
          type=="tweet"&&
          <XIcon/>
        }
        {
          type=="link"&&
          <LinkIcon/>
        }

        </div>
        <div className="mx-2 flex-1  ml-4 ">
          {title}
        </div>

        <div className="flex justify-between w-18 items-center">
          <ShareIcon size={'lg'}/>
          <div onClick={()=>{
            handleContentDeleteClick(id)
          }} >
            <DeleteIcon />
          </div>

        </div>


      </div>
      <div className="text-normal my-4 ">
        {type=='youtube'&&
          <div>
            <iframe width="560" height="315" src={embededUrl+"?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1"} 
            title="YouTube video player" 
            allow="autoplay" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-[200px] rounded-xl shadow-lg shadow-zinc-800"
            ></iframe>
          </div>
          
        }
        {link?.includes('http')&&type=="document"&&
            <div className="w-full h-[500px] rounded-lg shadow-lg hide-scollbar shadow-zinc-700 overflow-hidden scrollbar-hide">
              <iframe 
              className="h-full w-full"
              src={link} 
               />
            </div>
          }
        
        {
          type=="image"&&
          <div className="w-full rounded-lg shadow-lg hide-scollbar shadow-zinc-700 overflow-hidden scrollbar-hide">
            <img
            className="h-full w-full"
            src={link} 
             />
          </div>
        }
        {
          type=='tweet'&&
          <div className="z-0">
            <div className={`light dark:dark shadow-lg relative rounded-lg   shadow-zinc-700`}>
              {tweetId?<Tweet id={tweetId} />:null}
            </div>
          </div>
        }
      </div>

      <div className={`${link?.includes('http')?'min-h-8':'min-h-[250px]'} text-lg text-zinc-800 p-3 `}>

        {text}

      </div>

      <div className="flex flex-wrap text-xsm">
        {usertags&& usertags?.map((x,index)=>(
          <div
          className={`${x.color} p-2 m-2 flex rounded-4xl px-4`}
          key={index}>
            <p># </p>
            <p className="ml-2">{x.title}</p>
          </div>
        ))}
      </div>
      <div className=" p-3 ">
        {timestamps}
      </div>
    </div>
  )
}


// const randomColors=['bg-red-200/70','bg-amber-200/70','bg-green-200/70','bg-stone-200/70',"bg-yellow-200/70",'bg-rose-200/70',"bg-purple-200/70",'bg-slate-200/70','bg-purple-200/70','bg-violet-200/70','bg-cyan-200/70','bg-indigo-200/70']
// const randomColorSelector=()=>{
//   return Math.floor(Math.random()*randomColors.length)
// }

export default Card


