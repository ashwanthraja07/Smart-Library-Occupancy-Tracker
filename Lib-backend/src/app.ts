import express from "express";
import cors from "cors";
import floorRoutes from "./routes/floor.routes";
import seatRoutes from "./routes/seat.routes";
import seatStatusRoutes from "./routes/seatStatus.routes";
import occupancyLogRoutes from "./routes/occupancyLog.routes";
import studentRoutes from "./routes/student.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/floors", floorRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/status", seatStatusRoutes);
app.use("/api/logs", occupancyLogRoutes);
app.use("/api/students", studentRoutes);
app.get("/", (_req, res) => {
  res.send("Smart Library Backend Running 🚀");
});

export default app;