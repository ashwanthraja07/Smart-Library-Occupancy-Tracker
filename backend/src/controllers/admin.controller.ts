import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { admin_id, password } = req.body
    if (!admin_id || !password) { res.status(400).json({ error: 'Admin ID and password are required' }); return }
    const admin = await prisma.admin.findUnique({ where: { admin_id } })
    if (!admin) { res.status(401).json({ error: 'Invalid Admin ID or password' }); return }
    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid) { res.status(401).json({ error: 'Invalid Admin ID or password' }); return }
    const token = jwt.sign(
      { admin_id: admin.admin_id, role: 'admin' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )
    await prisma.admin.update({ where: { admin_id: admin.admin_id }, data: { last_login: new Date() } })
    res.status(200).json({ token, name: admin.name, admin_id: admin.admin_id })
  } catch (error) {
    res.status(500).json({ message: 'Login failed' })
  }
}
