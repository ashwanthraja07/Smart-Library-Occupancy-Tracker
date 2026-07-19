import express from "express";
import {
  getAllSeatStatus,
  getSeatStatusById,
  updateSeatStatus,
} from "../controllers/seatStatus.controller";

const router = express.Router();

router.get("/", getAllSeatStatus);

router.get("/:seatId", getSeatStatusById);

router.put("/:seatId", updateSeatStatus);

export default router;