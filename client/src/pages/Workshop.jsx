import { useState, useEffect } from 'react'
import WeaponsAPI from '../services/WeaponsAPI'
import ArmorsAPI from '../services/ArmorsAPI'
import SkillsAPI from '../services/SkillsAPI'
import DecorationsAPI from '../services/DecorationsAPI'
import RarityIcon from '../components/RarityIcon'

import decorationIcon from '../assets/icons/jewel.png'
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

import '../css/Workshop.css'

const Workshop = () => {
  const [saveMessage, setSaveMessage] = useState(null)
  const [selectedGearSlot, setSelectedGearSlot] = useState(null)
  const [selectedWeaponType, setSelectedWeaponType] = useState(null)
  const [hoveredGear, setHoveredGear] = useState(null)

  const [selectedGear, setSelectedGear] = useState({
    weapon: null,
    helmet: null,
    plate: null,
    gauntlets: null,
    waist: null,
    leggings: null
  })

  const [weapons, setWeapons] = useState([])
  const [armors, setArmors] = useState([])
  const [skills, setSkills] = useState([])
  const [decorations, setDecorations] = useState([])

  const [selectedDecorations, setSelectedDecorations] = useState({
    weapon: [],
    helmet: [],
    plate: [],
    gauntlets: [],
    waist: [],
    leggings: []
  })

  useEffect(() => {
    const fetchGear = async () => {
      try {
        const weaponsData = await WeaponsAPI.getAllWeapons()
        const armorsData = await ArmorsAPI.getAllArmors()
        const skillsData = await SkillsAPI.getAllSkills()
        const decorationsData = await DecorationsAPI.getAllDecorations()

        setWeapons(weaponsData)
        setArmors(armorsData)
        setSkills(skillsData)
        setDecorations(decorationsData)
      } catch (error) {
        console.error('Error fetching gear:', error)
      }
    }

    fetchGear()
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

  const weaponTypes = [
    {
      id: 'great-swd',
      label: 'Great Sword',
      icon: greatSwordIcon
    },
    {
      id: 'long-swd',
      label: 'Long Sword',
      icon: longSwordIcon
    },
    {
      id: 'sword',
      label: 'Sword & Shield',
      icon: swordShieldIcon
    },
    {
      id: 'dual-blades',
      label: 'Dual Blades',
      icon: dualBladesIcon
    },
    {
      id: 'hammer',
      label: 'Hammer',
      icon: hammerIcon
    },
    {
      id: 'hunting-horn',
      label: 'Hunting Horn',
      icon: huntingHornIcon
    },
    {
      id: 'lance',
      label: 'Lance',
      icon: lanceIcon
    },
    {
      id: 'gunlance',
      label: 'Gunlance',
      icon: gunlanceIcon
    },
    {
      id: 'bow',
      label: 'Bow',
      icon: bowIcon
    },
    {
      id: 'light-bowgun',
      label: 'Light Bowgun',
      icon: lightBowgunIcon
    },
    {
      id: 'heavy-bowgun',
      label: 'Heavy Bowgun',
      icon: heavyBowgunIcon
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

  const decorationColorsMap = {
    "blue": '#80C2FC',
    "sky": '#97E0EF',
    "gray": '#A0A0A0',
    "green": '#86BF8D',
    "orange": '#FF9661',
    "pink": '#EA9AA4',
    "red": '#FD6960',
    "purple": '#AFA0C5',
    "white": '#FFFFFF',
    "yellow": '#FFC762'
  };

  const formatSlots = (slots) => {
    const slotCount = Number(slots)

    if (slotCount === 1) return 'O--'
    if (slotCount === 2) return 'OO-'
    if (slotCount === 3) return 'OOO'

    return '---'
  }

  const getGearSlotLabel = (gearSlotId) => {
    return gearSlots.find(slot => slot.id === gearSlotId)?.label || 'Gear'
  }

  const getGearIcon = (gear, gearSlotId) => {
    if (!gear) {
      return armorIconsMap[gearSlotId] || weaponIcon
    }

    if (gearSlotId === 'weapon') {
      return weaponIconsMap[gear.type] || weaponIcon
    }

    return armorIconsMap[gearSlotId] || weaponIcon
  }

  const getArmorSlot = (armor) => {
    return armor.slot || armor.part || armor.type || armor.gearSlot
  }

  const armorBelongsToSlot = (armor, slot) => {
    const armorSlot = getArmorSlot(armor)

    const slotAliases = {
      helmet: ['helmet', 'head', 'helm'],
      plate: ['plate', 'chest', 'body', 'torso'],
      gauntlets: ['gauntlet', 'gauntlets', 'arms', 'gloves'],
      waist: ['waist', 'belt'],
      leggings: ['legging', 'leggings', 'legs', 'feet']
    }

    return slotAliases[slot]?.includes(armorSlot)
  }

  const getSelectedGearForSlot = (gearSlotId) => {
    return selectedGear[gearSlotId]
  }

  const handleGearSlotClick = (gearSlotId) => {
    setSelectedGearSlot(gearSlotId)
    setSelectedWeaponType(null)
    setHoveredGear(null)
  }

  const handleWeaponTypeClick = (weaponTypeId) => {
    setSelectedWeaponType(weaponTypeId)
    setHoveredGear(null)
  }

  const handleGearClick = (gear) => {
    setSelectedGear(prev => ({
      ...prev,
      [selectedGearSlot]: gear
    }))

    setSelectedWeaponType(null)
    setSelectedGearSlot(null)
    setHoveredGear(null)
  }

  const filteredGear = (() => {
    if (selectedGearSlot === 'weapon') {
      return weapons.filter(weapon => weapon.type === selectedWeaponType)
    }

    if (selectedGearSlot) {
      return armors.filter(armor => armorBelongsToSlot(armor, selectedGearSlot))
    }

    return []
  })()

  const shouldShowGearList =
    selectedGearSlot &&
    (selectedGearSlot !== 'weapon' || selectedWeaponType)

  const getGearSetCost = () => {
    const gearCost = Object.values(selectedGear).reduce((total, gear) => {
      if (!gear) return total

      return total + Number(gear.price ?? gear.cost ?? 0)
    }, 0)

    const decorationCost = Object.values(selectedDecorations)
      .flat()
      .reduce((total, decoration) => {
        return total + Number(decoration.price ?? decoration.cost ?? 0)
      }, 0)

    return gearCost + decorationCost
  }

  const getNumberValue = (object, ...fields) => {
    if (!object) return 0

    for (const field of fields) {
      if (object[field] !== undefined && object[field] !== null) {
        return Number(object[field]) || 0
      }
    }

    return 0
  }

  const getGearStats = () => {
    const stats = {
      attack: 0,
      defense: 0,
      affinity: 0,
      fireRes: 0,
      waterRes: 0,
      thunderRes: 0,
      iceRes: 0,
      dragonRes: 0
    }

    Object.entries(selectedGear).forEach(([slot, gear]) => {
      if (!gear) return

      if (slot === 'weapon') {
        stats.attack += getNumberValue(gear, 'attack')
        stats.affinity += getNumberValue(gear, 'affinity')
      }

      stats.defense += getNumberValue(gear, 'defense')

      stats.fireRes += getNumberValue(gear, 'fire_res', 'fireRes', 'fire')
      stats.waterRes += getNumberValue(gear, 'water_res', 'waterRes', 'water')
      stats.thunderRes += getNumberValue(gear, 'thunder_res', 'thunderRes', 'thunder')
      stats.iceRes += getNumberValue(gear, 'ice_res', 'iceRes', 'ice')
      stats.dragonRes += getNumberValue(gear, 'dragon_res', 'dragonRes', 'dragon')
    })

    return stats
  }

  const getSkillPointsFromGear = (gear) => {
    if (!gear) return []

    return gear.skill_points || gear['skill-points'] || []
  }

  const getSkillPointsFromDecoration = (decoration) => {
    if (!decoration) return []

    return decoration.skill_points || decoration['skill-points'] || []
  }

  const hasTorsoInc = (gear) => {
    const skillPoints = getSkillPointsFromGear(gear)

    return skillPoints.some(skill => skill.name === 'Torso Inc')
  }

  const getSkillPointsForSlot = (gearSlotId) => {
    const gear = selectedGear[gearSlotId]
    const gearSkillPoints = getSkillPointsFromGear(gear)

    const decorationSkillPoints = selectedDecorations[gearSlotId].flatMap(
      decoration => getSkillPointsFromDecoration(decoration)
    )

    return [...gearSkillPoints, ...decorationSkillPoints]
  }

  const getSkillPointTotals = () => {
    const totals = {}

    const plateSkillPoints = getSkillPointsForSlot('plate')

    Object.entries(selectedGear).forEach(([slot, gear]) => {
      if (!gear) return

      const skillPoints =
        slot !== 'plate' && hasTorsoInc(gear)
          ? plateSkillPoints
          : getSkillPointsForSlot(slot)

      skillPoints.forEach((skill) => {
        if (skill.name === 'Torso Inc') return

        totals[skill.name] = (totals[skill.name] || 0) + Number(skill.points)
      })
    })

    return Object.entries(totals)
      .map(([name, points]) => ({
        name,
        points
      }))
      .sort((a, b) => b.points - a.points)
  }

  const getSkillPointName = (skill) => {
    return (
      skill['skill-point'] ||
      skill.skill_point ||
      skill.skillPoint ||
      skill.skillpoint ||
      skill.skill_point_name ||
      ''
    )
  }

  const normalizeName = (name) => {
    return String(name || '').trim().toLowerCase()
  }

  const getActivatedSkills = () => {
    const skillPointTotals = getSkillPointTotals()
    const activatedSkills = []

    skillPointTotals.forEach((skillPointTotal) => {
      const matchingSkills = skills.filter(
        skill => normalizeName(getSkillPointName(skill)) === normalizeName(skillPointTotal.name)
      )

      const positiveSkills = matchingSkills
        .filter(skill => Number(skill.points) > 0)
        .sort((a, b) => Number(b.points) - Number(a.points))

      const negativeSkills = matchingSkills
        .filter(skill => Number(skill.points) < 0)
        .sort((a, b) => Number(a.points) - Number(b.points))

      const activatedPositiveSkill = positiveSkills.find(
        skill => Number(skillPointTotal.points) >= Number(skill.points)
      )

      const activatedNegativeSkill = negativeSkills.find(
        skill => Number(skillPointTotal.points) <= Number(skill.points)
      )

      if (activatedPositiveSkill) {
        activatedSkills.push({
          name: activatedPositiveSkill.name,
          skillPoint: getSkillPointName(activatedPositiveSkill) || skillPointTotal.name,
          requiredPoints: Number(activatedPositiveSkill.points),
          currentPoints: Number(skillPointTotal.points)
        })
      }

      if (activatedNegativeSkill) {
        activatedSkills.push({
          name: activatedNegativeSkill.name,
          skillPoint: getSkillPointName(activatedNegativeSkill) || skillPointTotal.name,
          requiredPoints: Number(activatedNegativeSkill.points),
          currentPoints: Number(skillPointTotal.points)
        })
      }
    })

    return activatedSkills.sort((a, b) =>
      String(a.skillPoint || '').localeCompare(String(b.skillPoint || ''))
    )
  }

  const getDecorationSlotsUsed = (gearSlotId) => {
    return selectedDecorations[gearSlotId].reduce((total, decoration) => {
      return total + Number(decoration.slots || 0)
    }, 0)
  }

  const getGearSlotCapacity = (gearSlotId) => {
    const gear = selectedGear[gearSlotId]

    if (!gear) return 0

    return Number(gear.slots || 0)
  }

  const canAddDecoration = (gearSlotId, decoration) => {
    const usedSlots = getDecorationSlotsUsed(gearSlotId)
    const maxSlots = getGearSlotCapacity(gearSlotId)
    const decorationSlots = Number(decoration.slots || 0)

    return usedSlots + decorationSlots <= maxSlots
  }

  const handleAddDecoration = (gearSlotId, decoration) => {
    if (!selectedGear[gearSlotId]) return

    if (!canAddDecoration(gearSlotId, decoration)) return

    setSelectedDecorations(prev => ({
      ...prev,
      [gearSlotId]: [...prev[gearSlotId], decoration]
    }))
  }

  const handleRemoveDecoration = (gearSlotId, decorationIndex) => {
    setSelectedDecorations(prev => ({
      ...prev,
      [gearSlotId]: prev[gearSlotId].filter((_, index) => index !== decorationIndex)
    }))
  }

  const getInvalidDecorationSlots = () => {
    return Object.keys(selectedGear).filter((gearSlotId) => {
      const gear = selectedGear[gearSlotId]

      if (!gear) return false

      const usedSlots = getDecorationSlotsUsed(gearSlotId)
      const maxSlots = getGearSlotCapacity(gearSlotId)

      return usedSlots > maxSlots
    })
  }

  const isGearSetValid = () => {
    return getInvalidDecorationSlots().length === 0
  }

  const getGearSetPayload = () => {
    return {
      gear: selectedGear,
      decorations: selectedDecorations,
      totalCost: getGearSetCost(),
      stats: getGearStats(),
      skillPoints: getSkillPointTotals(),
      activeSkills: getActivatedSkills()
    }
  }

  const handleSaveGearSet = () => {
    if (!selectedGear.weapon) {
      setSaveMessage({
        type: 'error',
        text: 'Cannot save gear set. Please select a weapon first.'
      })
      return
    }

    const invalidSlots = getInvalidDecorationSlots()

    if (invalidSlots.length > 0) {
      setSaveMessage({
        type: 'error',
        text: `Cannot save gear set. Decorations exceed slot limits on: ${invalidSlots
          .map(slot => getGearSlotLabel(slot))
          .join(', ')}.`
      })
      return
    }

    const gearSet = getGearSetPayload()

    console.log('Gear set is valid. Ready to save:', gearSet)

    setSaveMessage({
      type: 'success',
      text: 'Gear set saved successfully!'
    })
  }

  return (
    <main className="workshop-page">
      <section className="workshop-top-layout">
        <div className="gear-set-cost-label">
          💰 Gear Set Cost: {getGearSetCost()}z
        </div>

        <div className="gear-set-actions">
          <button
            className="save-gear-set-button"
            onClick={handleSaveGearSet}
          >
            Save Gear Set
          </button>

          {saveMessage && (
            <p className={`save-gear-set-message save-gear-set-message-${saveMessage.type}`}>
              {saveMessage.text}
            </p>
          )}
        </div>

        <section className="gear-slot-buttons">
          {gearSlots.map((gearSlot) => {
            const selectedItem = getSelectedGearForSlot(gearSlot.id)

            return (
              <div
                key={gearSlot.id}
                className="gear-slot-card"
              >
                <button
                  className="gear-slot-button"
                  onClick={() => handleGearSlotClick(gearSlot.id)}
                >
                  {selectedItem ? (
                    <RarityIcon
                      src={getGearIcon(selectedItem, gearSlot.id)}
                      color={rarityColorsMap[selectedItem.rare] || '#FFFFFF'}
                      size={52}
                      className="gear-icon"
                    />
                  ) : (
                    <img src={gearSlot.icon} alt="" className="gear-icon" />
                  )}

                  <span>{selectedItem ? selectedItem.name : gearSlot.label}</span>
                </button>

                <DecorationSlotPanel
                  gearSlotId={gearSlot.id}
                  selectedGear={selectedItem}
                  decorations={decorations}
                  selectedDecorations={selectedDecorations[gearSlot.id]}
                  decorationIcon={decorationIcon}
                  decorationColorsMap={decorationColorsMap}
                  usedSlots={getDecorationSlotsUsed(gearSlot.id)}
                  maxSlots={getGearSlotCapacity(gearSlot.id)}
                  canAddDecoration={canAddDecoration}
                  onAddDecoration={handleAddDecoration}
                  onRemoveDecoration={handleRemoveDecoration}
                />
              </div>
            )
          })}
        </section>

        <section className="skill-panels-layout">
          <GearStatsPanel stats={getGearStats()} />
          <SkillSummaryPanel skills={getSkillPointTotals()} />
          <ActivatedSkillsPanel activatedSkills={getActivatedSkills()} />
        </section>
      </section>

      {selectedGearSlot === 'weapon' && (
        <section className="weapon-type-panel">
          <h2>Choose Weapon Type</h2>

          <div className="weapon-type-buttons">
            {weaponTypes.map((weaponType) => (
              <button
                key={weaponType.id}
                className="weapon-type-button"
                onClick={() => handleWeaponTypeClick(weaponType.id)}
              >
                <img
                  src={weaponType.icon}
                  alt=""
                  className="weapon-type-icon"
                />

                <span>{weaponType.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {shouldShowGearList && (
        <section className="weapon-list-panel">
          <h2>Choose {getGearSlotLabel(selectedGearSlot)}</h2>
          <p className="subtitle">
            Only rarity 7 & above available due to resource limitation
          </p>

          <div className="weapon-list-layout">
            <div className="weapon-list-buttons">
              {filteredGear.map((gear) => (
                <button
                  key={gear.id}
                  className="weapon-list-button"
                  onMouseEnter={() => setHoveredGear(gear)}
                  onMouseLeave={() => setHoveredGear(null)}
                  onFocus={() => setHoveredGear(gear)}
                  onBlur={() => setHoveredGear(null)}
                  onClick={() => handleGearClick(gear)}
                >
                  <RarityIcon
                    src={getGearIcon(gear, selectedGearSlot)}
                    color={rarityColorsMap[gear.rare] || '#FFFFFF'}
                    size={46}
                    className="weapon-list-icon"
                  />

                  <span>{gear.name}</span>
                </button>
              ))}
            </div>

            <aside className="weapon-preview-panel">
              <GearPreview
                gear={hoveredGear}
                gearSlot={selectedGearSlot}
                formatSlots={formatSlots}
                getGearIcon={getGearIcon}
                rarityColorsMap={rarityColorsMap}
              />
            </aside>
          </div>
        </section>
      )}
    </main>
  )
}

const GearStatsPanel = ({ stats }) => {
  return (
    <aside className="gear-stats-panel">
      <h2>Gear Stats</h2>

      <div className="gear-stats-list">
        <div className="gear-stats-row">
          <span>Attack</span>
          <strong>{stats.attack}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Defense</span>
          <strong>{stats.defense}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Affinity</span>
          <strong>{stats.affinity}%</strong>
        </div>

        <div className="gear-stats-row">
          <span>Fire Res</span>
          <strong>{stats.fireRes}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Water Res</span>
          <strong>{stats.waterRes}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Thunder Res</span>
          <strong>{stats.thunderRes}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Ice Res</span>
          <strong>{stats.iceRes}</strong>
        </div>

        <div className="gear-stats-row">
          <span>Dragon Res</span>
          <strong>{stats.dragonRes}</strong>
        </div>
      </div>
    </aside>
  )
}

const SkillSummaryPanel = ({ skills }) => {
  return (
    <aside className="skill-summary-panel">
      <h2>Skill Points</h2>

      {skills.length > 0 ? (
        <div className="skill-summary-list">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-summary-row"
            >
              <span>{skill.name}</span>

              <strong>
                {skill.points > 0 ? `+${skill.points}` : skill.points}
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <p className="skill-summary-empty">
          No skill points yet.
        </p>
      )}
    </aside>
  )
}

const ActivatedSkillsPanel = ({ activatedSkills }) => {
  return (
    <aside className="activated-skills-panel">
      <h2>Active Skills</h2>

      {activatedSkills.length > 0 ? (
        <div className="activated-skills-list">
          {activatedSkills.map((skill) => (
            <div
              key={`${skill.skillPoint}-${skill.name}`}
              className="activated-skill-row"
            >
              <span>{skill.name}</span>

              <small>
                {skill.skillPoint}: {skill.currentPoints}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p className="activated-skills-empty">
          No active skills yet.
        </p>
      )}
    </aside>
  )
}

const GearPreview = ({
  gear,
  gearSlot,
  formatSlots,
  getGearIcon,
  rarityColorsMap
}) => {
  if (!gear) {
    return (
      <p className="weapon-preview-empty">
        Hover over gear to view details.
      </p>
    )
  }

  const skillPoints = gear.skill_points || gear['skill-points'] || []
  const elements = gear.elements || []

  const getValue = (...fields) => {
    for (const field of fields) {
      if (gear[field] !== undefined && gear[field] !== null) {
        return gear[field]
      }
    }

    return 0
  }

  return (
    <>
      <div className="weapon-preview-header">
        <RarityIcon
          src={getGearIcon(gear, gearSlot)}
          color={rarityColorsMap[gear.rare] || '#FFFFFF'}
          size={60}
          className="weapon-preview-icon"
        />

        <div>
          <h3>{gear.name}</h3>
          <p>Rare {gear.rare}</p>
        </div>
      </div>

      <div className="weapon-preview-stats">
        {gearSlot === 'weapon' ? (
          <>
            <p><strong>Attack:</strong> {gear.attack}</p>
            <p><strong>Defense:</strong> {gear.defense ?? 0}</p>
            <p><strong>Affinity:</strong> {gear.affinity ?? 0}%</p>
          </>
        ) : (
          <>
            <p><strong>Defense:</strong> {gear.defense ?? 0}</p>
            <p><strong>Fire Res:</strong> {getValue('fire_res', 'fireRes', 'fire')}</p>
            <p><strong>Water Res:</strong> {getValue('water_res', 'waterRes', 'water')}</p>
            <p><strong>Thunder Res:</strong> {getValue('thunder_res', 'thunderRes', 'thunder')}</p>
            <p><strong>Ice Res:</strong> {getValue('ice_res', 'iceRes', 'ice')}</p>
            <p><strong>Dragon Res:</strong> {getValue('dragon_res', 'dragonRes', 'dragon')}</p>
          </>
        )}

        <p><strong>Slots:</strong> {formatSlots(gear.slots)}</p>
        <p><strong>Description:</strong> {gear.description ?? ''}</p>

        {gearSlot === 'weapon' && (
          <div className="weapon-preview-elements">
            <strong>Elements:</strong>

            {elements.length > 0 ? (
              <ul>
                {elements.map((element, index) => (
                  <li key={`${element.name}-${index}`}>
                    {element.name}: {element.attack}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li className="weapon-preview-none">None</li>
              </ul>
            )}
          </div>
        )}

        {skillPoints.length > 0 && (
          <div className="weapon-preview-elements">
            <strong>Skills:</strong>

            <ul>
              {skillPoints.map((skill, index) => (
                <li key={`${skill.name}-${index}`}>
                  {skill.name}: {skill.points}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

const DecorationSlotPanel = ({
  gearSlotId,
  selectedGear,
  decorations,
  selectedDecorations,
  decorationIcon,
  decorationColorsMap,
  usedSlots,
  maxSlots,
  canAddDecoration,
  onAddDecoration,
  onRemoveDecoration
}) => {
  if (!selectedGear) {
    return (
      <div className="decoration-slot-panel decoration-slot-panel-disabled">
        <p>Select gear first</p>
      </div>
    )
  }

  return (
    <div className="decoration-slot-panel">
      <div className="decoration-slot-header">
        <strong>Decorations</strong>
        <span>{usedSlots}/{maxSlots}</span>
      </div>

      <div className="equipped-decorations">
        {selectedDecorations.length > 0 ? (
          selectedDecorations.map((decoration, index) => (
            <button
              key={`${decoration.name}-${index}`}
              className="equipped-decoration-button"
              onClick={() => onRemoveDecoration(gearSlotId, index)}
              title="Remove decoration"
            >
              <RarityIcon
                src={decorationIcon}
                color={decorationColorsMap[decoration.color] || '#FFFFFF'}
                size={22}
                className="decoration-icon"
              />
              <span>{decoration.name}</span>
              <small>-</small>
            </button>
          ))
        ) : (
          <p className="decoration-empty">No decorations</p>
        )}
      </div>

      <details className="decoration-picker">
        <summary>Add Decoration</summary>

        <div className="decoration-picker-list">
          {decorations.map((decoration) => {
            const canAdd = canAddDecoration(gearSlotId, decoration)

            return (
              <button
                key={decoration.id || decoration.name}
                className="decoration-picker-button"
                disabled={!canAdd}
                onClick={() => onAddDecoration(gearSlotId, decoration)}
              >
                <RarityIcon
                  src={decorationIcon}
                  color={decorationColorsMap[decoration.color] || '#FFFFFF'}
                  size={22}
                  className="decoration-icon"
                />

                <span>{decoration.name}</span>

                <small>
                  {decoration.slots} slot{Number(decoration.slots) === 1 ? '' : 's'}
                </small>
              </button>
            )
          })}
        </div>
      </details>
    </div>
  )
}

export default Workshop