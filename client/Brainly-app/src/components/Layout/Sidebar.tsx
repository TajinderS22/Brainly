import BrainIcon from "../ui/icons/BrainIcon"
import DocumentIcon from "../ui/icons/DocumentIcon"
import HashTags from "../ui/icons/HashTags"
import LinkIcon from "../ui/icons/LinkIcon"
import VideoIcon from "../ui/icons/VideoIcon"
import XIcon from "../ui/icons/Xicon"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
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
      <SidebarItem image={<XIcon />} title="Tweets" />
      <SidebarItem image={<VideoIcon />} title="Video" />
      <SidebarItem image={<DocumentIcon />} title="Documents" />
      <SidebarItem image={<LinkIcon />} title="Links" />
      <SidebarItem image={<HashTags />} title="Tags" />
    </div>
  </div>
</div>

  )
}

export default Sidebar