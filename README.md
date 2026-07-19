# VIT Smart Library Occupancy Tracker

Real-time library seat tracking system for VIT University students and staff. Students can view live seat availability across all library floors. Admin and faculty have additional dashboard access.

---

## Tech Stack

- Frontend: React + Vite + Framer Motion + Recharts
- Backend: Node.js + Express + TypeScript + Prisma ORM
- Database: NeonDB PostgreSQL
- Simulator: Python (psycopg2 + schedule)

---

## Project Structure

```
Smart-Library-Occupancy-Tracker/
├── frontend/        React frontend
├── backend/         Node.js Express backend
├── simulator/       Python occupancy simulator
├── ui-ux/          Design assets and Figma exports
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- NeonDB account (or any PostgreSQL database)

### Clone the repo
```bash
git clone https://github.com/ashwanthraja07/Smart-Library-Occupancy-Tracker
cd Smart-Library-Occupancy-Tracker
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

Open .env and replace with real credentials received from project lead on WhatsApp:
```
DATABASE_URL=your-real-neondb-connection-string
DIRECT_URL=your-real-neondb-connection-string
PORT=3000
JWT_SECRET=vitlibrary2024
```

Then run:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Backend runs at http://localhost:3000

### Setup Simulator
```bash
cd simulator
pip install -r requirements.txt
python simulator.py
```

Simulator flips seats every 10 seconds and simulates peak hours automatically.

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173

---

## Running the Full App

Open 3 separate terminals:

Terminal 1 — Backend:
```bash
cd backend && npm run dev
```

Terminal 2 — Simulator:
```bash
cd simulator && python simulator.py
```

Terminal 3 — Frontend:
```bash
cd frontend && npm run dev
```

Open http://localhost:5173 in your browser.

---

## Database Details

### Test Credentials

**Students — password for all: `password123`**

| Registration Number | Name | Department |
|---|---|---|
| 22BCE0001 | Arjun Sharma | Computer Science and Engineering |
| 22BCE0002 | Priya Nair | Computer Science and Engineering |
| 22BCE0003 | Karthik Rajan | Computer Science and Engineering |
| 22BCE0004 | Lakshmi Suresh | Computer Science and Engineering |
| 22BCE0005 | Ananya Pillai | Computer Science and Engineering |
| 22BME0001 | Rahul Verma | Mechanical Engineering |
| 22BEE0001 | Sneha Krishnan | Electrical and Electronics Engineering |
| 22BIT0001 | Divya Menon | Information Technology |
| 22BCB0001 | Aditya Iyer | Computer Science with Business Systems |
| 22BEC0001 | Vivek Anand | Electronics and Communication Engineering |

**Faculty — password for all: `faculty123`**

| Faculty ID | Name | Department |
|---|---|---|
| FAC001 | Dr. Rajesh Kumar | Computer Science and Engineering |
| FAC002 | Dr. Meena Sundaram | Mechanical Engineering |
| FAC003 | Dr. Suresh Babu | Electrical and Electronics Engineering |
| FAC004 | Dr. Anitha Rajan | Information Technology |
| FAC005 | Dr. Venkat Krishnan | Electronics and Communication Engineering |
| FAC006 | Dr. Preethi Mohan | Computer Science with Business Systems |

**Admin — password for all: `admin123`**

| Admin ID | Name | Role |
|---|---|---|
| LIB001 | Mr. Senthil Kumar | Chief Librarian |
| LIB002 | Ms. Deepa Natarajan | Assistant Librarian |
| LIB003 | Mr. Ramesh Babu | Library Staff |

### Library Floors

| Floor | Total Seats | Zone |
|---|---|---|
| Ground Floor | 120 seats | Reference and Quiet Study |
| First Floor | 100 seats | Collaborative and Group Study |
| Second Floor | 80 seats | Postgrad and Research |

### Simulator Behaviour

| Time | Target Occupancy |
|---|---|
| 9am — 12pm | 85% |
| 2pm — 6pm | 80% |
| 7pm — 9pm | 70% |
| 10pm — 6am | 20% |
| Other hours | 50% |

---

## Branches

| Branch | Contents |
|---|---|
| main | Full project — all folders |
| frontend | React frontend only |
| backend | Node.js backend only |
| UI-UX | Design assets only |

