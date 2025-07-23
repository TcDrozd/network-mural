import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/dist/pixi.min.mjs';

import { createParticles } from './visuals/particles.js';

console.log("App starting");

const app = new Application();
await app.init({ background: '#000000', resizeTo: window });

document.body.appendChild(app.canvas);

// Create and animate particles
await createParticles(app);