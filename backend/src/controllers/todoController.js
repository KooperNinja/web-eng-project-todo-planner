let todos = [
    { id: 1, text: "Einkaufen", done: false },
    { id: 2, text: "Hausaufgaben", done: true }
]

export const getTodos = (req, res) => {
    res.json(todos)
}

export const createTodo = (req, res) => {
    const { text } = req.body
    if (!text) {
        return res.status(400).json({ error: "Text is required" })
    }
    const newTodo = { id: todos.length + 1, text, done: false }
    todos.push(newTodo)
    res.status(201).json(newTodo)
}

export const updateTodo = (req, res) => {
    const { id } = req.params
    const { text, done } = req.body

    const todo = todos.find(t => t.id == id)
    if (!todo) return res.status(404).json({ error: "To-Do not found" })

    if (text) todo.text = text
    if (done !== undefined) todo.done = done

    res.json(todo)
}

export const deleteTodo = (req, res) => {
    const { id } = req.params
    todos = todos.filter(t => t.id != id)
    res.json({ message: "To-Do deleted" })
}