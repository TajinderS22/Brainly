import type { ContentItems } from "../MainContainer"
import BrainIcon from "../ui/icons/BrainIcon"
import DocumentIcon from "../ui/icons/DocumentIcon"
import LinkIcon from "../ui/icons/LinkIcon"
import VideoIcon from "../ui/icons/VideoIcon"
import XIcon from "../ui/icons/Xicon"
import SidebarItem from "./SidebarItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'


interface MobileSidebarProps{
  setIsSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>,
  isSidebarMobile:boolean
  allContentData:ContentItems[]
}

const MobileSidebar = ({setIsSidebarMobile,isSidebarMobile,allContentData}:MobileSidebarProps) => {
  return (
<div className="h-fit z-10 pb-96 w-screen absolute bg-gray-200/30 backdrop-blur-3xl ">

  <div className="flex items-center mt-6  mx-2 pb-12">
    <span className="w-[70px] " onClick={()=>{
      setIsSidebarMobile?.(false)
    }} >
      <BrainIcon />
    </span>
    <p className="text-[#5046e4] font-medium text-4xl  ml-4">Brainly</p>
  </div>
  <div className="sticky w-10/12 mx-auto top-14">
    <div className="flex flex-col pt-4">
      <SidebarItem isSidebarMobile={isSidebarMobile} image={<XIcon />} allContentData={allContentData}  title="Tweets" />
      <SidebarItem isSidebarMobile={isSidebarMobile} image={<VideoIcon />} allContentData={allContentData}  title="Youtube" />
      <SidebarItem isSidebarMobile={isSidebarMobile} image={<DocumentIcon />} allContentData={allContentData}  title="Documents" />
      <SidebarItem isSidebarMobile={isSidebarMobile} image={<LinkIcon />} allContentData={allContentData} title="Links" />
      <SidebarItem isSidebarMobile={isSidebarMobile} image={<FontAwesomeIcon icon={faImages} size="2x" />} allContentData={allContentData}  title="Image" />
    </div>
  </div>
</div>

  )
}

export default MobileSidebar