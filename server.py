#!/usr/bin/env python3
"""
Simple HTTP server for serving the Anxiously Engaged Game
Perfect for Replit deployment or local testing
"""

import http.server
import socketserver
import os
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class GameHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Add headers for better game performance
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    """Start the HTTP server"""
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), GameHTTPRequestHandler) as httpd:
        print(f"🎮 Anxiously Engaged Game Server")
        print(f"📱 Local: http://localhost:{PORT}")
        print(f"🌐 Network: http://0.0.0.0:{PORT}")
        print(f"📁 Serving from: {DIRECTORY}")
        print(f"🎯 Ready for Sunday school!")
        print(f"🔄 Press Ctrl+C to stop")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n✅ Server stopped gracefully")

if __name__ == "__main__":
    run_server() 