import { Link } from "react-router"

const NotFound = () => {
  return (
    <div className='h-screen max-w-[1920px] bg-yellow-100'>
        <div className={`bg-[url(https://res.cloudinary.com/dcpz5001o/image/upload/v1752750203/Gemini_Generated_Image_hhsrrbhhsrrbhhsr_whtbu4.png)] bg-cover  h-full w-full flex justify-center items-center `}>
            <div className='backdrop-blur-sm border-1 border-[#5046e4] w-6/12 min-w-[350px] min-h-[600px] flex flex-col items-center rounded-2xl p-4 max-w-[900px] '>
                <img className="w-10/12 mx-auto " src="https://res.cloudinary.com/dcpz5001o/image/upload/v1752839660/404desired_ywsjdv.png" alt="404 page" />
                <p className="text-xl text-cyan-900">
                    Sorry, Page not found! 
                </p>
                <p className="text-xl text-[#5046e4]">
                    <Link to={"/"}>
                        Go Back to Home 
                    </Link>
                </p>
            </div>

        </div>
    </div>
  )
}

export default NotFound