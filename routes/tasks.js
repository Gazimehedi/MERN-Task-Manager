const express = require('express');
const router = express.Router();
const {CreateTask, DeleteTask, UpdateTaskStatus, listTaskByStatus, TaskStatusCount} = require('../controller/TaskController');
const {CheckAuth} = require('../middlewares/auth');

router.post('/createTask', CheckAuth, CreateTask);
router.post('/updateTaskStatus/:id/:status', CheckAuth, UpdateTaskStatus);
router.get('/listTaskByStatus/:status', CheckAuth, listTaskByStatus);
router.get('/taskStatusCount', CheckAuth, TaskStatusCount);
router.post('/deleteTask/:id', CheckAuth, DeleteTask);

module.exports=router;