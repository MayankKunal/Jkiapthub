const mongoose=require("mongoose");

 const   answerSchema=new mongoose.Schema(
    {
           student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
           },
           
           answer:{
            type:String,
            required:true
           }

    }
 ); 
 
 module.exports=mongoose.model("Answer",answerSchema);