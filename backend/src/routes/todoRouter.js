import express from 'express'
import { getTodos, createTodo, updateTodo, deleteTodo, createTodoSmartSchedule } from '../controllers/todoController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)

//Connect Controller functions to the according routes
router.get('/', getTodos)
router.post('/', createTodo)
router.post('/new', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.post("/smart", createTodoSmartSchedule)

export default router