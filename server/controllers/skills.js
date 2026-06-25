import { pool } from '../config/database.js'

const getSkills = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM skills
      ORDER BY name ASC
    `

    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getSkillById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM skills
      WHERE id = $1
    `

    const results = await pool.query(selectQuery, [req.params.skillId])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getSkills,
  getSkillById
}
