// main.ts (TypeScript)

function runTypeScriptCode() {
    const code = document.getElementById('typescript-code').value;
    fetch('/run_typescript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').value = data.output;
    });
}
