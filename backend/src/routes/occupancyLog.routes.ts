import express from 'express'
import { getAllLogs, createLog, getPeakHours } from '../controllers/occupancyLog.controller'

const router = express.Router()

router.get('/peak-hours', getPeakHours)
router.get('/', getAllLogs)
router.post('/', createLog)

export default router