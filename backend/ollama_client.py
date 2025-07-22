import requests
import os

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://192.168.50.201:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "deepseek-r1:latest")

def generate_prompt(network_stats):
    prompt = (
        "Describe this network activity as abstract digital art:\n"
        f"Bytes Sent: {network_stats['bytes_sent']}, "
        f"Bytes Received: {network_stats['bytes_recv']}.\n"
        "Use poetic and surreal language."
    )

    response = requests.post(OLLAMA_URL, json={
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False  # easier for now
    })
    print(f"Response from Ollama: {response.status_code} {response.text}")

    return response.json().get("response", "No response.")