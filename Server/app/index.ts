import express from 'express'
import mongoose from 'mongoose'
import { userRouter } from './routes/user'
import dotenv from "dotenv"
import cors from 'cors' 

dotenv.config()

const app= express()
const port=3000

app.use(cors())

app.use(express.json())



app.use('/api/v1/user',userRouter)

app.get("/",(req,res)=>{
    res.send("Hi Tajinder")
})

const Main=async ()=>{    
    await mongoose.connect( process.env.MONGO_DB_URL+'BrinlyApp')
    

    app.listen(port,()=>{
        console.log(`Server is live at port ${port}.`)
    })

}
Main()