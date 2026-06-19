-- CreateTable
CREATE TABLE "Floor" (
    "floor_id" SERIAL NOT NULL,
    "floor_name" TEXT NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "floor_image_url" TEXT NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("floor_id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "seat_id" SERIAL NOT NULL,
    "floor_id" INTEGER NOT NULL,
    "row_label" TEXT NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "zone_type" TEXT NOT NULL,
    "has_outlet" BOOLEAN NOT NULL,
    "near_ac" BOOLEAN NOT NULL,
    "is_window_seat" BOOLEAN NOT NULL,
    "comfort_score" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "SeatStatus" (
    "seat_id" INTEGER NOT NULL,
    "is_occupied" BOOLEAN NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeatStatus_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "OccupancyLog" (
    "log_id" SERIAL NOT NULL,
    "seat_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OccupancyLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "reg_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("reg_number")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "Floor"("floor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatStatus" ADD CONSTRAINT "SeatStatus_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seat"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OccupancyLog" ADD CONSTRAINT "OccupancyLog_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "Seat"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
