import fs from 'fs'

const jsonText = fs.readFileSync('../data/weapons_output.json', 'utf-8')
const weaponsData = JSON.parse(jsonText)

export default weaponsData
