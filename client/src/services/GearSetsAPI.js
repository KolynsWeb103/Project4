const API_BASE = '/api/gearSets'

const getAllGearSets = async () => {
  const response = await fetch(API_BASE)

  if (!response.ok) {
    throw new Error('Failed to fetch gear sets')
  }

  return response.json()
}

const getGearSetById = async (gearSetId) => {
  const response = await fetch(`${API_BASE}/${gearSetId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch gear set')
  }

  return response.json()
}

const createGearSet = async (gearSet) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gearSet)
  })

  if (!response.ok) {
    throw new Error('Failed to create gear set')
  }

  return response.json()
}

const updateGearSet = async (gearSetId, gearSet) => {
  const response = await fetch(`${API_BASE}/${gearSetId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gearSet)
  })

  if (!response.ok) {
    throw new Error('Failed to update gear set')
  }

  return response.json()
}

const deleteGearSet = async (gearSetId) => {
  const response = await fetch(`${API_BASE}/${gearSetId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Failed to delete gear set')
  }

  return response.json()
}

export default {
  getAllGearSets,
  getGearSetById,
  createGearSet,
  updateGearSet,
  deleteGearSet
}