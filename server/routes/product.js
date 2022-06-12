const express= require('express');
const router=express.Router();
const Product=require('../models/product');

router.get('/',async(req,res)=>{
  try{
    const product= await Product.find();
    res.json(product)
  }catch{
    res.send('Error')
  }
})

router.get('/:id',async(req,res)=>{
  try{
   const product=await Product.findById(req.params.id);
   res.json(product)
  }catch(err){
    res.send(err);
  }
})

router.post('/',async(req,res)=>{
  const product=new Product({
    productName:req.body.productName,
    category:req.body.category,
    date:req.body.date,
    freshness:req.body.freshness,
    price:req.body.price,
    comment:req.body.comment
  })
  try{
   const p1=await product.save();
   res.json(p1);
  }catch(err){
    res.send(err)
  }
})

router.put('/:id',async(req,res)=>{
  try{
    const product=await Product.findById(req.params.id);

    product.id=req.body.id
    product.productName=req.body.productName
    product.category=req.body.category
    product.date=req.body.date
    product.freshness=req.body.freshness
    product.price=req.body.price
    product.comment=req.body.comment

    const p1=await product.save();
    res.send(p1)

  }catch(err){
    res.send(err)
  }
})

router.delete('/:id',async(req,res)=>{
  try{
  const product=await Product.findByIdAndDelete(req.params.id);
  res.send("product deleted successfully")

  }catch(err){
    res.send(err)
  }
})

module.exports=router;
