import * as monaco from 'monaco-editor';
// Import Monaco's core styling files locally
import 'monaco-editor/min/vs/editor/editor.main.css';

let editor;
const initialCode = `// Running locally via Node & Vite!\nfunction localGreet() {\n    console.log("Hello from your locked-down local network!");\n}\n\nlocalGreet();`;

// Tell Monaco where to look for local worker files
self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') return '/node_modules/monaco-editor/esm/vs/language/json/json.worker.js';
        if (label === 'css') return '/node_modules/monaco-editor/esm/vs/language/css/css.worker.js';
        if (label === 'html' || label === 'handlebars' || label === 'razor') return '/node_modules/monaco-editor/esm/vs/language/html/html.worker.js';
        if (label === 'typescript' || label === 'javascript') return '/node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js';
        return '/node_modules/monaco-editor/esm/vs/editor/editor.worker.js';
    }
};

// Initialize the editor
editor = monaco.editor.create(document.getElementById('editorContainer'), {
    value: initialCode,
    language: 'javascript',
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
    minimap: { enabled: true },
    automaticLayout: true,
    padding: { top: 12, bottom: 12 }
});

document.getElementById('outputConsole').innerText = '🚀 Workspace Ready (100% Offline via Vite).';

// Language switching configuration
document.getElementById('languageSelect').addEventListener('change', (e) => {
    if (editor) {
        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, e.target.value);
    }
});

// Run Button Logic
document.getElementById('runBtn').addEventListener('click', () => {
    if (!editor) return;
    const currentCode = editor.getValue();
    const consoleBox = document.getElementById('outputConsole');
    consoleBox.innerText = "Executing scripts...\n\n";
    try {
        let logOutput = "";
        const originalLog = console.log;
        console.log = function(...args) { logOutput += args.join(' ') + '\n'; };
        new Function(currentCode)();
        console.log = originalLog;
        consoleBox.innerText += logOutput || "Code executed with no output.";
    } catch (err) {
        consoleBox.innerText += `❌ Runtime Error: ${err.message}`;
    }
});
