import { createParticles } from './particles.js';

export async function initScene(PIXI) {
  console.log("Scene starting");

  const app = new PIXI.Application();
  await app.init({ background: '#000000', resizeTo: window });

  document.body.appendChild(app.canvas);

  // Create and animate particles
  await createParticles(app);
}