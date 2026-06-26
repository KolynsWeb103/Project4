import express from 'express'
import GearSetsController from '../controllers/gearSets.js'

const router = express.Router()

router.get('/', GearSetsController.getGearSets)
router.get('/:gearSetId', GearSetsController.getGearSetById)
router.post('/', GearSetsController.createGearSet)
router.patch('/:gearSetId', GearSetsController.updateGearSet)
router.delete('/:gearSetId', GearSetsController.deleteGearSet)

export default router