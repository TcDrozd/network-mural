# 🎨 AI-Powered Network Mural

**Network Mural** is a real-time generative art project that visualizes your network traffic through poetic AI-generated descriptions and abstract digital artwork.

The goal is to create a dynamic display — potentially wall-mounted — that interprets live network activity as evolving art using natural language and visual generation tools.

---

## 🧠 Project Overview

**Tech Stack:**
- **Backend:** Python, Flask, Flask-SocketIO, psutil
- **AI:** Ollama (e.g. LLaMA, Deepseek)
- **Image Gen (WIP):** Stable Diffusion (via local API)
- **Frontend (Planned):** Minimal HTML/JS (Three.js in stretch goals)

---

## ✅ Current Features

- Collects real-time network statistics using `psutil`
- Generates poetic prompts via your local **Ollama** model (e.g. `deepseek-r1`)
- Prepares a Stable Diffusion API integration to turn prompts into abstract art
- Exposes simple Flask routes for:
  - `GET /generate-prompt` → returns AI description of network activity
  - `GET /generate-image` *(planned)* → returns prompt + generated image

---

## 🛠️ Setup (Dev)

1. Clone the repo and create a virtual environment:

   ```bash
   git clone git@github.com:TcDrozd/network-mural.git
   cd network-mural
   python3 -m venv venv
   source venv/bin/activate

	2.	Install dependencies:

pip install -r requirements.txt


	3.	Set up your .env:

OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=deepseek-r1
SD_URL=http://localhost:7860  # for stable diffusion


	4.	Run the backend:

cd backend
python app.py



⸻

🔜 Coming Soon
	•	Full Stable Diffusion integration (/generate-image)
	•	Frontend display loop (prompt + image gallery)
	•	Auto-refreshing client for wall display
	•	Live network-driven visuals (Three.js particle system)
	•	Scheduled or reactive regeneration loop

⸻

🚧 Project Status

Still early days — mostly backend logic scaffolding and generation handling complete. Frontend and full image output pipeline coming next!

⸻

This project is a fun exploration of the intersection between AI, generative art, and network awareness. Use it as a dashboard, ambient display, or creative experiment.