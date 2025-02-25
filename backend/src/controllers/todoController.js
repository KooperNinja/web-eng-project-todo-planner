import { time } from 'console'

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
    const { title, description, startAtMs, duration } = req.body
    try {
        const endAtMs = startAtMs + duration * 60000
        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: req.context.user.id,
                title: title,
                description: description ?? "",
                startAt: new Date(startAtMs ?? Date.now()), //if startAtMs is not given, make it start now
                duration: duration ?? 30,
                endAt: new Date(endAtMs)
            }
        })
        res.json(newTodo)
    } catch (error) {
        console.log(error)
        console.log(req.body)
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
    let { title, description, duration } = req.body
    let { timeFrameEndMs, timeFrameStartMs } = req.body

    if (!timeFrameEndMs || !timeFrameStartMs) {
        const defaultTimeFrame = getDefaultTimeFrame()
        timeFrameStartMs = defaultTimeFrame.timeFrameStartMs
        timeFrameEndMs = defaultTimeFrame.timeFrameEndMs
    }

    try {
        duration = duration ?? 30
        const startAt = await calculateSmartStartTime(req.context, duration, timeFrameStartMs, timeFrameEndMs)

        const newTodo = await req.context.prisma.todo.create({
            data: {
                ownerId: req.context.user.id,
                title: title,
                description: description ?? "",
                startAt: startAt,
                duration: duration,
                endAt: new Date(startAt.getTime() + duration * 60000)
            }
        })
        res.json(newTodo)
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            error: "Could not create smart Todo with given parameters",
            params: req.body
        })
    }
}


/**
 * 
 * @returns {{timeFrameStartMs: number, timeFrameEndMs: number}}
 */
const getDefaultTimeFrame = () => {
    const now = new Date()
    const timeFrameStart = new Date(now)
    const timeFrameStartMs = timeFrameStart.setHours(16, 0, 0, 0)
    const timeFrameEnd = new Date(now)
    const timeFrameEndMs = timeFrameEnd.setHours(23, 59, 59, 999)
    return { timeFrameStartMs, timeFrameEndMs }
}

/**
 * 
 * @param {import('types/express').Context} context
 * @param {number} duration 
 * @param {number} timeFrameStartMs
 * @param {number} timeFrameEndMs
 * @returns {Promise<Date>} 
 */
const calculateSmartStartTime = async (context, duration, timeFrameStartMs, timeFrameEndMs) => {
    const todos = await context.prisma.todo.findMany({
        select: {
            startAt: true,
            duration: true,
            endAt: true
        },
        orderBy: {
            startAt: "asc"
        },
        where: {
            ownerId: context.user.id,
            startAt: {
                lte: new Date(timeFrameEndMs)
            },
            endAt: {
                gte: new Date(timeFrameStartMs)
            }
        }
    })
    let startAt = new Date(timeFrameStartMs)
    for (let i = 0; i < todos.length; i++) {
        const endAtMs = startAt.getTime() + duration * 60000
        const todo = todos[i]
        const lastTodo = todos[i - 1]

        if (todo.startAt.getTime() > endAtMs && (!lastTodo || lastTodo.endAt.getTime() < startAt.getTime())) {
            return startAt
        }
        startAt = new Date(todo.endAt.getTime())
    }
    return startAt
}