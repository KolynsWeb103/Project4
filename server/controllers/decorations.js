import { pool } from '../config/database.js'

const getDecorations = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM decorations
      ORDER BY name ASC
    `

    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getDecorationById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM decorations
      WHERE id = $1
    `

    const results = await pool.query(selectQuery, [req.params.decorationId])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Decoration not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getDecorations,
  getDecorationById
}
