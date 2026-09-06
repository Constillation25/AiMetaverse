import os, threading, time
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = int(os.getenv("PORT", "8000"))
LABEL = "aimetaverse"

class H(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(('{"status":"operational","service":"' + LABEL + '"}').encode())
    def log_message(self, *a): pass

threading.Thread(target=lambda: HTTPServer(("0.0.0.0", PORT), H).serve_forever(), daemon=True).start()
print(f"[{LABEL}] health server on :{PORT}")

print("[AiMetaverse] D4OD worker loop active")

while True:
    time.sleep(30)
