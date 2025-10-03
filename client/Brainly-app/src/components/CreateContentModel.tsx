import { useEffect, useRef, useState } from "react"
import XrossIcon from "./ui/icons/XrossIcon"
import Button from "./ui/Button";
import PlusIcon from "./ui/icons/PlusIcon";
import CreateTag from "./CreateTag";
import axios from "axios";
import type mongoose from "mongoose";
import { useDispatch } from "react-redux";
// import type { RootState } from "../store/store";
import { setTags } from "../store/tagsSlice";
import { BACKEND_URL } from "../utils/Backend";

type IsModelOpenTypes={
    setIsModelOpen:(open:boolean)=>void
}

type TagType={_id:mongoose.Types.ObjectId,title:string,color:string,__v:number }

const jwt=localStorage.getItem("jwt")

type MediaTypes = 'youtube'| 'video'| 'tweet'| 'image'| 'document' |"audio" ;
const CreateContentModel = ({setIsModelOpen}:IsModelOpenTypes) => {


    // const allTags=useSelector((state:RootState)=>state.tags)
    const dispatch=useDispatch()

    const [selectedTags,setSelectedTags]=useState<string[]>([])
    const [tagsFromServer,setTagsFromServer]=useState<TagType[]>([])
    const [isCreateTagOpen,setIsCreateTagOpen]=useState(false)
    const [areTagsUpdated,setAreTagsUpdated]=useState<boolean>(false)
    const titleRef=useRef<HTMLInputElement|null>(null)
    const textRef=useRef<HTMLInputElement|null>(null)
    const linkRef=useRef<HTMLInputElement|null>(null)
    const [selectedTagsId,setSelectedTagsId]=useState<string[]>([])

    useEffect(()=>{
        const fetchTags = async () => {
            try {
                const response = await axios.get(BACKEND_URL+"/api/v1/user/tags");   
                setTagsFromServer( [... (response.data.tags )]);
            } catch (error) {
                console.error("Failed to fetch tags:", error);
            }
        };
        fetchTags();
        dispatch(setTags(tagsFromServer))
    },[areTagsUpdated])

    

    const handleTags=(tag:string,id:mongoose.Types.ObjectId)=>{
        if(selectedTags.includes(tag)){
            setSelectedTags(prevArray=>prevArray.filter(item=>item!=tag))
            setSelectedTagsId(prevArray=>prevArray.filter(item=>item!=id.toString()))
        }else{
            setSelectedTags(prevArray=>[...prevArray,tag])
            setSelectedTagsId(prevArray=>[...prevArray, id.toString()])
        }
      
    }

  const [selectedType,setSelectedType]=useState("")

    const handleCreateSubmit= async ()=>{
        const title=titleRef.current?.value
        const text=textRef.current?.value
        const link=linkRef.current?.value
        const data={
            type:selectedType,
            title:title,
            link:link,
            text:text,
            tags:selectedTagsId

        }

        const response= await axios.post( BACKEND_URL+'/api/v1/user/content',data,{
            headers:{
                authorization: jwt
            }
        })
        if(response){
            alert("Cell Created")
            setIsModelOpen(false)
        }
        

    }


    return (
    <div className="h-screen bg-gray-900/80 m-auto flex flex-1 justify-center z-50 inset-0  fixed" >
        <div className="backdrop-blur-3xl bg-stone-200 w-[500px] z-50 rounded-4xl  m-auto ">
            <div className=" flex items-center justify-end p-2 pr-4 pt-4"  >
                <div className="flex-1  text-2xl px-4">
                    Create New Cell
                </div>
                <div className=""
                onClick={()=>{
                    setIsModelOpen(false)
                }}
                >
                    <XrossIcon/>
                </div>
            </div>
            <div className=" flex flex-col p-2  " >
                <div className="flex items-center mt-2">
                   
                    <div  className="flex  overflow-x-scroll scroll-container mb-4 text-normal mx-auto " >
                        {types.map((x,index) => (
                            <div key={index} onClick={()=>{
                                if(selectedType!=x){
                                    setSelectedType(x)
                                }else{
                                    setSelectedType("")
                                }
                            }} className={`${
                                SelecorStyles[x]
                            }
                           
                            p-2 m-2 rounded-lg
                            ${selectedType==x?'border-2':'border-0'}
                            border-zinc-700
                            `} >
                                {x}
                            </div>
                        ))}
                    </div>
                </div>
                <input ref={titleRef}  className={inputHolderStyle} type="text" placeholder="title" />
                <input ref={linkRef} className={inputHolderStyle} type="text" placeholder="link" />
                <input ref={textRef} className={inputHolderStyle} type="text" placeholder="text" />
                <div className=" relative w-11/12 mx-auto items-center flex " >
                    {isCreateTagOpen&&
                        <div className="absolute w-full top-0">
                            <CreateTag setIsCreateTagOpen={setIsCreateTagOpen} setAreTagsUpdated={setAreTagsUpdated} areTagsUpdated={areTagsUpdated} />
                        </div>
                    }
                    <div className="flex-1 " >
                        
                        <div className="h-24 overflow-scroll w-11/12 mx-auto bg-slate-400/50 p-2 rounded-2xl  flex flex-wrap ">
                            {tagsFromServer.length>0?tagsFromServer.map((x,index)=>(
                                <div key={index} className={`${
                                    x.color
                                } 
                                ${
                                    selectedTags.includes(x.title)&& "border-2"
                                }
                                border-zinc-700
                                h-fit rounded-2xl p-2 m-2 px-4`} 
                                    onClick={()=>{
                                        handleTags(x.title,x._id)
                                    }}
                                >
                                    {x.title}
                                </div>
                            ))
                            :
                            <div className=" p-4 text-xl ">
                                No tags Available please make some 
                                
                            </div>
                        }
                        </div>

                    </div>

                    <div 
                        onClick={()=>{
                            setIsCreateTagOpen(true)
                        }}
                        className="pr-4"
                    >
                        <PlusIcon size={"xl"}/>
                    </div>
                </div>
                <div className="flex justify-end pr-8 my-2" >
                   <div onClick={()=>{
                    handleCreateSubmit()
                   }}>
                     <Button varients={"primary"} size={"lg"} text={"Create"}/>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}





const inputHolderStyle="p-3 bg-zinc-300 m-2 border-1 border-zinc-700  rounded-xl w-10/12 mx-auto"

// const randomColors=['bg-red-200/70','bg-amber-200/70','bg-green-200/70','bg-stone-200/70',"bg-yellow-200/70",'bg-rose-200/70',"bg-purple-200/70",'bg-slate-200/70','bg-purple-200/70','bg-violet-200/70','bg-cyan-200/70','bg-indigo-200/70']
// const randomColorSelector=()=>{
//   return Math.floor(Math.random()*randomColors.length)
// }


const types:MediaTypes[]=['youtube','document',"tweet","image","video",'audio',]
const SelecorStyles: Record<MediaTypes,string> = {
    "youtube": "bg-red-300 ",
    "video": "bg-amber-200",
    "tweet": "bg-blue-300",
    "image": "bg-green-300",
    "document": "bg-gray-400",
    audio:"bg-lime-200"
}




export default CreateContentModel