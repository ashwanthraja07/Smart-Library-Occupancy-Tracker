# Smart-Library-Occupancy-Tracker

Simple static prototype UI for tracking library seat availability.

Files
- `code-1.html` — Login page (Tailwind CSS, simple password toggle JS).
- `code-7.html` — Seat map UI (scrollable canvas, seat buttons, popup mockup).
- `screen-2.png`, `screen-8.png` — Screenshot assets.
- `screen-4.html` — Additional UI mockup (was misnamed as `screen (4).png`).
- `assets/code-5.png` — Image asset.

Quick start
- Open the HTML files in a browser (double-click) or serve the folder:

```bash
# from repository root
python3 -m http.server 8000
# then open http://localhost:8000/code-1.html or code-7.html or screen-4.html
```

Notes & next steps
- The project is currently static UI-only. Consider converting seats to a data-driven model (JSON), adding a small backend to serve real-time occupancy, and improving accessibility.
