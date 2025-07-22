const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to MongoDB successfully');
        
        
    }
    
    catch(err){
        console.log(err.message);
        
    }
}
module.exports =connectDB;