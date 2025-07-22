from flask_socketio import emit
from network_monitor import get_network_stats

def register_socket_handlers(socketio):
    @socketio.on('connect')
    def handle_connect():
        print("Client connected")
        emit("network_update", get_network_stats())

    @socketio.on('request_network_data')
    def handle_data_request():
        emit("network_update", get_network_stats())

    @socketio.on('disconnect')
    def handle_disconnect():
        print("Client disconnected")