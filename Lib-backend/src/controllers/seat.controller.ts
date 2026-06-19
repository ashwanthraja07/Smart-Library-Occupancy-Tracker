import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllSeats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const seats = await prisma.seat.findMany({
      include: {
        floor: true,
        seat_status: true,
      },
    });

    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seats",
    });
  }
};

export const getSeatsByFloor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const floorId = Number(req.params.floorId);

    const seats = await prisma.seat.findMany({
      where: {
        floor_id: floorId,
      },
      include: {
        seat_status: true,
      },
    });

    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seats",
    });
  }
};

export const createSeat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      floor_id,
      row_label,
      seat_number,
      zone_type,
      has_outlet,
      near_ac,
      is_window_seat,
      comfort_score,
    } = req.body;

    const seat = await prisma.seat.create({
      data: {
        floor_id,
        row_label,
        seat_number,
        zone_type,
        has_outlet,
        near_ac,
        is_window_seat,
        comfort_score,
      },
    });

    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create seat",
    });
  }
};