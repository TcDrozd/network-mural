from flask import Blueprint, jsonify, send_from_directory, render_template, current_app
from ollama_client import generate_prompt
from network_monitor import get_network_stats
from stable_diffusion_client import generate_image

routes = Blueprint('routes', __name__)

@routes.route("/")
def hello():
    return "Network Mural Backend Running!"

@routes.route("/generate-prompt")
def prompt():
    stats = get_network_stats()
    print(f"Network Stats: {stats}")
    prompt_text = generate_prompt(stats)
    print(f"Generated Prompt: {prompt_text}")
    return jsonify({"prompt": prompt_text})

@routes.route("/generate-image")
def gen_image():
    stats = get_network_stats()
    prompt = generate_prompt(stats)
    filename = generate_image(prompt)
    return jsonify({
        "prompt": prompt,
        "image_url": f"/static/images/{filename}"
    })

@routes.route("/api/network-stats")
def api_stats():
    return jsonify(get_network_stats())

@routes.route("/visualizer")
def visualizer():
    return render_template("index.html")

@routes.route("/<path:path>")
def static_proxy(path):
    print(f"[DEBUG] Trying to serve static file: {path}")
    return send_from_directory(current_app.static_folder, path)