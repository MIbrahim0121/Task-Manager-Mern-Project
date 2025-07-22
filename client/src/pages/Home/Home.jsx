import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import todoService from "../../Service/todoService";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoId,setTodoId]= useState("")

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const id = userData && userData.id;
        console.log("User ID:", id);

        const response = await todoService.getTodo(id);
        console.log("API Response:", response);

        setTodos(response.data.todos || []);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  // Create new task
  const handleCreateTask = async () => {
    if (!title || !description) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const userdata = JSON.parse(localStorage.getItem("user"));
      if (!userdata) {
        console.error("No user data found in localStorage.");
        return;
      }

      const data = {
        title,
        description,
        createdBy: userdata.id,
      };

      const todo = await todoService.createTodo(data);
      toast.success("Task created successfully.");
      console.log(todo);

      // Update local list
      setTodos((prev) => [...prev, todo.data.todo]);
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

const handleEdit=async(updateTodo)=>{
  setIsUpdateOpen(true);
 
setTitle(updateTodo.title);
setDescription(updateTodo.description);
setTodoId(updateTodo._id)



}
const handleUpdate=async()=>{
  setIsUpdateOpen(false);
  setTitle("");
  setDescription("");

const id=todoId;
// const id=updateTodo;
const data ={ title,description}

const res=await todoService.updateTodo(id,data);
    const updatedTodo = res.data.todo; 

   setTodos(prev =>
      prev.map(t => t._id === id ? updatedTodo : t)
    );
console.log("Updated todo:", updatedTodo);
}




const handleDelete = async (id) => {

  // const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  // if (!confirmDelete) return; // User ne cancel kiya

  try {
    const res = await todoService.deleteTodo(id);
    toast.success("Task deleted successfully");

    console.log("Deleted:", res);

    // UI se remove karo
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  } catch (err) {
  
    console.error("Error deleting todo:", err);
  }
};

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Manager</h1>

        <input
          type="text"
          placeholder="Search tasks"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + New Task
        </button>

        {/* Todos List */}
       <div className="w-full max-w-md mt-6 grid gap-4">
  {todos.length > 0 ? (
    todos.map((todo) => (
      <div
        key={todo._id}
        className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl border border-gray-200 p-6 transition transform hover:scale-[1.02] hover:shadow-2xl relative"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{todo.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {todo.description}
            </p>
          </div>

          {/* Action Icons */}
          <div className="flex gap-3">
            <FaRegEdit
              className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200"
              size={22}
              onClick={() => handleEdit(todo)}
            />
            <MdOutlineDelete
              className="text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
              size={22}
              onClick={() => handleDelete(todo?._id)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>Created on: {new Date(todo.createdAt).toLocaleDateString()}</span>
          <span className="italic">Last updated</span>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center mt-6">No tasks found</p>
  )}
</div>

          

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">Create Task</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={handleCreateTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        {/* update popup */}
          {isUpdateOpen && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold mb-4">Update Task</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md w-full px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsUpdateOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
