# app.py (Python server for PolyglotWebPlayground)

from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return "PolyglotWebPlayground Python Server"

@app.route('/run_python', methods=['POST'])
def run_python_code():
    try:
        data = request.get_json()
        code = data['code']

        # Write the Python code to a temporary file
        with open('/tmp/python_code.py', 'w') as file:
            file.write(code)

        # Run the Python code and capture the output
        result = subprocess.run(['python', '/tmp/python_code.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        output = result.stdout + result.stderr

        # Return the output as JSON
        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
