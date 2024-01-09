const express=require('express');
const userRoutes=require('./routes/User');
const profileRoutes=require('./routes/Profile');
const paymentRoutes=require('./routes/Payments');
const courseRoutes=require('./routes/Course');
const assessmentRoutes=require('./routes/Assessment');
const database=require('./config/database');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {cloudinaryConnect}=require('./config/cloudinary');
const fileUpload=require('express-fileupload');
const dotenv=require('dotenv');

dotenv.config();
const app=express();
const PORT=process.env.PORT||4000
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:'http://localhost:3000',
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles : true ,
        tempFileDir : '/tmp'
    })
)

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/assessment",assessmentRoutes);

app.get("/",(req,res)=>
{
    return res.status(200).json({
        success:true,
        message:"Welcome to the API"
    })
})

app.listen(PORT,()=>
{
    console.log(`App is running at ${PORT}`)
})
