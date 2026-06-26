const getAllDecorations = async () => {
  const response = await fetch('/api/decorations')

  if (!response.ok) {
    throw new Error('Failed to fetch decorations')
  }

  const data = await response.json()
  return data
}

export default {
  getAllDecorations
}
