import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const logs = await prisma.occupancyLog.findMany({
      include: {
        seat: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch logs",
    });
  }
};

export const createLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { seat_id, status } = req.body;

    const log = await prisma.occupancyLog.create({
      data: {
        seat_id,
        status,
        timestamp: new Date(),
      },
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create log",
    });
  }
};