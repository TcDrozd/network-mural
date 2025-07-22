import requests
import base64
import os
from datetime import datetime

SD_URL = os.getenv("SD_URL", "http://192.168.50.201:7860")
SD_TXT2IMG_ENDPOINT = f"{SD_URL}/sdapi/v1/txt2img"
IMAGE_DIR = os.path.join(os.path.dirname(__file__), "..", "static", "images")

os.makedirs(IMAGE_DIR, exist_ok=True)

def generate_image(prompt):
    payload = {
        "prompt": prompt,
        "steps": 25,
        "width": 512,
        "height": 512,
        "sampler_index": "Euler a"
    }

    response = requests.post(SD_TXT2IMG_ENDPOINT, json=payload)
    response.raise_for_status()

    # The image is base64 encoded
    image_data = response.json()["images"][0]
    img_bytes = base64.b64decode(image_data)

    # Save image to disk
    filename = datetime.now().strftime("mural_%Y%m%d_%H%M%S.png")
    filepath = os.path.join(IMAGE_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(img_bytes)

    return filename  # or return full path if preferred