const express= require("express")
const app= express()
const mongoose= require("mongoose")
const dotEnv= require("dotenv")
dotEnv.config()
const taskRouters= require('./routes/taskRouters')
const bodyparser= require('body-parser')
const errorHandler= require('./middleware/errorHandler')
const jwt= require("jsonwebtoken")

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log("server started")
})

app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongoose connect success")
    })
    .catch((err)=>{
        console.log("Error in mongoose connection:",err)
    })


app.use('/tasks',taskRouters)

app.use(errorHandler)



//bonus points 
// implement the authentication middleware
const secretKey= process.env.secretKey

const users= [
    {
        id:"1",
        username: "satish",
        password: "satish",
        isAdmin:true
    },
    {
        id:"2",
        username: "veeru",
        password: "veeru",
        isAdmin: false
    }
]

const verifyUser=((req,res,next)=>{
    const token= req.headers.authorization
    if(token){
        const subtoken= token.split(' ')[1]
        jwt.verify(subtoken,secretKey,(err,data)=>{
            if(err){
                res.status(401).json("subtoken is not valid")
            }
            req.user=data
            next()
        })
    }else{
        res.status(404).json("invalid Authorization")
    }
})

app.post("/", (req,res)=>{
    const {username,password}=req.body
    const user= users.find((person)=>{
        return person.username===username && person.password===password
    })
    if(user){
        const accessToken= jwt.sign({
            id:user.id,
            username: user.username,
            isAdmin: user.isAuth
        },secretKey)
        res.status(202).json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken
        })
    }
    else{
        res.status(404).json("user is not match")
    }
})



app.delete('/:userId',verifyUser,(req,res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("user is delete successfully")
    }else{
        res.status(401).json("You are not allowed to delete")
    }
})
