# ✦ Cosmos Memory

A memory card game using real NASA Astronomy Picture of the Day (APOD) images. Click each image once — repeating loses!

## Features

- 🌌 12 real NASA APOD images fetched on load
- 📊 Score tracker + best score
- 🔀 Cards shuffle on every click
- ✦ Clean, minimal light-mode design
- 📱 Fully responsive (4 → 3 → 2 column grid)
- ♿ Keyboard accessible (Tab + Enter to play)

## Project Structure

```
src/
├── components/
│   ├── Card.jsx           # Image card with skeleton loader
│   ├── GameBoard.jsx      # Responsive card grid
│   ├── GameOverModal.jsx  # End-game overlay
│   ├── Header.jsx         # App title
│   ├── LoadingScreen.jsx  # Orbiting planet animation
│   └── ScoreBoard.jsx     # Score + progress bar
├── hooks/
│   └── useNASA.js         # Custom hook — fetches APOD images
├── styles/
│   └── App.css            # All styles (DM Sans + DM Mono)
├── App.jsx                # Game state & logic
└── main.jsx               # Entry point
```

## Getting Started

```bash
npm install
npm run dev
```

## NASA API Key

The app uses `DEMO_KEY` by default (60 req/hour, sufficient for development).  
For production, get a free key at [https://api.nasa.gov](https://api.nasa.gov) and update `API_KEY` in `src/hooks/useNASA.js`.

## Deploying

```bash
npm run build
# Deploy the dist/ folder to Netlify, Vercel, or GitHub Pages
```

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
# Add "deploy": "gh-pages -d dist" to package.json scripts
npm run build && npm run deploy
```

## Hooks & State Used

| Hook | Purpose |
|---|---|
| `useState` | score, bestScore, clickedIds, cards, gameOver |
| `useEffect` | Fetch NASA images on mount + refetch trigger |
| `useCallback` | Memoize click handler & shuffle to avoid stale closures |
| Custom `useNASA` | Encapsulate all API fetching, filtering, and error logic 