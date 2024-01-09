const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please enter your First Name'],
        trim:true,
    },
    lastName:{
        type:String,
        required:[true,'Please enter your First Name'],
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    } ,
    password:{
        type:String,
        required:true,
        minlength:6,
    }
        ,
        accountType:{
            type:String,
            required:true,
            enum:['Admin','Student',"Instructor"]
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Profile"
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Course'
        }],
        image:{
            type:String,
            required:true,
        },
        token:{
            type:String,
        },
        resetPasswordExpires:{
        type:Date,
        },
        courseProgress:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true, 
            ref:"CourseProgress", 
        }],  
},
{timestamps:true});

module.exports=mongoose.model("User",userSchema); 