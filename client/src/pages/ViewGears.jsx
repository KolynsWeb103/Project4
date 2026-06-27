import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GearSetsAPI from '../services/GearSetsAPI'
import RarityIcon from '../components/RarityIcon'

import weaponIcon from '../assets/icons/great-sword.png'
import helmetIcon from '../assets/icons/helmet.png'
import plateIcon from '../assets/icons/plate.png'
import gauntletsIcon from '../assets/icons/gauntlets.png'
import waistIcon from '../assets/icons/waist.png'
import leggingsIcon from '../assets/icons/leggings.png'

import greatSwordIcon from '../assets/icons/great-sword.png'
import longSwordIcon from '../assets/icons/long-sword.png'
import swordShieldIcon from '../assets/icons/sword-and-shield.png'
import dualBladesIcon from '../assets/icons/dual-blades.png'
import hammerIcon from '../assets/icons/hammer.png'
import huntingHornIcon from '../assets/icons/hunting-horn.png'
import lanceIcon from '../assets/icons/lance.png'
import gunlanceIcon from '../assets/icons/gunlance.png'
import bowIcon from '../assets/icons/bow.png'
import lightBowgunIcon from '../assets/icons/light-bowgun.png'
import heavyBowgunIcon from '../assets/icons/heavy-bowgun.png'

import '../css/ViewGears.css'

const ViewGears = () => {
  const [gearSets, setGearSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchGearSets()
  }, [])

  const gearSlots = [
    {
      id: 'weapon',
      label: 'Weapon',
      icon: weaponIcon
    },
    {
      id: 'helmet',
      label: 'Helmet',
      icon: helmetIcon
    },
    {
      id: 'plate',
      label: 'Plate',
      icon: plateIcon
    },
    {
      id: 'gauntlets',
      label: 'Gauntlets',
      icon: gauntletsIcon
    },
    {
      id: 'waist',
      label: 'Waist',
      icon: waistIcon
    },
    {
      id: 'leggings',
      label: 'Leggings',
      icon: leggingsIcon
    }
  ]

  const weaponIconsMap = {
    'great-swd': greatSwordIcon,
    'long-swd': longSwordIcon,
    sword: swordShieldIcon,
    'dual-blades': dualBladesIcon,
    hammer: hammerIcon,
    'hunting-horn': huntingHornIcon,
    lance: lanceIcon,
    gunlance: gunlanceIcon,
    bow: bowIcon,
    'light-bowgun': lightBowgunIcon,
    'heavy-bowgun': heavyBowgunIcon
  }

  const armorIconsMap = {
    helmet: helmetIcon,
    plate: plateIcon,
    gauntlets: gauntletsIcon,
    waist: waistIcon,
    leggings: leggingsIcon
  }

  const rarityColorsMap = {
    1: '#FFFFFF',
    2: '#FFFFFF',
    3: '#FFFFFF',
    4: '#52F152',
    5: '#FD9DC8',
    6: '#83C3FC',
    7: '#FF9661',
    8: '#FD6960',
    9: '#FFC762',
    10: '#BB84FB'
  }

  const getGearIcon = (gear, slot) => {
    if (!gear) {
      return armorIconsMap[slot] || weaponIcon
    }

    if (slot === 'weapon') {
      return weaponIconsMap[gear.type] || weaponIcon
    }

    return armorIconsMap[slot] || weaponIcon
  }

  const fetchGearSets = async () => {
    try {
      setLoading(true)

      const data = await GearSetsAPI.getAllGearSets()

      setGearSets(data)
      setMessage('')
    } catch (error) {
      console.error('Error fetching gear sets:', error)
      setMessage('Failed to load gear sets.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGearSet = async (gearSetId) => {
    try {
      await GearSetsAPI.deleteGearSet(gearSetId)

      setGearSets(prev => prev.filter(gearSet => gearSet.id !== gearSetId))
      setMessage('Gear set deleted successfully.')
    } catch (error) {
      console.error('Error deleting gear set:', error)
      setMessage('Failed to delete gear set.')
    }
  }

  const getDecorationCount = (gearSet, slot) => {
    return gearSet.decorations?.[slot]?.length || 0
  }

  const getActiveSkills = (gearSet) => {
    return gearSet.active_skills || gearSet.activeSkills || []
  }

  const getSkillPoints = (gearSet) => {
    return gearSet.skill_points || gearSet.skillPoints || []
  }

  if (loading) {
    return (
      <main className="view-gears-page">
        <h1>View Gear Sets</h1>
        <p>Loading gear sets...</p>
      </main>
    )
  }

  return (
    <main className="view-gears-page">
      <h1>View Gear Sets</h1>

      {message && (
        <p className="view-gears-message">
          {message}
        </p>
      )}

      {gearSets.length === 0 ? (
        <p className="view-gears-empty">
          No saved gear sets yet.
        </p>
      ) : (
        <section className="gear-set-list">
          {gearSets.map((gearSet) => {
            const activeSkills = getActiveSkills(gearSet)
            const skillPoints = getSkillPoints(gearSet)

            return (
              <article
                key={gearSet.id}
                className="gear-set-card"
              >
                <div className="gear-set-card-header">
                  <div>
                    <h2>{gearSet.name}</h2>
                    <p>Cost (excluding weapon): {gearSet.total_cost ?? gearSet.totalCost ?? 0}z</p>
                  </div>

                  <div className="gear-set-card-actions">
                    <Link
                      to={`/gears/${gearSet.id}`}
                      className="gear-set-card-button view-gear-set-button"
                    >
                      View / Edit
                    </Link>

                    <button
                      className="gear-set-card-button delete-gear-set-button"
                      onClick={() => handleDeleteGearSet(gearSet.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="gear-set-loadout">
                  {gearSlots.map((slot) => {
                    const gear = gearSet.gear?.[slot.id]

                    return (
                      <div
                        key={slot.id}
                        className="gear-set-loadout-slot"
                      >
                        <div className="gear-set-loadout-icon">
                          {gear ? (
                            <RarityIcon
                              src={getGearIcon(gear, slot.id)}
                              color={rarityColorsMap[gear.rare] || '#FFFFFF'}
                              size={46}
                              className="saved-gear-icon"
                            />
                          ) : (
                            <img
                              src={slot.icon}
                              alt=""
                              className="saved-gear-icon"
                            />
                          )}
                        </div>

                        <span className="gear-set-loadout-label">
                          {slot.label}
                        </span>

                        <strong className="gear-set-loadout-name">
                          {gear?.name || 'None'}
                        </strong>
                      </div>
                    )
                  })}
                </div>

                <div className="gear-set-grid">
                  <div className="gear-set-section">
                    <h3>Decorations</h3>

                    <p><strong>Weapon:</strong> {getDecorationCount(gearSet, 'weapon')}</p>
                    <p><strong>Helmet:</strong> {getDecorationCount(gearSet, 'helmet')}</p>
                    <p><strong>Plate:</strong> {getDecorationCount(gearSet, 'plate')}</p>
                    <p><strong>Gauntlets:</strong> {getDecorationCount(gearSet, 'gauntlets')}</p>
                    <p><strong>Waist:</strong> {getDecorationCount(gearSet, 'waist')}</p>
                    <p><strong>Leggings:</strong> {getDecorationCount(gearSet, 'leggings')}</p>
                  </div>

                  <div className="gear-set-section">
                    <h3>Active Skills</h3>

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
                  </div>

                  <div className="gear-set-section">
                    <h3>Skill Points</h3>

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
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </main>
  )
}

export default ViewGears