# Opralvin One — marketing site

Vite + React 18 + React Three Fiber (three.js) + GSAP ScrollTrigger + Lenis.

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
- 3D model: src/scene/Scene.jsx (scroll chapters in data.js → CH)
- Sections: src/sections/
- Film and stills: public/media/
