import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await prisma.student.findMany();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};

export const getStudentByRegNumber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const regNumber = req.params.regNumber as string;
    const student = await prisma.student.findUnique({
      where: {
        reg_number: regNumber,
      },
    });

    
    if (!student) {
      res.status(404).json({
        message: "Student not found",
      });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
    });
  }
};

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { reg_number, name, email } = req.body;

    const student = await prisma.student.create({
      data: {
        reg_number,
        name,
        email,
        last_login: new Date(),
      },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create student",
    });
  }
};
export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await prisma.student.delete({
      where: {
        reg_number: req.params.regNumber as string,
      },
    });

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
    });
  }
};