
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getTodos = async (req, res) => {
    const todos = await req.context.prisma.todo.findMany()
    return res.json(todos)
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createTodo = async (req, res) => {
    const { title, descritpion, startAt, duration} = req.body
    try {
        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: 1, //needs to be the users id later
                title: title,
                descritpion: descritpion ?? "",
                startAt: new Date(startAt ?? Date.now()), //if startAt is not given, make it start now
                duration: duration ?? 30
            }
        })
        res.json(newTodo)
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            error: "Could not create Todo with given paramteters",
            params: req.body
        })
    }    
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