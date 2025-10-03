import { useEffect, useRef, useState } from "react"
import Button from "../ui/Button"
// import BrainIcon from "../ui/icons/BrainIcon"
import axios from "axios"
import { useNavigate } from "react-router"
import { BACKEND_URL } from "../../utils/Backend"

const Authentication = () => {

    const [isSignin,setIsSignin]=useState<boolean>(false)
    const navigate=useNavigate()
    const [jwt,setJwt]=useState<string|null>(null)

    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        setJwt(token)
    },[])

      const isSessionActive=async()=>{
        
        try {

          const response=await axios.post( BACKEND_URL+':3000/api/v1/user/authenticate-user',{},{
          headers:{
            authorization:jwt
          }

        })
        if(response.status==200){
          navigate('/dashboard')
        }else{
            navigate('/authentication')
        }

        } catch  {
          localStorage.removeItem('jwt')
          navigate('/authentication')
        }

    }

    useEffect(()=>{
        if(jwt){
            isSessionActive()
        }
    })

    const userNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleAuthenticationFormClick=async()=>{
        try {
            if(isSignin){
                const email=emailRef.current?.value;
                const password=passwordRef.current?.value
                const data={
                    email,
                    password                    
                }
                const response= await axios.post(BACKEND_URL+":3000/api/v1/user/signin",data)
                localStorage.setItem('jwt',response.data.token)
                navigate('/dashboard')
            }else{
                const email=emailRef.current?.value;
                const password=passwordRef.current?.value;
                const userName=userNameRef.current?.value;
                const data={
                    email,
                    password,
                    userName
                }
                const response= await axios.post(BACKEND_URL+":3000/api/v1/user/signup",data)
                if(response.status==200){
                    alert("User Registered")
                    navigate('/dashboard')
                    
                }

            }
        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
        }
    }

  return (
    <div className="h-screen overflow-y-hidden" >
        <div className="  w-full h-full flex " >
            <div className=" bg-gray-200 lg:w-[410px]  w-full mx-auto ">
                <div className="absolute p-4 text-4xl font-semibold text-[#5046e4]">
                    Brainly
                </div>
                <div className="flex flex-col w-[380px] mx-auto  bg-slate-100 shadow-xl shadow-z mt-42 p-4 rounded-lg">
                    <div className="text-2xl font-semibold p-2">
                        {isSignin?"Open your cells":"Create your second Brain"}
                    </div>
                    <div className=" w-11/12 mx-auto" >
                        {!isSignin&&<input ref={userNameRef} type="Username" placeholder="Username"  className={AuthformStyle} />}
                        <input ref={emailRef} type="email" placeholder="Email"  className={AuthformStyle} />
                        <input ref={passwordRef} type="password"  placeholder="Password" className={AuthformStyle} />

                        <div className="flex justify-end pr-4"
                        onClick={()=>{
                            handleAuthenticationFormClick()
                        }}
                        >
                            <Button varients={"primary"} size={"md"} text={`${isSignin?"Open":"Create"}`} />
                        </div>
                    </div>
                    <div className="border-b-1 my-2 border-zinc-800">

                    </div>
                    <div className="">
                        {
                            isSignin?
                            <div className="flex items-center justify-center text-sm my-4">
                                <p className="text-sm">
                                    Already Have Second Brain Account?&nbsp;&nbsp;
                                </p>
                                <button className=" font-medium p-2 rounded-md w-24 bg-[#e3e0ff] text-[#5046e4] " onClick={()=>{
                                    setIsSignin(false)
                                }} > click here.</button>
                            </div>
                            :
                            <div className="flex items-center justify-center text-sm my-4">
                                <p className="text-sm">
                                    Don't Have Second Brain Account.&nbsp;&nbsp; 
                                </p>
                                <button className=" font-medium p-2 rounded-md w-24 bg-[#e3e0ff] text-[#5046e4] " onClick={()=>{
                                    setIsSignin(true)
                                }} > click here.</button>
                            </div>

                        }
                    </div>

                </div>

            </div>
            <div className="flex-1 lg:block hidden  h-full " >

                <div className=" flex justify-center h-[90%] items-center ">
                    
                    <img className="w-[80%] max-h-[100%] mt-28 absolute -z-10 " src="https://res.cloudinary.com/dcpz5001o/image/upload/v1752750203/Gemini_Generated_Image_hhsrrbhhsrrbhhsr_whtbu4.png" alt="" />
                    <div className="w-8/12 hover:-translate-y-12 hover:translate-x-4 transform ease-in duration-200 " >
                        {/* <BrainIcon/> */}
                    </div>

                </div>
                
            </div>
        </div>
    </div>
  )
}

const AuthformStyle="bg-slate-200 m-2 p-2 w-full mx-auto rounded-lg border-1 border-zinc-800"


export default Authentication