import http from 'http'
import { getComputers, getComputer, addComputer, deleteComputer, updateComputer, notFound } from './controller/computerController.js'

const server = http.createServer((req, res) => {

    const regex = '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}'
    const { url, method } = req

    switch (method) {
        case 'GET':
            if (url === '/api/computer') {
                getComputers(req, res)
                break
            }
            if (url.match(`/api/computer/${regex}`)) {
                const id = url.split('/')[3]
                getComputer(id, res)
                break
            }
            notFound(res)

        case 'POST':
            if (url === '/api/computer') {
                addComputer(req, res)
                break
            }

        case 'PUT':
            if (url.match(`/api/computer/${regex}`)) {
                const id = url.split('/')[3]
                updateComputer(id, req, res)
                break
            }
            break

        case 'DELETE':
            if (url.match(`/api/computer/${regex}`)) {
                const id = url.split('/')[3]
                deleteComputer(id, res)
                break
            }

        default:
            res.writeHead(405, { 'Allow': 'GET, POST, PUT, DELETE' })
            res.end()
            break
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
