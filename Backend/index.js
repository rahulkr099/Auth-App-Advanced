//1. Require files and libraries
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/user.routes")
const helmet = require('helmet');//For security headers
const rateLimit = require('express-rate-limit');//For rate limiting
const cors = require('cors')

//2. Load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//3. Ensure essential environment variables are set
if(!process.env.DATABASE_URL || !process.env.JWT_SECRET){
    console.error("Critical environment variables are missing.");
    process.exit(1);//Exit with failure
}
//4. Initialize express app
const app = express();

//5. Connect to the database
require("./config/database").connect();

//6. Use middleware
app.use(express.json());//Parse JSON payloads
app.use(cookieParser());//Parse cookies
app.use(express.urlencoded({ extended: true }));//Parse URL-encoded payloads
// app.use(
//     helmet({
//       contentSecurityPolicy: {
//         directives: {
//           defaultSrc: ["'self'"],
//           scriptSrc: ["'self'", "http://localhost:5173"],
//           connectSrc: ["'self'", "http://localhost:4000"],
//         },
//       },
//       crossOriginEmbedderPolicy: false, // Disable if interfering
//     })
//   );//Set secure HTTP headers
app.use(cors({
    origin: 'http://localhost:5173', // Specify your frontend's origin
  credentials: true, // Allow credentials (cookies, etc.)
}));

//7. Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    max: 100, //Limit each IP to 100 requests per windowMs
    message:{
        success:false,
        message:"Too many requests, please try again later.",
    }
});
// app.use(limiter);

//8. Define routes
app.use("/api/v1",userRoutes);

//9. Health check route
app.get("/ping", (req, res) => {
    return res.send('<h1 style="color:red;">PONG</h1>'); 
});

//10. Handle undefined routes
app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Route not found.",
    });
});

//11. Centralized error handling
app.use((err, req, res, next)=>{
    console.error(`Error: ${err.message}`);
    res.status(500).json({
        success:false,
        message:"An internal server error occurred.",
    });
});
//12. Start the server
app.listen(PORT, ()=>{
    console.log("Server run at ",PORT);
});
