
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
    const { title, description, startAtMs, duration} = req.body
    try {
        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: req.context.user.id,
                title: title,
                description: description ?? "",
                startAt: new Date(startAtMs ?? Date.now()), //if startAtMs is not given, make it start now
                duration: duration ?? 30,
                endAt: new Date(startAtMs + duration * 60000)
            }
        })
        res.json(newTodo)
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            error: "Could not create Todo with given parameters",
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
    const { title, description, startAtMs, duration } = req.body

    try {
        const todo = await req.context.prisma.todo.update({
            where: {
                id: Number(id),
                ownerId: req.context.user.id
            },
            data: {
                title: title || undefined,
                description: description || undefined,
                startAt: new Date(startAtMs) || undefined,
                duration: duration || undefined,
                endAt: duration && startAtMs ? new Date(startAtMs + duration * 60000) : undefined
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

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createTodoSmartSchedule = async (req, res) => {
    const { title, description, duration } = req.body
    const startAtMs = Date.now()
    try {
        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: req.context.user.id,
                title: title,
                description: description ?? "",
                startAt: new Date(startAtMs),
                duration: duration ?? 30,
                endAt: new Date(startAtMs + duration * 60000)
            }
        })
        res.json(newTodo)
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            error: "Could not create Todo with given parameters",
            params: req.body
        })
    }    
} 

/**
 * 
 * @param {import('types/express').Context} context
 * @param {number} duration 
 * @param {number} timeFrameStartMs
 * @param {number} timeFrameEndMs
 */
const calculateSmartStartTime = async (context, duration, timeFrameStartMs, timeFrameEndMs) => {
    const todos = await context.prisma.todo.findMany({
        select: {
            startAt: true,
            duration: true
        },
        where: {
            ownerId: context.user.id,
            OR: [
                {
                    startAt: {
                        gte: new Date(timeFrameStartMs),
                        lte: new Date(timeFrameEndMs)
                    }
                },
            ]
            
        }
    })
    let startAt = new Date(timeFrameStartMs)
    for(const todo of todos) {
        const endAt = startAt.getTime() + duration * 60000
        if(todo.startAt.getTime() < endAt) {
            startAt = new Date(todo.startAt.getTime() + todo.duration * 60000)
        }
    }
}