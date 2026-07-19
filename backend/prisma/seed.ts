import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data in correct dependency order
  await prisma.occupancyLog.deleteMany({})
  await prisma.seatStatus.deleteMany({})
  await prisma.seat.deleteMany({})
  await prisma.floor.deleteMany({})
  await prisma.admin.deleteMany({})
  await prisma.faculty.deleteMany({})
  await prisma.student.deleteMany({})

  const studentPass = await bcrypt.hash('password123', 10)
  const facultyPass = await bcrypt.hash('faculty123', 10)
  const adminPass = await bcrypt.hash('admin123', 10)

  // 1. Students
  await prisma.student.createMany({
    data: [
      { reg_number: '22BCE0001', name: 'Arjun Sharma', email: 'arjun.sharma2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BCE0002', name: 'Priya Nair', email: 'priya.nair2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BME0001', name: 'Rahul Verma', email: 'rahul.verma2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BEE0001', name: 'Sneha Krishnan', email: 'sneha.krishnan2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BCE0003', name: 'Karthik Rajan', email: 'karthik.rajan2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BIT0001', name: 'Divya Menon', email: 'divya.menon2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BCB0001', name: 'Aditya Iyer', email: 'aditya.iyer2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BCE0004', name: 'Lakshmi Suresh', email: 'lakshmi.suresh2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BEC0001', name: 'Vivek Anand', email: 'vivek.anand2022@vitstudent.ac.in', password: studentPass },
      { reg_number: '22BCE0005', name: 'Ananya Pillai', email: 'ananya.pillai2022@vitstudent.ac.in', password: studentPass },
    ]
  })

  // 2. Faculty
  await prisma.faculty.createMany({
    data: [
      { faculty_id: 'FAC001', name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@vit.ac.in', department: 'Computer Science and Engineering', password: facultyPass },
      { faculty_id: 'FAC002', name: 'Dr. Meena Sundaram', email: 'meena.sundaram@vit.ac.in', department: 'Mechanical Engineering', password: facultyPass },
      { faculty_id: 'FAC003', name: 'Dr. Suresh Babu', email: 'suresh.babu@vit.ac.in', department: 'Electrical and Electronics Engineering', password: facultyPass },
      { faculty_id: 'FAC004', name: 'Dr. Anitha Rajan', email: 'anitha.rajan@vit.ac.in', department: 'Information Technology', password: facultyPass },
      { faculty_id: 'FAC005', name: 'Dr. Venkat Krishnan', email: 'venkat.krishnan@vit.ac.in', department: 'Electronics and Communication Engineering', password: facultyPass },
      { faculty_id: 'FAC006', name: 'Dr. Preethi Mohan', email: 'preethi.mohan@vit.ac.in', department: 'Computer Science with Business Systems', password: facultyPass },
    ]
  })

  // 3. Admin
  await prisma.admin.createMany({
    data: [
      { admin_id: 'LIB001', name: 'Mr. Senthil Kumar', email: 'senthil.kumar@vit.ac.in', password: adminPass }, // schema doesn't have 'role'
      { admin_id: 'LIB002', name: 'Ms. Deepa Natarajan', email: 'deepa.natarajan@vit.ac.in', password: adminPass },
      { admin_id: 'LIB003', name: 'Mr. Ramesh Babu', email: 'ramesh.babu@vit.ac.in', password: adminPass },
    ]
  })

  // 4. Floors
  const floorData = [
    { name: 'Ground Floor', total: 120, occupancy: 0.4 },
    { name: 'First Floor', total: 100, occupancy: 0.6 },
    { name: 'Second Floor', total: 80, occupancy: 0.25 },
  ]
  const createdFloors = []
  for (const f of floorData) {
    const floor = await prisma.floor.create({ data: { floor_name: f.name, total_seats: f.total } })
    createdFloors.push({ ...f, id: floor.floor_id })
  }

  // 5 & 6 & 7 & 8. Seats and Logs
  for (const f of createdFloors) {
    let silentCount = 0, discussionCount = 0, groupCount = 0;
    
    if (f.name === 'Ground Floor') {
      silentCount = Math.floor(f.total * 0.4)
      discussionCount = Math.floor(f.total * 0.3)
      groupCount = f.total - silentCount - discussionCount
    } else if (f.name === 'First Floor') {
      silentCount = Math.floor(f.total * 0.3)
      discussionCount = Math.floor(f.total * 0.4)
      groupCount = f.total - silentCount - discussionCount
    } else if (f.name === 'Second Floor') {
      silentCount = Math.floor(f.total * 0.5)
      discussionCount = Math.floor(f.total * 0.3)
      groupCount = f.total - silentCount - discussionCount
    }

    const zones = [
      ...Array(silentCount).fill('Silent'),
      ...Array(discussionCount).fill('Discussion'),
      ...Array(groupCount).fill('Group')
    ]

    for (let i = 1; i <= f.total; i++) {
      const row = String.fromCharCode(65 + Math.floor((i - 1) / 10))
      const zoneType = zones[i - 1]
      
      const isOccupied = Math.random() < f.occupancy

      const seat = await prisma.seat.create({
        data: {
          floor_id: f.id,
          row_label: row,
          seat_number: i,
          zone_type: zoneType,
          has_outlet: zoneType === 'Discussion', // 30% discussion zone near outlets
          near_ac: zoneType === 'Group', // 30% group zone near AC
          is_window_seat: zoneType === 'Silent', // 40% silent zone near windows
          comfort_score: Math.floor(Math.random() * 5) + 5
        }
      })
      await prisma.seatStatus.create({
        data: {
          seat_id: seat.seat_id,
          is_occupied: isOccupied
        }
      })
      await prisma.occupancyLog.create({
        data: {
          seat_id: seat.seat_id,
          status: isOccupied ? 'occupied' : 'free'
        }
      })
    }
  }

  console.log('=== VIT Library Seed Complete ===')
  console.log('STUDENTS:')
  console.log('  22BCE0001 / password123 — Arjun Sharma (CSE)')
  console.log('  22BME0001 / password123 — Rahul Verma (Mech)')
  console.log('  22BCB0001 / password123 — Aditya Iyer (CSBS)')
  console.log('FACULTY:')
  console.log('  FAC001 / faculty123 — Dr. Rajesh Kumar (CSE)')
  console.log('  FAC004 / faculty123 — Dr. Anitha Rajan (IT)')
  console.log('ADMIN:')
  console.log('  LIB001 / admin123 — Mr. Senthil Kumar (Chief Librarian)')
  console.log('================================')
}

main().catch(console.error).finally(() => prisma.$disconnect())
