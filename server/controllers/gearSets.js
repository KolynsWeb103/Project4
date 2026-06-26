import { pool } from '../config/database.js'

const getGearSets = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT *
      FROM gear_sets
      ORDER BY id ASC
    `)

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getGearSetById = async (req, res) => {
  try {
    const results = await pool.query(
      `
        SELECT *
        FROM gear_sets
        WHERE id = $1
      `,
      [req.params.gearSetId]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Gear set not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createGearSet = async (req, res) => {
  try {
    const {
      name,
      gear,
      decorations,
      totalCost,
      stats,
      skillPoints,
      activeSkills
    } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Gear set name is required' })
    }

    if (!gear?.weapon) {
      return res.status(400).json({ error: 'A weapon is required' })
    }

    const results = await pool.query(
      `
        INSERT INTO gear_sets (
          name,
          gear,
          decorations,
          total_cost,
          stats,
          skill_points,
          active_skills
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [
        name,
        JSON.stringify(gear),
        JSON.stringify(decorations || {}),
        Number(totalCost || 0),
        JSON.stringify(stats || {}),
        JSON.stringify(skillPoints || []),
        JSON.stringify(activeSkills || [])
      ]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updateGearSet = async (req, res) => {
  try {
    const {
      name,
      gear,
      decorations,
      totalCost,
      stats,
      skillPoints,
      activeSkills
    } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Gear set name is required' })
    }

    if (!gear?.weapon) {
      return res.status(400).json({ error: 'A weapon is required' })
    }

    const results = await pool.query(
      `
        UPDATE gear_sets
        SET
          name = $1,
          gear = $2,
          decorations = $3,
          total_cost = $4,
          stats = $5,
          skill_points = $6,
          active_skills = $7,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `,
      [
        name,
        JSON.stringify(gear),
        JSON.stringify(decorations || {}),
        Number(totalCost || 0),
        JSON.stringify(stats || {}),
        JSON.stringify(skillPoints || []),
        JSON.stringify(activeSkills || []),
        req.params.gearSetId
      ]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Gear set not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deleteGearSet = async (req, res) => {
  try {
    const results = await pool.query(
      `
        DELETE FROM gear_sets
        WHERE id = $1
        RETURNING *
      `,
      [req.params.gearSetId]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Gear set not found' })
    }

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getGearSets,
  getGearSetById,
  createGearSet,
  updateGearSet,
  deleteGearSet
}
