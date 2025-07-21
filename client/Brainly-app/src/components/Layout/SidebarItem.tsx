import  { type ReactElement } from 'react'

interface SidebarItemContents{
    title: string,
    image: ReactElement,
    setIsSidebarMobile?:boolean,
    isSidebarMobile?:boolean

}

const SidebarItem = (props:SidebarItemContents) => {
  return (
    <div className={`flex items-center xl:w-11/12 xl:mx-auto mx-2 transform duration-300 text-zinc-700  rounded-2xl pl-2 hover:bg-[#5046e4]/50 my-4 hover:shadow-md hover:-translate-y-1  shadow-[#5b51e8] p-2 px-8 ${props.isSidebarMobile?"w-10/12 bg-[#5046e4] text-white ":"w-18"} `}>
        <div className=' mx-2 '>
            {props.image}
        </div>
        <div className={` mx-2 ml-4 md:text-2xl text-md font-medium ${props.isSidebarMobile?"block bg-[#5046e4] text-white ":'hidden'} xl:block`}>
            {props.title}
        </div>
    </div>
  )
}

export default SidebarItem