
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

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const updateTodo = async (req, res) => {
    const { id } = req.params
    const { title, descritpion, startAt, duration } = req.body

    try {
        const todo = await req.context.prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                title: title || undefined,
                descritpion: descritpion || undefined,
                startAt: new Date(startAt) || undefined,
                duration: duration || undefined
            }
        })
        res.json(todo)
    } catch (error) {
        console.error(error)
        return res.status(404).json({ 
            error: `ToDo update with id = ${id} did not work`,
            id: id,
            params: req.body
        })
    }
}

export const deleteTodo = (req, res) => {
    const { id } = req.params
    todos = todos.filter(t => t.id != id)
    res.json({ message: "To-Do deleted" })
}