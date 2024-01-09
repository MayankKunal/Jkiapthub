const mongoose=require("mongoose");

 const assessmentSchema=new mongoose.Schema(
    {
           instructor:
           {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
               },
           question:{
            type:String,
           },
           answer:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Answer",
           },],

    }
 ); 
 
 module.exports=mongoose.model("Assessment",assessmentSchema);

 exports.getAllAssessment=async(req,res)=>
 {
    try{
            
    }
    catch(err)
    {

    }
 }