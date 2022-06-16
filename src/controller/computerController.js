import { setData } from '../handler/handlerComputer.js'
import { findById, findAll, create, remove, update } from '../model/computerModel.js'
import { bodyParser } from '../utils/bodyParser.js'

// @desc    Gets All Computers
// @route   GET /api/computer
export async function getComputers(req, res) {
    try {
        const computers = await findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(computers))
    } catch (error) {
        console.error(error)
        error500(res)
    }
}

// @desc    Get Single Computer
// @route   GET /api/computer/:id 
export async function getComputer(id, res) {
    try {
        const computer = await findById(id)
        if (!computer) {
            notFound(res)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(computer))
    } catch (error) {
        console.error(error)
        error500(res)
    }
}

// @desc    Add a Computer
// @route   POST /api/computer
export async function addComputer(req, res) {
    try {
        await bodyParser(req)
        const computer = setData(req)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(await create(computer)))
    } catch (error) {
        console.error(error)
        error500(res)
    }
}

// @desc    Remove a Computer
// @route   DELETE /api/computer/:id 
export async function deleteComputer(id, res) {
    try {
        let itemToDelete = await findById(id)
        if (!itemToDelete) {
            notFound(res)
        }
        await remove(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: `Computer id: ${itemToDelete.id} was deleted` }))
    } catch (error) {
        console.error(error)
        error500(res)
    }
}

// @desc    Update a Computer
// @route   PUT /api/computer/:id 
export async function updateComputer(id, req, res) {
    try {
        let itemToUpdate = await findById(id)
        if (!itemToUpdate) {
            notFound(res)
        }
        await bodyParser(req)
        const data = setData(req)
        await update(data, itemToUpdate)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(itemToUpdate))
    } catch (error) {
        console.error(error)
        error500(res)
    }
}

// @desc    Resource Not Found
export function notFound(res) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
        "message": "Resource not found"
    }))
}

// @desc    Error500
export function error500(res) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end()
}
