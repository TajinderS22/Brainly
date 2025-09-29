import BrainIcon from "../ui/icons/BrainIcon"
import DocumentIcon from "../ui/icons/DocumentIcon"
import LinkIcon from "../ui/icons/LinkIcon"
import VideoIcon from "../ui/icons/VideoIcon"
import XIcon from "../ui/icons/Xicon"
import SidebarItem from "./SidebarItem"
import type {ContentItems} from '../MainContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-regular-svg-icons'

const Sidebar = ({allContentData}:{
  allContentData:ContentItems[]
}) => {
  return (
<div className="h-full w-fit ">

  <div className="flex items-center mt-6 2xl:mx-4 mx-2 pb-12">
    <span className="w-[70px]">
      <BrainIcon />
    </span>
    <p className="text-[#5046e4] font-medium text-4xl hidden xl:block ml-4">Brainly</p>
  </div>
  <div className="sticky top-14">
    <div className="flex flex-col pt-4">
      <SidebarItem image={<XIcon />} allContentData={allContentData}  title="Tweets" />
      <SidebarItem image={<VideoIcon />} allContentData={allContentData}  title="Youtube" />
      <SidebarItem image={<DocumentIcon />} allContentData={allContentData}  title="Documents" />
      <SidebarItem image={<LinkIcon />} allContentData={allContentData} title="Links" />
      <SidebarItem image={<FontAwesomeIcon icon={faImages} size="2x" />} allContentData={allContentData}  title="Image" />
    </div>
  </div>
</div>

  )
}

export default Sidebar