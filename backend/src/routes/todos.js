import express from 'express'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js'

const router = express.Router()

// Endpunkte mit den Controller-Funktionen verbinden
router.get('/', getTodos)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router