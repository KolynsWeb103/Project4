import express from 'express'
import WeaponsController from '../controllers/weapons.js'

const router = express.Router()

router.get('/', WeaponsController.getWeapons)

router.get('/:weaponId', WeaponsController.getWeaponById)

export default router
