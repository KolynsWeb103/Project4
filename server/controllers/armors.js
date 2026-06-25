import { pool } from '../config/database.js'

const getArmors = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM armors
      ORDER BY name ASC
    `

    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getArmorById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM armors
      WHERE id = $1
    `

    const results = await pool.query(selectQuery, [req.params.armorId])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Armor not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getArmors,
  getArmorById
}
