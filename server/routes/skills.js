import express from 'express'
import SkillsController from '../controllers/skills.js'

const router = express.Router()

router.get('/', SkillsController.getSkills)

router.get('/:skillId', SkillsController.getSkillById)

export default router
