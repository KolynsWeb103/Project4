import express from 'express'
import DecorationsController from '../controllers/decorations.js'

const router = express.Router()

router.get('/', DecorationsController.getDecorations)

router.get('/:decorationId', DecorationsController.getDecorationById)

export default router
