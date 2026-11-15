import app from './src/app.js'
import connectToDb from './src/config/db.js';
import dotenv from "dotenv";
dotenv.config();

const port =process.env.PORT || 8080;
connectToDb();

app.listen(port,(req,res)=>{
    console.log("server is runnig on port http://localhost:3000")
})