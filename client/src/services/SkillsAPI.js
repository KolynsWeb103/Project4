const getAllSkills = async () => {
  const response = await fetch('/api/skills')

  if (!response.ok) {
    throw new Error('Failed to fetch skills')
  }

  const data = await response.json()
  return data
}

export default {
  getAllSkills
}
