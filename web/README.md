# Opralvin One — marketing site

Vite + React 18. The public site is a flat page. Colour, type, and timing come from MOTION.md.

## Run locally
    npm install
    npm run dev          # http://localhost:5173

## Build
    npm run build        # dist/ (deploy this)
    npm run preview      # serve dist/ locally

## Deploy to Vercel
    npx vercel           # framework: Vite, build: npm run build, output: dist
or push to GitHub and import the repo at vercel.com/new.

## Edit
- Copy, departments, the order flow, FAQ, contact email: src/data.js
- Sections: src/sections/
- Film and stills: public/media/
