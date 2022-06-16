import computers from '../../data/data.json' assert { type: "json" }
import { v4 as uuidv4 } from 'uuid'
import { writeDataToFile } from '../utils/addDataToJsonFile.js'

export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(computers)
    })
}

export function findById(id) {
    return new Promise((resolve, reject) => {
        const computer = computers.find(item => item.id === id)
        resolve(computer)
    })
}

export function create(computer) {
    return new Promise((resolve, reject) => {
        const newComputer = { id: uuidv4(), ...computer }
        computers.push(newComputer)
        writeDataToFile('./data/data.json', computers)
        resolve(newComputer)
    })
}

export function remove(id) {
    return new Promise((resolve, reject) => {
        let updatedComputers = computers.filter(item => item.id !== id)
        writeDataToFile('./data/data.json', updatedComputers)
        resolve()
    })
}

export function update(data, item) {
    return new Promise((resolve, reject) => {
        let updatedComputers = computers.map(x => {
            if (x.id === item.id) {
                x.platform = data.platform || x.platform
                x.type = data.type || x.type
                x.os = data.os || x.os
                x.stack = data.stack || x.stack
            }
            return x
        });
        writeDataToFile('./data/data.json', updatedComputers)
        resolve()
    })
}