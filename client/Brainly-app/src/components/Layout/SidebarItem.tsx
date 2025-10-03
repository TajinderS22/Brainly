/* eslint-disable @typescript-eslint/no-unused-vars */
import  { type ReactElement } from 'react'
import type { ContentItems } from '../MainContainer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { clearSelected, setSelected } from '../../store/Selected'
import { setContent } from '../../store/ContentSlice'


const SidebarItem = ({image,title,allContentData,
    isSidebarMobile}:{
  image:ReactElement,allContentData:ContentItems[],title:string,setIsSidebarMobile?:boolean,
    isSidebarMobile?:boolean
}) => {

  const selected=useSelector((state:RootState)=>state.selected)

  const isSelected = selected === title.toLowerCase();

  const handleClick = () => {
    if (isSelected) {
      dispatch(clearSelected());
      dispatch(setContent(allContentData));
    } else {
      dispatch(setSelected(title.toLowerCase()));
      const data = allContentData.filter(x => x.type === title.toLowerCase());
      dispatch(setContent(data));
    }
  };



  const dispatch=useDispatch()
  console.log(selected==title.toLowerCase())
  return (
    <div className={`flex items-center xl:w-11/12 xl:mx-auto mx-2 transform duration-300 text-zinc-700  rounded-2xl pl-2 ${isSelected ? "bg-[#5046e4]/50" : ""}  hover:bg-[#5046e4]/50 my-4 hover:shadow-md hover:-translate-y-1  shadow-[#5b51e8] p-2 px-8 ${isSidebarMobile?"w-10/12 bg-[#5046e4] text-white ":"w-18"} `}
    
    onClick={()=>{
      handleClick()
    }}
    
    >
        <div className=' mx-2 '>
            {image}
        </div>
        <div className={` mx-2 ml-4 md:text-2xl text-md font-medium ${isSidebarMobile?"block bg-[#5046e4] text-white ":'hidden'} xl:block`}>
            {title}
        </div>
    </div>
  )
}

export default SidebarItem