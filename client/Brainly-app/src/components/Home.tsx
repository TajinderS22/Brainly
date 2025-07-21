import { useNavigate } from "react-router"
import Button from "./ui/Button"
import BrainIcon from "./ui/icons/BrainIcon"

const Home = () => {
    const navigate=useNavigate()
  return (
    <div className='h-screen w-full bg-yellow-100'>
        <div className={`bg-[url(https://res.cloudinary.com/dcpz5001o/image/upload/v1752750203/Gemini_Generated_Image_hhsrrbhhsrrbhhsr_whtbu4.png)] bg-cover  h-full pt-14  justify-center items-center `}>
            <div className='backdrop-blur-md bg-gray-400/5 border-1 border-[#5046e4] w-11/12 mx-auto  min-h-[600px] h-[90svh] flex flex-col items-center rounded-2xl p-4  '>
                <div className="flex justify-start items-center  w-full">
                    <div className="w-18 mx-4">
                        <BrainIcon/>
                    </div>
                    <p className="text-3xl font-medium text-[#5046e4]">
                        Brainly
                    </p>
                </div>

                <div className="flex w-10/12 mt-18 ">
                    <div className="md:w-7/12 pt-18">
                        <pre className="text-3xl text-[#2517e3] font-bold overflow-w ">
                            Let's Create new Brain cells   
                        </pre>
                        <pre className="text-xl font-semibold my-4 text-[#5046e4] ">
                            Get relif from forgetting things
                        </pre>
                        <div className="mt-14">
                            <Button varients={"primary"} size={"sm"} text={"Create Brain Cells"} onClick={()=>{
                                navigate('/authentication')
                            }} />
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center xl:-translate-y-24 xl:hover:-translate-y-32 xl:hover:translate-x-8 
                    hover:-translate-y-12 hover:translate-x-8
                    hover:rotate-8 transform duration-320  ">
                        <div className=" xl:w-full lg:w-96 lg:block hidden ">
                            <BrainIcon/>
                        </div>
                    </div>
                </div>

                {/* buttons */}
                <div>
                    
                </div>

            </div>

        </div>
    </div>
  )
}

export default Home