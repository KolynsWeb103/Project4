import weaponIcon from '../assets/icons/great-sword.png'
import helmetIcon from '../assets/icons/helmet.png'
import plateIcon from '../assets/icons/plate.png'
import gauntletsIcon from '../assets/icons/gauntlets.png'
import waistIcon from '../assets/icons/waist.png'
import leggingsIcon from '../assets/icons/leggings.png'

import '../css/Workshop.css'

const Workshop = () => {
  return (
    <main className="workshop-page">
      <section className="gear-slot-buttons">
        <button className="gear-slot-button">
          <img src={weaponIcon} alt="" className="gear-icon" />
          <span>Weapon</span>
        </button>

        <button className="gear-slot-button">
          <img src={helmetIcon} alt="" className="gear-icon" />
          <span>Helmet</span>
        </button>

        <button className="gear-slot-button">
          <img src={plateIcon} alt="" className="gear-icon" />
          <span>Plate</span>
        </button>

        <button className="gear-slot-button">
          <img src={gauntletsIcon} alt="" className="gear-icon" />
          <span>Gauntlets</span>
        </button>

        <button className="gear-slot-button">
          <img src={waistIcon} alt="" className="gear-icon" />
          <span>Waist</span>
        </button>

        <button className="gear-slot-button">
          <img src={leggingsIcon} alt="" className="gear-icon" />
          <span>Leggings</span>
        </button>
      </section>
    </main>
  )
}

export default Workshop
