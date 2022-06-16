export function bodyParser(req) {
    return new Promise((resolve, reject) => {
        let totalData = ''
        req.on('data', (chunk) => {
            totalData += chunk.toString()
        })

        req.on('end', () => {
            req.body = JSON.parse(totalData)
            resolve()
        })

        req.on('error', () => {
            console.error('error')
            reject()
        })
    })
}