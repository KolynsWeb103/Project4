import { pool } from './database.js'
import './dotenv.js'
import armorsData from '../data/armors.js'
import weaponsData from '../data/weapons.js'
import decorationsData from '../data/decorations.js'
import skillsData from '../data/skills.js'

const makeArmorId = (armor, index) => {
  return `${armor.part}_${armor.name}_${armor["hunter-type"]}_${armor.sex}_${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const createArmorsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS armors;

    CREATE TABLE IF NOT EXISTS armors (
      id VARCHAR(255) PRIMARY KEY,
      part VARCHAR(50),
      name VARCHAR(255),
      rare INTEGER,
      price INTEGER,
      hunter_type VARCHAR(20),
      defense INTEGER,
      skill_points JSONB,
      description TEXT,
      slots INTEGER,
      fire_res INTEGER,
      thundr_res INTEGER,
      dragon_res INTEGER,
      water_res INTEGER,
      ice_res INTEGER
    )
  `

  await pool.query(createTableQuery)
}

const seedArmorsTable = async () => {
  const insertArmorsQuery = `
    INSERT INTO armors (
      id,
      part,
      name,
      rare,
      price,
      hunter_type,
      defense,
      skill_points,
      description,
      slots,
      fire_res,
      thundr_res,
      dragon_res,
      water_res,
      ice_res
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15
    )
  `

  for (let i = 0; i < armorsData.length; i++) {
    const armor = armorsData[i]
    const id = makeArmorId(armor, i)

    await pool.query(insertArmorsQuery, [
        id,
        armor.part,
        armor.name,
        armor.rare,
        armor.price,
        armor["hunter-type"],
        armor.defense,
        JSON.stringify(armor["skill-points"]),
        armor.description,
        armor.slots,
        armor["fire-res"],
        armor["thundr-res"],
        armor["dragon-res"],
        armor["water-res"],
        armor["ice-res"]
    ])
    }
}

const makeWeaponId = (weapon, index) => {
  return `${weapon.type}_${weapon.name}_${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const createWeaponsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS weapons;

    CREATE TABLE IF NOT EXISTS weapons (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      type VARCHAR(50),
      attack INTEGER,
      rare INTEGER,
      slots INTEGER,
      affinity INTEGER,
      defense INTEGER,
      description TEXT,
      elements JSONB
    )
  `

  await pool.query(createTableQuery)
}

const seedWeaponsTable = async () => {
  const insertWeaponsQuery = `
    INSERT INTO weapons (
      id,
      name,
      type,
      attack,
      rare,
      slots,
      affinity,
      defense,
      description,
      elements
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    )
  `

  for (let i = 0; i < weaponsData.length; i++) {
    const weapon = weaponsData[i]
    const id = makeWeaponId(weapon, i)

    await pool.query(insertWeaponsQuery, [
      id,
      weapon.name,
      weapon.type,
      weapon.attack,
      weapon.rare,
      weapon.slots,
      weapon.affinity,
      weapon.defense,
      weapon.description,
      JSON.stringify(weapon.elements)
    ])
  }
}

const makeDecorationId = (decoration, index) => {
  return `${decoration.name}_${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const createDecorationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS decorations;

    CREATE TABLE IF NOT EXISTS decorations (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      slots INTEGER,
      price INTEGER,
      skill_points JSONB,
      color VARCHAR(255)
    )
  `

  await pool.query(createTableQuery)
}

const seedDecorationsTable = async () => {
  const insertDecorationsQuery = `
    INSERT INTO decorations (
      id,
      name,
      slots,
      price,
      skill_points,
      color
    )
    VALUES (
      $1, $2, $3, $4, $5, $6
    )
  `

  for (let i = 0; i < decorationsData.length; i++) {
    const decoration = decorationsData[i]
    const id = makeDecorationId(decoration, i)

    await pool.query(insertDecorationsQuery, [
      id,
      decoration.name,
      decoration.slots,
      decoration.price,
      JSON.stringify(decoration["skill-points"]),
      decoration.color
    ])
  }
}

const makeSkillId = (skill, index) => {
  return `${skill["skill-point"]}_${skill.name}_${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const createSkillsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS skills;

    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      skill_point VARCHAR(255),
      points INTEGER
    )
  `

  await pool.query(createTableQuery)
}

const seedSkillsTable = async () => {
  const insertSkillsQuery = `
    INSERT INTO skills (
      id,
      name,
      skill_point,
      points
    )
    VALUES (
      $1, $2, $3, $4
    )
  `

  for (let i = 0; i < skillsData.length; i++) {
    const skill = skillsData[i]
    const id = makeSkillId(skill, i)

    await pool.query(insertSkillsQuery, [
      id,
      skill.name,
      skill["skill-point"],
      skill.points
    ])
  }
}

const resetDatabase = async () => {
  try {
    // await createArmorsTable()
    // await seedArmorsTable()
    console.log('✅ armors table created and seeded')

    // await createWeaponsTable()
    // await seedWeaponsTable()
    console.log('✅ weapons table created and seeded')

    // await createDecorationsTable()
    // await seedDecorationsTable()
    console.log('✅ decorations table created and seeded')

    // await createSkillsTable()
    // await seedSkillsTable()
    console.log('✅ skills table created and seeded')

  } catch (error) {
    console.error('⚠️ error resetting armors table', error)
  }
}

resetDatabase()
