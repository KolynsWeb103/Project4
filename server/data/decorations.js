import fs from 'fs'

const jsonText = fs.readFileSync('../data/decorations_output.json', 'utf-8')
const decorationsData = JSON.parse(jsonText)

export default decorationsData
