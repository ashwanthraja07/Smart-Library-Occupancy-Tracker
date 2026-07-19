import express from 'express'
import { getAllSeats, getSeatsByFloor, createSeat } from '../controllers/seat.controller'

const router = express.Router()

router.get('/', getAllSeats)
router.get('/floor/:floorId', getSeatsByFloor)
router.post('/', createSeat)

export default router