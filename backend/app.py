from flask import Flask
from flask_socketio import SocketIO
from socket_server import register_socket_handlers
from dotenv import load_dotenv
from routes import routes

load_dotenv()

app = Flask(
    __name__,
    static_folder='../frontend/static',
    template_folder='../frontend/templates'
)
socketio = SocketIO(app, cors_allowed_origins="*")

register_socket_handlers(socketio)
app.register_blueprint(routes)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5090, allow_unsafe_werkzeug=True)