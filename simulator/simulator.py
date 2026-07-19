import psycopg2
import random
import time
import schedule
from datetime import datetime

DATABASE_URL = 'postgresql://neondb_owner:npg_rihkdZBQ97Cq@ep-young-term-aon288h9.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

def get_connection():
    return psycopg2.connect(DATABASE_URL)

def get_peak_occupancy(floor_idx):
    hour = datetime.now().hour
    if 9 <= hour <= 12: base = 0.85
    elif 14 <= hour <= 18: base = 0.80
    elif 19 <= hour <= 21: base = 0.70
    elif 22 <= hour or hour <= 6: base = 0.20
    else: base = 0.50
    
    # Introduce variation per floor
    modifiers = [0.15, 0.0, -0.20]
    idx = floor_idx % 3
    return max(0.05, min(0.95, base + modifiers[idx]))

def initialize_seats():
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute('SELECT seat_id, floor_id FROM "Seat"')
        seats_data = cur.fetchall()
        if not seats_data:
            print('No seats found in database. Please run seed first.')
            return
            
        floor_map = {}
        for sid, fid in seats_data:
            floor_map.setdefault(fid, []).append(sid)
            
        for floor_idx, (fid, sids) in enumerate(floor_map.items()):
            target_rate = get_peak_occupancy(floor_idx)
            target = int(len(sids) * target_rate)
            occupied = set(random.sample(sids, target))
            
            for sid in sids:
                is_occ = sid in occupied
                cur.execute('''
                    INSERT INTO "SeatStatus" (seat_id, is_occupied, last_updated)
                    VALUES (%s, %s, NOW())
                    ON CONFLICT (seat_id) DO UPDATE
                    SET is_occupied = EXCLUDED.is_occupied, last_updated = NOW()
                ''', (sid, is_occ))
                cur.execute('''
                    INSERT INTO "OccupancyLog" (seat_id, status, timestamp)
                    VALUES (%s, %s, NOW())
                ''', (sid, 'occupied' if is_occ else 'free'))
        conn.commit()
        print(f'Initialized seats across {len(floor_map)} floors.')
    finally:
        cur.close()
        conn.close()

def flip_seats():
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute('''
            SELECT st.seat_id, st.is_occupied, s.floor_id 
            FROM "SeatStatus" st
            JOIN "Seat" s ON st.seat_id = s.seat_id
        ''')
        seats_data = cur.fetchall()
        if not seats_data: return
        
        floor_map = {}
        for sid, is_occ, fid in seats_data:
            floor_map.setdefault(fid, []).append((sid, is_occ))
            
        flipped = 0
        for floor_idx, (fid, seats) in enumerate(floor_map.items()):
            target = get_peak_occupancy(floor_idx)
            current_rate = sum(1 for s in seats if s[1]) / len(seats)
            batch = random.sample(seats, min(random.randint(1, 3), len(seats)))
            
            for sid, is_occ in batch:
                if is_occ and current_rate > target: new_status = False
                elif not is_occ and current_rate < target: new_status = True
                else: new_status = random.random() > 0.5
                
                if new_status != is_occ:
                    cur.execute('UPDATE "SeatStatus" SET is_occupied = %s, last_updated = NOW() WHERE seat_id = %s', (new_status, sid))
                    cur.execute('INSERT INTO "OccupancyLog" (seat_id, status, timestamp) VALUES (%s, %s, NOW())', (sid, 'occupied' if new_status else 'free'))
                    flipped += 1
                    
        conn.commit()
        print(f'[{datetime.now().strftime("%H:%M:%S")}] Flipped {flipped} seats across floors.')
    finally:
        cur.close()
        conn.close()

def run():
    print('VIT Smart Library Simulator starting...')
    initialize_seats()
    schedule.every(10).seconds.do(flip_seats)
    print('Running — flipping seats every 10 seconds. Press Ctrl+C to stop.')
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    run()
