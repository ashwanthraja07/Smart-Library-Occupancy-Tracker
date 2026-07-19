import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await prisma.occupancyLog.findMany({
      include: { seat: true },
      orderBy: { timestamp: 'desc' },
      take: 100
    })
    res.status(200).json(logs)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs' })
  }
}

export const createLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { seat_id, status } = req.body
    const log = await prisma.occupancyLog.create({ data: { seat_id, status, timestamp: new Date() } })
    res.status(201).json(log)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create log' })
  }
}

export const getPeakHours = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.occupancyLog.findMany({
      where: {
        timestamp: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      },
      include: {
        seat: {
          include: { floor: true }
        }
      }
    })

    const floorNames = [...new Set(logs.map(l => l.seat.floor.floor_name))]

    const hourly = Array.from({ length: 24 }, (_, hour) => {
      const entry: any = { hour: `${hour}:00` }
      
      let totalOccupied = 0
      floorNames.forEach(floorName => {
        const count = logs.filter(l => 
          new Date(l.timestamp).getHours() === hour && 
          l.status === 'occupied' &&
          l.seat.floor.floor_name === floorName
        ).length
        entry[floorName] = count
        totalOccupied += count
      })
      
      entry.Occupied = totalOccupied
      return entry
    })
    
    return res.json(hourly)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch peak hours' })
  }
}