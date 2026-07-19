import express from 'express'
import cors from 'cors'
import floorRoutes from './routes/floor.routes'
import seatRoutes from './routes/seat.routes'
import seatStatusRoutes from './routes/seatStatus.routes'
import occupancyLogRoutes from './routes/occupancyLog.routes'
import studentRoutes from './routes/student.routes'
import facultyRoutes from './routes/faculty.routes'
import adminRoutes from './routes/admin.routes'
import { authMiddleware } from './middleware/auth.middleware'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get('/', (_req, res) => res.json({ status: 'VIT Library API running' }))

app.use('/api/students', studentRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/floors', authMiddleware, floorRoutes)
app.use('/api/seats', authMiddleware, seatRoutes)
app.use('/api/status', authMiddleware, seatStatusRoutes)
app.use('/api/logs', authMiddleware, occupancyLogRoutes)

export default app