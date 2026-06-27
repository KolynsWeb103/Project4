import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import GearSetsAPI from '../services/GearSetsAPI'
import '../css/GearSetDetail.css'

const GearSetDetail = () => {
  const { gearSetId } = useParams()
  const navigate = useNavigate()

  const [gearSet, setGearSet] = useState(null)
  const [gearSetName, setGearSetName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGearSet()
  }, [gearSetId])

  const fetchGearSet = async () => {
    try {
      setLoading(true)

      const data = await GearSetsAPI.getGearSetById(gearSetId)

      setGearSet(data)
      setGearSetName(data.name || '')
      setMessage('')
    } catch (error) {
      console.error('Error fetching gear set:', error)
      setMessage('Failed to load gear set.')
    } finally {
      setLoading(false)
    }
  }

  const getTotalCost = () => {
    return gearSet?.total_cost ?? gearSet?.totalCost ?? 0
  }

  const getActiveSkills = () => {
    return gearSet?.active_skills || gearSet?.activeSkills || []
  }

  const getSkillPoints = () => {
    return gearSet?.skill_points || gearSet?.skillPoints || []
  }

  const getGearName = (slot) => {
    return gearSet?.gear?.[slot]?.name || 'None'
  }

  const getDecorations = (slot) => {
    return gearSet?.decorations?.[slot] || []
  }

  const handleUpdateGearSet = async () => {
    if (!gearSetName.trim()) {
      setMessage('Gear set name cannot be empty.')
      return
    }

    const updatedGearSet = {
      ...gearSet,
      name: gearSetName.trim(),

      totalCost: getTotalCost(),
      total_cost: getTotalCost(),

      skillPoints: getSkillPoints(),
      skill_points: getSkillPoints(),

      activeSkills: getActiveSkills(),
      active_skills: getActiveSkills()
    }

    try {
      const savedGearSet = await GearSetsAPI.updateGearSet(gearSetId, updatedGearSet)

      setGearSet(savedGearSet)
      setGearSetName(savedGearSet.name || gearSetName.trim())
      setMessage('Gear set updated successfully!')
    } catch (error) {
      console.error('Error updating gear set:', error)
      setMessage('Failed to update gear set.')
    }
  }

  const handleDeleteGearSet = async () => {
    try {
      await GearSetsAPI.deleteGearSet(gearSetId)
      navigate('/gears')
    } catch (error) {
      console.error('Error deleting gear set:', error)
      setMessage('Failed to delete gear set.')
    }
  }

  if (loading) {
    return (
      <main className="gear-set-detail-page">
        <h1>Gear Set Detail</h1>
        <p>Loading gear set...</p>
      </main>
    )
  }

  if (!gearSet) {
    return (
      <main className="gear-set-detail-page">
        <h1>Gear Set Detail</h1>
        <p>Gear set not found.</p>
        <Link to="/gears">Back to View Gears</Link>
      </main>
    )
  }

  const activeSkills = getActiveSkills()
  const skillPoints = getSkillPoints()

  return (
    <main className="gear-set-detail-page">
      <div className="gear-set-detail-header">
        <div>
          <Link to="/gears">← Back to View Gears</Link>
          <h1>Gear Set Detail</h1>
        </div>

        <button
          className="delete-gear-set-button"
          onClick={handleDeleteGearSet}
        >
          Delete
        </button>
      </div>

      {message && (
        <p className="gear-set-detail-message">
          {message}
        </p>
      )}

      <section className="gear-set-detail-card">
        <div className="gear-set-detail-name-field">
          <label htmlFor="gear-set-name">Gear Set Name</label>

          <input
            id="gear-set-name"
            type="text"
            value={gearSetName}
            onChange={(event) => setGearSetName(event.target.value)}
          />
        </div>

        <p className="gear-set-detail-cost">
          💰 Total Cost: {getTotalCost()}z
        </p>

        <button onClick={handleUpdateGearSet}>
          Update Gear Set
        </button>
      </section>

      <section className="gear-set-detail-grid">
        <article className="gear-set-detail-panel">
          <h2>Equipment</h2>

          <p><strong>Weapon:</strong> {getGearName('weapon')}</p>
          <p><strong>Helmet:</strong> {getGearName('helmet')}</p>
          <p><strong>Plate:</strong> {getGearName('plate')}</p>
          <p><strong>Gauntlets:</strong> {getGearName('gauntlets')}</p>
          <p><strong>Waist:</strong> {getGearName('waist')}</p>
          <p><strong>Leggings:</strong> {getGearName('leggings')}</p>
        </article>

        <article className="gear-set-detail-panel">
          <h2>Decorations</h2>

          {['weapon', 'helmet', 'plate', 'gauntlets', 'waist', 'leggings'].map((slot) => {
            const decorations = getDecorations(slot)

            return (
              <div key={slot} className="gear-set-detail-decoration-row">
                <strong>{slot}:</strong>

                {decorations.length > 0 ? (
                  <ul>
                    {decorations.map((decoration, index) => (
                      <li key={`${decoration.name}-${index}`}>
                        {decoration.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> None</span>
                )}
              </div>
            )
          })}
        </article>

        <article className="gear-set-detail-panel">
          <h2>Active Skills</h2>

          {activeSkills.length > 0 ? (
            <ul>
              {activeSkills.map((skill) => (
                <li key={`${skill.skillPoint}-${skill.name}`}>
                  {skill.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No active skills.</p>
          )}
        </article>

        <article className="gear-set-detail-panel">
          <h2>Skill Points</h2>

          {skillPoints.length > 0 ? (
            <ul>
              {skillPoints.map((skill) => (
                <li key={skill.name}>
                  {skill.name}: {skill.points > 0 ? `+${skill.points}` : skill.points}
                </li>
              ))}
            </ul>
          ) : (
            <p>No skill points.</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default GearSetDetail