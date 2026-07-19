import express from 'express'
import { loginStudent, getAllStudents, getStudentByRegNumber, createStudent, deleteStudent } from '../controllers/student.controller'

const router = express.Router()

router.post('/login', loginStudent)
router.get('/', getAllStudents)
router.get('/:regNumber', getStudentByRegNumber)
router.post('/', createStudent)
router.delete('/:regNumber', deleteStudent)

export default router