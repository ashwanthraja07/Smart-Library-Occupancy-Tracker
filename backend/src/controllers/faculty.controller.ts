import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const loginFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { faculty_id, password } = req.body
    if (!faculty_id || !password) { res.status(400).json({ error: 'Faculty ID and password are required' }); return }
    const faculty = await prisma.faculty.findUnique({ where: { faculty_id } })
    if (!faculty) { res.status(401).json({ error: 'Invalid Faculty ID or password' }); return }
    const isValid = await bcrypt.compare(password, faculty.password)
    if (!isValid) { res.status(401).json({ error: 'Invalid Faculty ID or password' }); return }
    const token = jwt.sign(
      { faculty_id: faculty.faculty_id, role: 'faculty' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )
    await prisma.faculty.update({ where: { faculty_id: faculty.faculty_id }, data: { last_login: new Date() } })
    res.status(200).json({ token, name: faculty.name, faculty_id: faculty.faculty_id })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
}
