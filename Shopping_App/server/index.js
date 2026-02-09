const express = require('express');
const app = express();
app.use(express.json());
const users=[{id:1,name:"Pankaj Kumar Rajbhar"}]
app.get("/",(req,res)=>{
    try{
        res.status(200).json({message:"All users",users})
    }
    catch(err){
        res.status(500).json({message:"Failed to fetch users",Error:err.message})
    }
})
app.get("/id",(req,res)=>{
    try{
        const id=req.params.id;
        const user = users.find(u=>u.id==id);
        if(!not){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"user found",user})
    }
    catch(err){
        res.status(500).json({message:"Failed to fetch users",Error:err.message})
    }
})
app.delete('/delete',(req,res)=>{
    try{
        const id=req.params.id;
        const dele = users[index].find(u=>u.id==id);
        if(){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"user found",user})
    }
    catch(err){
        res.status(500).json({message:"Failed to fetch users",Error:err.message})
    }
})
const port =4001;
app.listen(port,()=>{
    console.log(`Server is running  on port ${port}`)
})