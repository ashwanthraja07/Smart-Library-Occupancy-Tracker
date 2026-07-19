import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllSeatStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const status = await prisma.seatStatus.findMany({
      include: {
        seat: true,
      },
    });

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seat status",
    });
  }
};

export const getSeatStatusById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const seatId = Number(req.params.seatId);

    const status = await prisma.seatStatus.findUnique({
      where: {
        seat_id: seatId,
      },
    });

    if (!status) {
      res.status(404).json({
        message: "Seat status not found",
      });
      return;
    }

    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch seat status",
    });
  }
};

export const updateSeatStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const seatId = Number(req.params.seatId);

    console.log("Seat ID:", seatId);
    console.log("Body:", req.body);

    const { is_occupied } = req.body;

    const status = await prisma.seatStatus.upsert({
      where: {
        seat_id: seatId,
      },
      update: {
        is_occupied,
        last_updated: new Date(),
      },
      create: {
        seat_id: seatId,
        is_occupied,
        last_updated: new Date(),
      },
    });

    res.status(200).json(status);
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: "Failed to update seat status",
    });
  }
};