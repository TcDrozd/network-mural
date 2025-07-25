export class ThemeManager {
  constructor() {
    this.themes = {
      default: 0xffffff,
      warm: 0xffaa00,
      cool: 0x00aaff,
      pastel: 0xff77aa,
      neon: 0x39ff14
    };
    this.currentTheme = 'default';
  }

  getTheme(name) {
    return this.themes[name] || this.themes.default;
  }

  setTheme(name) {
    if (this.themes[name]) {
      this.currentTheme = name;
    }
  }

  applyTheme(particles) {
    const baseTint = this.getTheme(this.currentTheme);

    for (const particle of particles) {
        // Slight random variation (e.g., +/- 10% per channel)
        const r = Math.min(255, Math.max(0, ((baseTint >> 16) & 0xff) + (Math.random() * 100 - 25)));
        const g = Math.min(255, Math.max(0, ((baseTint >> 8) & 0xff) + (Math.random() * 100 - 25)));
        const b = Math.min(255, Math.max(0, (baseTint & 0xff) + (Math.random() * 50 - 25)));

        const tint = (r << 16) + (g << 8) + b;
        particle.tint = tint;
    }
  }
  updateBasedOnSignal(signal) {
    if (signal.type === 'error') {
        this.setTheme('neon');
    } else if (signal.type === 'idle') {
        this.setTheme('cool');
    } else if (signal.type === 'streaming') {
        this.setTheme('warm');
    }
  }
}

export const themeManager = new ThemeManager();