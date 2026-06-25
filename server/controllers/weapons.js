import { pool } from '../config/database.js'

const getWeapons = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM weapons
      ORDER BY name ASC
    `

    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getWeaponById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT *
      FROM weapons
      WHERE id = $1
    `

    const results = await pool.query(selectQuery, [req.params.weaponId])

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getWeapons,
  getWeaponById
}
