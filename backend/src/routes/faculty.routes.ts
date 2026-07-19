import express from 'express'
import { loginFaculty } from '../controllers/faculty.controller'

const router = express.Router()

router.post('/login', loginFaculty)

export default router
