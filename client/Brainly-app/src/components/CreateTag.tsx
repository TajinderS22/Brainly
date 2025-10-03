import { useRef } from "react"
import CheckSvg from "./ui/icons/CheckSvg"
import PlusIcon from "./ui/icons/PlusIcon"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { setTags } from "../store/tagsSlice"
import type { RootState } from "../store/store"
import { BACKEND_URL } from "../utils/Backend"
// import XrossIcon from "./ui/icons/XrossIcon"

// type Tag = {
//     _id?:string
//     title: string;
//     color: string;
//     __v?:number
// };

const CreateTag = ({setIsCreateTagOpen,setAreTagsUpdated,areTagsUpdated}:{setIsCreateTagOpen:(isOpen:boolean)=>void,setAreTagsUpdated:(isTrue:boolean)=>void,areTagsUpdated:boolean }) => {

    const dispatch=useDispatch()
    const tags = useSelector((state: RootState) => state.tags);


    const creatTagRef = useRef<HTMLInputElement|null>(null)
    const handleCreateTag = async() => {
        const createTagValue = creatTagRef.current?.value || "";
        const data = {
            title:createTagValue,
            color:randomColors[randomColorSelector()]
        };
        const response= await axios.post(BACKEND_URL+":3000/api/v1/user/tags",data)
        setAreTagsUpdated(!areTagsUpdated)
        console.log(response.data)
        dispatch(setTags([...tags,response.data.response]))
        console.log(response)

    }
  return (
    <div className="w-full flex justify-center h-24 items-center backdrop-blur-sm">
        <div className="bg-slate-300 p-2 h-16 w-56 flex justify-center items-center rounded-2xl">
            <input ref={creatTagRef} type="text" className="bg-slate-400 w-10/12 h-12 rounded-xl" />
            <div onClick={()=>{
                setIsCreateTagOpen(false)
            }} 
            
            >
                
                <div className="flex items-center">
                    <div onClick={()=>{
                        handleCreateTag()
                    }}className="p-1" >
                        <CheckSvg/>
                    </div>
                    <div className=" p-1 rotate-45">
                        <PlusIcon size="lg"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}



const randomColors=['bg-red-200/70','bg-amber-200/70','bg-green-200/70','bg-stone-200/70',"bg-yellow-200/70",'bg-rose-200/70',"bg-purple-200/70",'bg-slate-200/70','bg-purple-200/70','bg-violet-200/70','bg-cyan-200/70','bg-indigo-200/70']
const randomColorSelector=()=>{
  return Math.floor(Math.random()*randomColors.length)
}

export default CreateTag