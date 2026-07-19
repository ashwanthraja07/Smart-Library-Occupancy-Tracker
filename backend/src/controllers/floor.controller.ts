import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllFloors = async (req: Request, res: Response) => {
  try {
    const floors = await prisma.floor.findMany({
      include: { seats: { include: { seat_status: true } } }
    })
    const result = floors.map(floor => ({
      floor_id: floor.floor_id,
      floor_name: floor.floor_name,
      total_seats: floor.total_seats,
      occupied_seats: floor.seats.filter(s => s.seat_status?.is_occupied).length,
      free_seats: floor.seats.filter(s => !s.seat_status?.is_occupied).length,
      occupancy_percentage: floor.total_seats > 0
        ? Math.round((floor.seats.filter(s => s.seat_status?.is_occupied).length / floor.total_seats) * 100)
        : 0
    }))
    return res.json(result)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch floors' })
  }
}

export const getFloorById = async (req: Request, res: Response): Promise<void> => {
  try {
    const floor = await prisma.floor.findUnique({
      where: { floor_id: Number(req.params.id) },
      include: { seats: { include: { seat_status: true } } }
    })
    if (!floor) { res.status(404).json({ message: 'Floor not found' }); return }
    const occupied = floor.seats.filter(s => s.seat_status?.is_occupied).length
    res.status(200).json({
      floor_id: floor.floor_id,
      floor_name: floor.floor_name,
      total_seats: floor.total_seats,
      floor_image_url: floor.floor_image_url,
      occupied_seats: occupied,
      free_seats: floor.total_seats - occupied,
      occupancy_percentage: floor.total_seats > 0 ? Math.round((occupied / floor.total_seats) * 100) : 0
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch floor' })
  }
}

export const createFloor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { floor_name, total_seats, floor_image_url } = req.body
    const floor = await prisma.floor.create({ data: { floor_name, total_seats, floor_image_url } })
    res.status(201).json(floor)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create floor' })
  }
}