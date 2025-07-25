import {
  Assets,
  Container,
  Rectangle,
  Sprite
} from 'https://cdn.jsdelivr.net/npm/pixi.js@8.0.0/dist/pixi.min.mjs';
import { themeManager } from './themes.js';

export async function createParticles(app) {
  const texture = await Assets.load('/static/assets/entity-particle.png');

  const particleContainer = new Container();
  app.stage.addChild(particleContainer);

  const particles = [];
  const totalParticles = 1200; // You can crank this up later!

  for (let i = 0; i < totalParticles; i++) {
    const particle = new Sprite(texture);

    particle.anchor.set(0.5);
    particle.scale.set(0.5 + Math.random() * 0.5);
    particle.x = Math.random() * app.screen.width;
    particle.y = Math.random() * app.screen.height;

    // Motion attributes
    particle.direction = Math.random() * Math.PI * 2;
    particle.turningSpeed = Math.random() - 0.5;
    particle.speed = 0.5 + Math.random();
    particle.offset = Math.random() * 100;

    particles.push(particle);
    particleContainer.addChild(particle);
  }

  themeManager.applyTheme(particles);

  // Simulate theme change after 5 seconds
  setTimeout(() => {
    themeManager.updateBasedOnSignal({ type: 'idle' });
    themeManager.applyTheme(particles);
    console.log("🎨 Theme updated based on signal.");
  }, 5000);

  const boundsPadding = 100;
  const bounds = new Rectangle(
    -boundsPadding,
    -boundsPadding,
    app.screen.width + boundsPadding * 2,
    app.screen.height + boundsPadding * 2
  );

  let tick = 0;

  app.ticker.add(() => {
    for (const particle of particles) {
      particle.scale.y = 0.95 + Math.sin(tick + particle.offset) * 0.05;
      particle.direction += particle.turningSpeed * 0.01;
      particle.x += Math.sin(particle.direction) * (particle.speed * particle.scale.y);
      particle.y += Math.cos(particle.direction) * (particle.speed * particle.scale.y);
      particle.rotation = -particle.direction + Math.PI;

      console.log("render tick");

      // Wraparound
      if (particle.x < bounds.x) particle.x += bounds.width;
      else if (particle.x > bounds.x + bounds.width) particle.x -= bounds.width;

      if (particle.y < bounds.y) particle.y += bounds.height;
      else if (particle.y > bounds.y + bounds.height) particle.y -= bounds.height;
    }

    tick += 0.05;
  });

  console.log("🌌 Particles initialized.");
}