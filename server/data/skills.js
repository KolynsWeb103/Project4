import fs from 'fs'

const jsonText = fs.readFileSync('../data/skills.json', 'utf-8')
const skillsData = JSON.parse(jsonText)

export default skillsData
