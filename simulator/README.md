# VIT Library Simulator

Simulates real-time seat occupancy changes in the library database.

## Setup

```bash
pip install -r requirements.txt
python simulator.py
```

## How It Works

- On start: initialises all seats to a realistic occupancy level
- Every 10 seconds: randomly flips 2–6 seats to simulate real traffic
- Occupancy targets change by time of day:
  - 9am–12pm → 85% occupied
  - 2pm–6pm → 80% occupied
  - 7pm–9pm → 70% occupied
  - 10pm–6am → 20% occupied
  - Other times → 50% occupied
- Writes `OccupancyLog` entries for every change (used by Admin dashboard peak-hours chart)

## Requirements

- Python 3.7+
- psycopg2-binary
- schedule
