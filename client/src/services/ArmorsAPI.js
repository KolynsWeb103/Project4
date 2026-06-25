const getAllArmors = async () => {
  const response = await fetch('/api/armors')

  if (!response.ok) {
    throw new Error('Failed to fetch armors')
  }

  const data = await response.json()
  return data
}

export default {
  getAllArmors
}
