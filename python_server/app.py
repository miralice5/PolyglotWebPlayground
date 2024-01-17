# app.py (Python server for PolyglotWebPlayground)

from flask import Flask, request, jsonify, render_template
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/java')
def java_page():
    return render_template('java.html')

@app.route('/run_java', methods=['POST'])
def run_java_code():
    try:
        data = request.get_json()
        code = data['code']

        # Write the Java code to a temporary file
        with open('/tmp/java_code.java', 'w') as file:
            file.write(code)

        # Compile and run the Java code and capture the output
        result = subprocess.run(['javac', '/tmp/java_code.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode == 0:
            run_result = subprocess.run(['java', '-classpath', '/tmp', 'java_code'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            output = run_result.stdout + run_result.stderr
        else:
            output = result.stderr

        # Return the output as JSON
        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
