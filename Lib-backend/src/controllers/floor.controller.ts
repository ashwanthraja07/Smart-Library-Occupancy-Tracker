import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllFloors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const floors = await prisma.floor.findMany();

    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch floors",
    });
  }
};

export const getFloorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const floor = await prisma.floor.findUnique({
      where: {
        floor_id: Number(req.params.id),
      },
    });

    if (!floor) {
      res.status(404).json({
        message: "Floor not found",
      });
      return;
    }

    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch floor",
    });
  }
};

export const createFloor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { floor_name, total_seats, floor_image_url } = req.body;

    const floor = await prisma.floor.create({
      data: {
        floor_name,
        total_seats,
        floor_image_url,
      },
    });

    res.status(201).json(floor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create floor",
    });
  }
};