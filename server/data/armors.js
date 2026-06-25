import fs from 'fs'

const jsonText = fs.readFileSync('../data/armors_output.json', 'utf-8')
const armorsData = JSON.parse(jsonText)

export default armorsData
