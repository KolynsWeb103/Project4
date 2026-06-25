import { useState, useEffect } from 'react'
import WeaponsAPI from '../services/WeaponsAPI'
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

import '../css/Workshop.css'

const Workshop = () => {
  const [selectedGearSlot, setSelectedGearSlot] = useState(null)
  const [selectedWeaponType, setSelectedWeaponType] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)
  const [hoveredWeapon, setHoveredWeapon] = useState(null)

  const [weapons, setWeapons] = useState([])

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const data = await WeaponsAPI.getAllWeapons()
        setWeapons(data)
      } catch (error) {
        console.error('Error fetching weapons:', error)
      }
    }

    fetchWeapons()
  }, [])

  const filteredWeapons = weapons.filter(
    weapon => weapon.type === selectedWeaponType
  )

  const handleGearSlotClick = (gearSlotId) => {
    setSelectedGearSlot(gearSlotId)
    setSelectedWeaponType(null)
  }

  const handleWeaponTypeClick = (weaponTypeId) => {
    setSelectedWeaponType(weaponTypeId)
    setSelectedWeapon(null)
  }

  const weaponIconsMap = {
    "great-swd": greatSwordIcon,
    "long-swd": longSwordIcon,
    "sword": swordShieldIcon,
    "dual-blades": dualBladesIcon,
    "hammer": hammerIcon,
    "hunting-horn": huntingHornIcon,
    "lance": lanceIcon,
    "gunlance": gunlanceIcon,
    "bow": bowIcon,
    "light-bowgun": lightBowgunIcon,
    "heavy-bowgun": heavyBowgunIcon
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

  const formatSlots = (slots) => {
    const slotCount = Number(slots)

    if (slotCount === 1) return 'O--'
    if (slotCount === 2) return 'OO-'
    if (slotCount === 3) return 'OOO'
    return '---'
  }

  return (
    <main className="workshop-page">
      <section className="gear-slot-buttons">
        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('weapon')}
        >
          {selectedWeapon ? (
            <RarityIcon
              src={weaponIconsMap[selectedWeapon.type] || weaponIcon}
              color={rarityColorsMap[selectedWeapon.rare] || '#FFFFFF'}
              size={52}
              className="gear-icon"
            />
          ) : (
            <img src={weaponIcon} alt="" className="gear-icon" />
          )}

          <span>{selectedWeapon ? selectedWeapon.name : 'Weapon'}</span>
        </button>

        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('helmet')}
        >
          <img src={helmetIcon} alt="" className="gear-icon" />
          <span>Helmet</span>
        </button>

        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('plate')}
        >
          <img src={plateIcon} alt="" className="gear-icon" />
          <span>Plate</span>
        </button>

        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('gauntlets')}
        >
          <img src={gauntletsIcon} alt="" className="gear-icon" />
          <span>Gauntlets</span>
        </button>

        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('waist')}
        >
          <img src={waistIcon} alt="" className="gear-icon" />
          <span>Waist</span>
        </button>

        <button
          className="gear-slot-button"
          onClick={() => handleGearSlotClick('leggings')}
        >
          <img src={leggingsIcon} alt="" className="gear-icon" />
          <span>Leggings</span>
        </button>
      </section>

      {selectedGearSlot === 'weapon' && (
        <section className="weapon-type-panel">
          <h2>Choose Weapon Type</h2>

          <div className="weapon-type-buttons">
            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('great-swd')}
            >
              <img src={greatSwordIcon} alt="" className="weapon-type-icon" />
              <span>Great Sword</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('long-swd')}
            >
              <img src={longSwordIcon} alt="" className="weapon-type-icon" />
              <span>Long Sword</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('sword')}
            >
              <img src={swordShieldIcon} alt="" className="weapon-type-icon" />
              <span>Sword & Shield</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('dual-blades')}
            >
              <img src={dualBladesIcon} alt="" className="weapon-type-icon" />
              <span>Dual Blades</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('hammer')}
            >
              <img src={hammerIcon} alt="" className="weapon-type-icon" />
              <span>Hammer</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('hunting-horn')}
            >
              <img src={huntingHornIcon} alt="" className="weapon-type-icon" />
              <span>Hunting Horn</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('lance')}
            >
              <img src={lanceIcon} alt="" className="weapon-type-icon" />
              <span>Lance</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('gunlance')}
            >
              <img src={gunlanceIcon} alt="" className="weapon-type-icon" />
              <span>Gunlance</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('bow')}
            >
              <img src={bowIcon} alt="" className="weapon-type-icon" />
              <span>Bow</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('light-bowgun')}
            >
              <img src={lightBowgunIcon} alt="" className="weapon-type-icon" />
              <span>Light Bowgun</span>
            </button>

            <button
              className="weapon-type-button"
              onClick={() => handleWeaponTypeClick('heavy-bowgun')}
            >
              <img src={heavyBowgunIcon} alt="" className="weapon-type-icon" />
              <span>Heavy Bowgun</span>
            </button>
          </div>
        </section>
      )}

      {selectedGearSlot === 'weapon' && selectedWeaponType && (
        <section className="weapon-list-panel">
          <h2>Choose Weapon</h2>

          <div className="weapon-list-layout">
            <div className="weapon-list-buttons">
              {filteredWeapons.map((weapon) => (
                <button
                  key={weapon.id}
                  className="weapon-list-button"
                  onMouseEnter={() => setHoveredWeapon(weapon)}
                  onMouseLeave={() => setHoveredWeapon(null)}
                  onFocus={() => setHoveredWeapon(weapon)}
                  onBlur={() => setHoveredWeapon(null)}
                  onClick={() => {
                    setSelectedWeapon(weapon)
                    setSelectedWeaponType(null)
                    setHoveredWeapon(null)
                  }}
                >
                  <RarityIcon
                    src={weaponIconsMap[weapon.type] || weaponIcon}
                    color={rarityColorsMap[weapon.rare] || '#FFFFFF'}
                    size={46}
                    className="weapon-list-icon"
                  />

                  <span>{weapon.name}</span>
                </button>
              ))}
            </div>

            <aside className="weapon-preview-panel">
              {hoveredWeapon ? (
                <>
                  <div className="weapon-preview-header">
                    <RarityIcon
                      src={weaponIconsMap[hoveredWeapon.type] || weaponIcon}
                      color={rarityColorsMap[hoveredWeapon.rare] || '#FFFFFF'}
                      size={60}
                      className="weapon-preview-icon"
                    />

                    <div>
                      <h3>{hoveredWeapon.name}</h3>
                      <p>Rare {hoveredWeapon.rare}</p>
                    </div>
                  </div>

                  <div className="weapon-preview-stats">
                    <p><strong>Attack:</strong> {hoveredWeapon.attack}</p>
                    <p><strong>Defense:</strong> {hoveredWeapon.defense ?? 0}</p>
                    <p><strong>Affinity:</strong> {hoveredWeapon.affinity ?? 0}%</p>
                    <p><strong>Slots:</strong> {formatSlots(hoveredWeapon.slots)}</p>
                    <p><strong>Description:</strong> {hoveredWeapon.description ?? ""}</p>

                    <div className="weapon-preview-elements">
                      <strong>Elements:</strong>

                      {hoveredWeapon.elements && hoveredWeapon.elements.length > 0 ? (
                        <ul>
                          {hoveredWeapon.elements.map((element, index) => (
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
                  </div>
                </>
              ) : (
                <p className="weapon-preview-empty">
                  Hover over a weapon to view details.
                </p>
              )}
            </aside>
          </div>
        </section>
      )}
    </main>
  )
}

export default Workshop
