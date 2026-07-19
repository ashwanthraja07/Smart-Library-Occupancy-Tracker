import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await prisma.student.findMany()
    res.status(200).json(students)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students' })
  }
}

export const getStudentByRegNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const regNumber = req.params.regNumber as string
    const student = await prisma.student.findUnique({ where: { reg_number: regNumber } })
    if (!student) { res.status(404).json({ message: 'Student not found' }); return }
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student' })
  }
}

export const loginStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reg_number, password } = req.body
    if (!reg_number) { res.status(400).json({ error: 'Registration number required' }); return }
    const student = await prisma.student.findUnique({ where: { reg_number } })
    if (!student) { res.status(401).json({ error: 'Student not found' }); return }
    if (password && student.password) {
      const isValid = await bcrypt.compare(password, student.password)
      if (!isValid) { res.status(401).json({ error: 'Invalid password' }); return }
    }
    const token = jwt.sign(
      { reg_number: student.reg_number, role: 'student' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )
    await prisma.student.update({ where: { reg_number }, data: { last_login: new Date() } })
    res.json({ token, name: student.name, reg_number: student.reg_number })
  } catch (err) {
    res.status(500).json({ error: 'Login failed' })
  }
}

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reg_number, name, email, password } = req.body
    const hashed = password ? await bcrypt.hash(password, 10) : await bcrypt.hash('password123', 10)
    const student = await prisma.student.create({ data: { reg_number, name, email, password: hashed } })
    res.status(201).json(student)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student' })
  }
}

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.student.delete({ where: { reg_number: req.params.regNumber as string } })
    res.status(200).json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student' })
  }
}