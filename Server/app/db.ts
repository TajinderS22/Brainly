import mongoose from "mongoose";
import { Schema } from "mongoose";
import { string } from "zod";


const UserSchema=new Schema({
    userName: {type: String, required:true},
    email: {type:String, unique:true},
    password:{type: String, required:true},
    age: Number 
}, { timestamps: true })

const contentTypes=['youtube','document',"tweet","image","video",'audio',]

const ContentSchema= new Schema({
    type:{type:String, enum:contentTypes ,required:true },
    link:String,
    title: String,
    text: String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:'Tags'}]
},{timestamps:true})

const TagsSchema=new Schema({
    title: String,
    color: String,
    
},{timestamps:true})


const LinkSchema=new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref:"User", required:true}
},{timestamps:true})



export const userModel=mongoose.model('User',UserSchema)
export const contentModel=mongoose.model('Content',ContentSchema)
export const tagsModel=mongoose.model('Tags',TagsSchema)
export const linkModel=mongoose.model('Link',LinkSchema)