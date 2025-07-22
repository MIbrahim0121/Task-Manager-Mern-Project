const express = require('express');
const {todoController,getTodosController,deleteTodoController, updateTodoController} = require('../controllers/todoController');
const router = express.Router();
const authMiddleware = require('../middleWare/authMiddleware');

router.post("/create",authMiddleware  , todoController)
router.get("/getAll/:userId", authMiddleware, getTodosController);
router.delete("/delete/:id",authMiddleware, deleteTodoController);
router.patch("/update/:id",authMiddleware, updateTodoController);



module.exports = router; 
