from flask import Flask, jsonify
from flask_socketio import SocketIO
from socket_server import register_socket_handlers
from ollama_client import generate_prompt
from network_monitor import get_network_stats
from stable_diffusion_client import generate_image


from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Register WebSocket events
register_socket_handlers(socketio)

@app.route("/")
def hello():
    return "Network Mural Backend Running!"

@app.route("/generate-prompt")
def prompt():
    stats = get_network_stats()
    print(f"Network Stats: {stats}")
    prompt_text = generate_prompt(stats)
    print(f"Generated Prompt: {prompt_text}")
    return jsonify({"prompt": prompt_text})

@app.route("/generate-image")
def gen_image():
    # Step 1: Get prompt from Ollama
    stats = get_network_stats()
    prompt = generate_prompt(stats)

    print("Generated Prompt:", prompt)

    # Step 2: Send to Stable Diffusion
    filename = generate_image(prompt)

    return jsonify({
        "prompt": prompt,
        "image_url": f"/static/images/{filename}"
    })

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5090)