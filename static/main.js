// main.js (JavaScript)

function runCode(endpoint) {
    const code = document.getElementById('code').value;
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').value = data.output;
    });
}
