const getAllWeapons = async () => {
  const response = await fetch('/api/weapons')

  if (!response.ok) {
    throw new Error('Failed to fetch weapons')
  }

  const data = await response.json()
  return data
}

export default {
  getAllWeapons
}
