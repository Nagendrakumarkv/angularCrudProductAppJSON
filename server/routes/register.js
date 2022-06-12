const express=require('express')
const router=express.Router();
const Register=require('../models/register')

router.get('/',async(req,res)=>{
  try{
  const register=await Register.find();
  res.send(register);
  }catch(err){
    res.send(err)
  }
})

router.post('/',async(req,res)=>{
  const register=new Register({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    date:req.body.date,
    email:req.body.email,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword,
  })
  try{
    const r1=await register.save()
    res.json(r1)
  }catch(err){
    res.send(err)
  }
})

module.exports=router
