import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllSeats = async (req: Request, res: Response) => {
  try {
    const floor_id = req.query.floor_id ? Number(req.query.floor_id) : undefined
    const seats = await prisma.seat.findMany({
      where: floor_id ? { floor_id } : undefined,
      include: { seat_status: true },
      orderBy: [{ row_label: 'asc' }, { seat_number: 'asc' }]
    })
    const result = seats.map(seat => ({
      seat_id: seat.seat_id,
      floor_id: seat.floor_id,
      row_label: seat.row_label,
      seat_number: seat.seat_number,
      zone_type: seat.zone_type,
      has_outlet: seat.has_outlet,
      near_ac: seat.near_ac,
      is_window_seat: seat.is_window_seat,
      comfort_score: seat.comfort_score,
      is_occupied: seat.seat_status?.is_occupied ?? false,
      last_updated: seat.seat_status?.last_updated ?? null
    }))
    return res.json(result)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch seats' })
  }
}

export const getSeatsByFloor = async (req: Request, res: Response): Promise<void> => {
  try {
    const floorId = Number(req.params.floorId)
    const seats = await prisma.seat.findMany({
      where: { floor_id: floorId },
      include: { seat_status: true },
      orderBy: [{ row_label: 'asc' }, { seat_number: 'asc' }]
    })
    const result = seats.map(s => ({
      seat_id: s.seat_id,
      floor_id: s.floor_id,
      row_label: s.row_label,
      seat_number: s.seat_number,
      zone_type: s.zone_type,
      has_outlet: s.has_outlet,
      near_ac: s.near_ac,
      is_window_seat: s.is_window_seat,
      comfort_score: s.comfort_score,
      is_occupied: s.seat_status?.is_occupied ?? false,
      last_updated: s.seat_status?.last_updated ?? null
    }))
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch seats' })
  }
}

export const createSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { floor_id, row_label, seat_number, zone_type, has_outlet, near_ac, is_window_seat, comfort_score } = req.body
    const seat = await prisma.seat.create({ data: { floor_id, row_label, seat_number, zone_type, has_outlet, near_ac, is_window_seat, comfort_score } })
    res.status(201).json(seat)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create seat' })
  }
}