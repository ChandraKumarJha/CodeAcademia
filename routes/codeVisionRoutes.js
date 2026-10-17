const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const HOST = "onecompiler-apis.p.rapidapi.com";
const URL_RUN = `https://${HOST}/api/v1/run`;

// CodeVision language id -> OneCompiler language id + file name.
// Check the ids against OneCompiler's language list; "nodejs" is the one most likely to differ.
const LANGS = {
  javascript: { id: "nodejs",     file: "index.js" },
  typescript: { id: "typescript", file: "index.ts" },
  python:     { id: "python",     file: "main.py" },
  c:          { id: "c",          file: "main.c" },
  cpp:        { id: "cpp",        file: "main.cpp" },
  java:       { id: "java",       file: "Main.java" },   // class must be named Main
  go:         { id: "go",         file: "main.go" },
  rust:       { id: "rust",       file: "main.rs" },
  csharp:     { id: "csharp",     file: "Program.cs" },
  php:        { id: "php",        file: "index.php" },
  ruby:       { id: "ruby",       file: "main.rb" },
  bash:       { id: "bash",       file: "script.sh" }
};

router.post("/api/execute", express.json({ limit: "200kb" }), async (req, res) => {
  const { language, code } = req.body || {};
  const lang = LANGS[language];

  if (!lang) return res.status(400).json({ error: `Unsupported language: ${language}` });
  if (typeof code !== "string" || !code.trim()) return res.status(400).json({ error: "No code provided." });
  if (!process.env.RAPIDAPI_KEY) return res.status(500).json({ error: "Server is missing RAPIDAPI_KEY." });

  try {
    const response = await fetch(URL_RUN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": HOST
      },
      body: JSON.stringify({
        language: lang.id,
        stdin: "",
        files: [{ name: lang.file, content: code }]
      }),
      signal: AbortSignal.timeout(30000)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(502).json({ error: data.message || data.error || `OneCompiler returned ${response.status}.` });
    }

    // Map OneCompiler's response to the shape codevision.js expects.
    const failed = Boolean(data.exception);
    res.json({
      run: {
        stdout: data.stdout || "",
        stderr: data.stderr || data.exception || "",
        code: failed ? 1 : 0,
        signal: null
      }
    });
  } catch (error) {
    const timedOut = error.name === "TimeoutError";
    res.status(timedOut ? 504 : 502).json({ error: timedOut ? "Execution timed out." : "Could not reach OneCompiler." });
  }
});

module.exports = router;