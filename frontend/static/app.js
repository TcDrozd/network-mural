import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/dist/pixi.min.mjs';
import { initScene } from './visuals/scene.js';
import { createParticles } from './visuals/particles.js';

console.log("App starting");

const app = new PIXI.Application();
await app.init({ background: '#000000', resizeTo: window });

document.body.appendChild(app.canvas);

// Scene boot
await initScene(PIXI);

// Initialize particles
await createParticles(app);