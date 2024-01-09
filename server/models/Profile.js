 const mongoose=require("mongoose");

 const profileSchema=new mongoose.Schema(
    {
  gender:{
    type:String,
  },
  dateOfBirth:{
    type:String,
    
  },
  about:{
    type:String,
    trim:true,
  },
  contactNumber:{
    type:String,
    maxlength:[10,"Contact number can not be more than 10 characters"],
  }
    
    }
 );

 module.exports=mongoose.model("Profile",profileSchema);