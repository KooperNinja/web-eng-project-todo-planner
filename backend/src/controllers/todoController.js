
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getTodos = async (req, res) => {
    const todos = await req.context.prisma.todo.findMany({
        where: {
            ownerId: req.context.user.id
        }
    })
    return res.json(todos)
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createTodo = async (req, res) => {
    const { title, descritpion, startAtMs, duration} = req.body
    try {
        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: req.context.user.id,
                title: title,
                descritpion: descritpion ?? "",
                startAt: new Date(startAtMs ?? Date.now()), //if startAt is not given, make it start now
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
    const { title, descritpion, startAtMs, duration } = req.body

    try {
        const todo = await req.context.prisma.todo.update({
            where: {
                id: Number(id),
                ownerId: req.context.user.id
            },
            data: {
                title: title || undefined,
                descritpion: descritpion || undefined,
                startAt: new Date(startAtMs) || undefined,
                duration: duration || undefined
            }
        })
        res.json(todo)
    } catch (error) {
        console.error(error)
        return res.status(404).json({ 
            error: `Todo update with id = ${id} did not work`,
            id: Number(id),
            params: req.body
        })
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
       const deleteTodo = await req.context.prisma.todo.delete({
            where: {
                id: Number(id),
                ownerId: req.context.user.id
            }
       }) 
       res.json(deleteTodo)
    } catch (error) {
        console.error(error)
        return res.status(404).json({
            error: `Todo with id = ${id} could not be deleted`,
            id: Number(id)
        })
    }
}