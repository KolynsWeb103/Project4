import express from 'express'
import ArmorsController from '../controllers/armors.js'

const router = express.Router()

router.get('/', ArmorsController.getArmors)

router.get('/:armorId', ArmorsController.getArmorById)

export default router
