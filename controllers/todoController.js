const toDoModel = require("../models/toDoModel");

// Create Todo
const todoController = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    if (!title || !description || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const todo = new toDoModel({ title, description, createdBy });
    await todo.save();

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Todos by User
const getTodosController = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const todos = await toDoModel.find({ createdBy: userId });

    res.status(200).json({ 
      message: "Todos fetched successfully",
       todos 
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteTodoController=async(req,res)=>{

try {

const id = req.params.id; // comes from token
  if(!id){
    return res.status(400).json({ message: "Todo ID is required" });

  }
  const todo =await toDoModel.findByIdAndDelete(id);
  if(!todo){
    return res.status(404).json({ message: "Todo not found" });
  } 
  res.status(200).json({
    message: "Todo deleted successfully",
    todo,
  });
  
} catch (error) {
  console.error("Error deleting todo:", error);
  res.status(500).json({ message: "Internal server error", error: error.message });
  
}

  
}

const updateTodoController = async (req, res) => {
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({ message: "Todo ID is required" });
    }
    const data =req.body;
    const todo =await toDoModel.findByIdAndUpdate(id,{$set:data},{new:true});
    if(!todo){
      return res.status(404).json({ message: "Todo not found" });
    } 
    res.status(200).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
    
  }
}
module.exports = { getTodosController, todoController,deleteTodoController,updateTodoController };
