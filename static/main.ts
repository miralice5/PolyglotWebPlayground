// main.ts (TypeScript / JavaScript code for PolyglotWebPlayground)

// Function to get code from a specific textarea
function getCode(id: string): string {
    return (<HTMLTextAreaElement>document.getElementById(id)).value;
}

// Function to display output in the output textarea
function displayOutput(output: string): void {
    document.getElementById('output').value = output;
}

// Function to run Go code
function runGoCode(): void {
    const goCode: string = getCode('go-code');
    if (goCode.trim() === '') {
        alert('Go code is empty. Please enter some code.');
        return;
    }

    // Implement Go code execution logic here

    // Display output (temporary)
    displayOutput('Running Go code...\nOutput will appear here.');
}

// Function to run Python code
function runPythonCode(): void {
    const pythonCode: string = getCode('python-code');
    if (pythonCode.trim() === '') {
        alert('Python code is empty. Please enter some code.');
        return;
    }

    // Send the Python code to the server for execution
    fetch('/run_python', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: pythonCode }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the output in the output textarea
        displayOutput(data.output);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while running the Python code.');
    });
}

// Function to run TypeScript code
function runTypeScriptCode(): void {
    const tsCode: string = getCode('typescript-code');
    if (tsCode.trim() === '') {
        alert('TypeScript code is empty. Please enter some code.');
        return;
    }

    // Implement TypeScript code execution logic here

    // Display output (temporary)
    displayOutput('Running TypeScript code...\nOutput will appear here.');
}

// Function to run JavaScript code
function runJavaScriptCode(): void {
    const jsCode: string = getCode('javascript-code');
    if (jsCode.trim() === '') {
        alert('JavaScript code is empty. Please enter some code.');
        return;
    }

    // Implement JavaScript code execution logic here

    // Display output (temporary)
    displayOutput('Running JavaScript code...\nOutput will appear here.');
}

// Function to run Java code
function runJavaCode(): void {
    const javaCode: string = getCode('java-code');
    if (javaCode.trim() === '') {
        alert('Java code is empty. Please enter some code.');
        return;
    }

    // Send the Java code to the server for execution
    fetch('/run_java', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: javaCode }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the output in the output textarea
        displayOutput(data.output);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while running the Java code.');
    });
}

// Function to run Ruby code
function runRubyCode(): void {
    const rubyCode: string = getCode('ruby-code');
    if (rubyCode.trim() === '') {
        alert('Ruby code is empty. Please enter some code.');
        return;
    }

    // Implement Ruby code execution logic here

    // Display output (temporary)
    displayOutput('Running Ruby code...\nOutput will appear here.');
}

// Function to run C++ code
function runCppCode(): void {
    const cppCode: string = getCode('cpp-code');
    if (cppCode.trim() === '') {
        alert('C++ code is empty. Please enter some code.');
        return;
    }

    // Implement C++ code execution logic here

    // Display output (temporary)
    displayOutput('Running C++ code...\nOutput will appear here.');
}

// Function to run PHP code
function runPhpCode(): void {
    const phpCode: string = getCode('php-code');
    if (phpCode.trim() === '') {
        alert('PHP code is empty. Please enter some code.');
        return;
    }

    // Implement PHP code execution logic here

    // Display output (temporary)
    displayOutput('Running PHP code...\nOutput will appear here.');
}

// Add more run functions for other languages if needed

// Note: You may need to implement the actual code execution logic for each language based on your server setup.
