const mongoose = require("mongoose");
const toDoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    }

},{timestamps:true}
)

const toDoModel =mongoose.model("todos",toDoSchema);
module.exports = toDoModel;
