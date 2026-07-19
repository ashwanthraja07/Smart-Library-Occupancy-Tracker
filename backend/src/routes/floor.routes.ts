import express from 'express'
import { getAllFloors, getFloorById, createFloor } from '../controllers/floor.controller'

const router = express.Router()

router.get('/', getAllFloors)
router.get('/:id', getFloorById)
router.post('/', createFloor)

export default router