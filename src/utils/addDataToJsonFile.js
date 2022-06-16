import fs from 'fs'

export function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if(err) {
            console.error(err)
        }
    })
}