import {Request, Response, Router} from 'express'
import bcrypt from 'bcrypt'
import {contentModel, linkModel, tagsModel, userModel} from '../db'
import {z} from 'zod'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { userMiddleware } from '../Middleware/UserMiddleware'
import { random } from '../utils/utils'
import mongoose from 'mongoose'


export const userRouter=Router()
const SaltRounds=10

const ObjectId=mongoose.Types.ObjectId


export interface AuthedRequest extends Request {
    userId?: string;
}



const zodSchema=z.object({
    userName:z.string(),
    email:z.string(),
    password:z.string(),
    age:z.string(),
    createdAt:z.date()

})


type UserData={
    userName: string,
    email: string,
    password: string,
    age?: number,
}

export type Usertype=UserData

userRouter.get('/',(req,res)=>{
    res.json({message:"You are at the server "})
})


userRouter.post("/signup",async(req,res)=>{
    const data: Usertype =req.body;
    const password=data.password
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

    const existingUser=await userModel.findOne({
        email:data.email
    })
    if(existingUser){
        res.status(409).json({
            messsage:"User Already registered please Signin."
        })
        return 
    }

    if(!password || typeof password!=='string' || !passwordRegex.test(password)){
        res.status(400).json({
            message:"Password must be atleast 8 characters long and must include atlest 1 upppercase, 1 lowercase and 1 special character"
        })
        return 
    }
   
    try {
        const hashedPassword= await bcrypt.hash(password,SaltRounds)
        data.password=(hashedPassword)
        zodSchema.safeParse(data)
        await userModel.create(data)
        res.status(200).json({
            message:"User Registered Successfully."
        })
        
    } catch (error: any ) {
        console.error(error)

    }

})

userRouter.post('/signin',async (req,res)=>{
    const data:Usertype=req.body
    try{
        const User=await userModel.findOne({
            email:data.email
        })
        if(!User){
            res.status(404).json({
                message:"User not found Please Signup"
            })
            return
        }
        
        const checkPassword=await bcrypt.compare(data.password,User.password)
        if(!checkPassword){
            res.status(409).json({
                message:"Password is incorrect"
            })
            return
        }
        if(User){
            const token=jwt.sign({id:User._id},JWT_SECRET,{
                expiresIn:'1w'
            })
            res.status(200).json({
                message:"User Signed in.",
                token:token
            })
        }
        return


    }catch (error){
        console.log(error)
    }

})


userRouter.post('/content', userMiddleware, async(req: AuthedRequest, res) => {
    const contentData=req.body
    contentData.userId=req.userId
    contentData.tags = contentData.tags.map((tag:string) => new ObjectId(tag));
    try {
        await contentModel.create(
            contentData
        )
        res.status(200).json({
            message:"content Cretaed"
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            message:"Internal server Error 500"
        })
    }

});


userRouter.get('/content',userMiddleware,async(req:AuthedRequest,res)=>{
    const userId=req.userId;
    try {
        const Response= await contentModel.find({
            userId
        }).populate("userId", { userName: 1 })
        res.status(200).json({
            Response
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server Error 500."
        })
    }

})

userRouter.delete('/content',userMiddleware,async(req:AuthedRequest,res)=>{
    if (!req.userId || typeof req.userId !== 'string') {
        res.status(400).json({ message: "Invalid userId" });
        return;
    }
    const userId = ObjectId.createFromHexString(req.userId);
    const contentId = ObjectId.createFromHexString(req.body.contentId);
    try {
         await contentModel.deleteOne({
            _id: contentId,
            userId
        });
        
        res.status(200).json({
            message: "deleted the content"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

userRouter.post("/brain/share",userMiddleware,async(req:AuthedRequest,res)=>{
    const share:boolean=req.body.share
    const userId=req.userId
    const hash= random(10)
    try {

        if(share ){
            await linkModel.create({
                hash,
                userId
            })
            const shareableLink=`/brain/share/${hash}`
            res.status(200).json({
                message:"you can now share your brain with given link.",
                link:shareableLink
            })

        }else{
            await linkModel.deleteOne({
                userId
            }) 
            res.status(200).json({
                message:"your Brain is now private.",
            }) 
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

userRouter.get("/brain/share",userMiddleware,async(req:AuthedRequest,res)=>{
    const userId=req.userId;
    const response=await linkModel.findOne({
        userId
    })
    res.status(200).json({
        data:response
    })
})

userRouter.get("/brain/share/:shareLink",async(req,res)=>{
    const hash=req.params.shareLink;
    const link=await linkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            message:"your given input is not valid"
        })
        return;
    }
    const user=await userModel.findOne({
        _id:link.userId
    })

    if(!user){
        res.status(411).json({
            message:"User Does not exist"
        })
        return;
    }

    const content=await contentModel.find({
        userId:link.userId
    })
    const userName=user?.userName
    res.json({
        message:"Fetched User brain",
        username:userName,
        content:content
    })
})

userRouter.post('/tags',async(req:AuthedRequest,res)=>{
    const {title,color}=req.body
    
    const response=await tagsModel.create({
        title,
        color
    })
    res.json({
        response
    })
})


userRouter.post('/authenticate-user',userMiddleware,async(req:AuthedRequest,res)=>{
    const userId=req.userId;
    const response =await userModel.find({
        _id:userId
    })
    if(response){
        res.status(200).json({
        user:response[0]
    })}else{
        res.status(401).json({
            message:"JWT token is invalid or expired "
        })
    }

})

userRouter.get('/tags',async(req,res)=>{
    const response=await tagsModel.find({

    })
    res.json({
        tags:response
    })
})  