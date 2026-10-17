const express = require('express');
const router = express.Router();
const path = require("path");
const PISTON_API_URL = (process.env.PISTON_API_URL || "http://localhost:2000/api/v2").replace(/\/+$/, "");
const rateLimit = require("express-rate-limit");

const executeLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many execution requests. Please wait a minute and try again." }
});

const LANGUAGES = {
  javascript: { language: "javascript", version: "18.15.0", filename: "main.js" },
  typescript: { language: "typescript", version: "5.0.3", filename: "main.ts" },
  python: { language: "python", version: "3.10.0", filename: "main.py" },
  c: { language: "c", version: "10.2.0", filename: "main.c" },
  cpp: { language: "c++", version: "10.2.0", filename: "main.cpp" },
  java: { language: "java", version: "15.0.2", filename: "Main.java" },
  go: { language: "go", version: "1.16.2", filename: "main.go" },
  rust: { language: "rust", version: "1.68.2", filename: "main.rs" },
  csharp: { language: "csharp", version: "6.12.0", filename: "Main.cs" },
  php: { language: "php", version: "8.2.3", filename: "main.php" },
  ruby: { language: "ruby", version: "3.0.1", filename: "main.rb" },
  bash: { language: "bash", version: "5.2.0", filename: "main.sh" }
};

router.get("/health", (_req, res) => res.json({ status: "ok" }));

router.post("/execute", executeLimiter, async (req, res) => {
  const { language, code, stdin = "" } = req.body || {};
  if (!Object.prototype.hasOwnProperty.call(LANGUAGES, language)) {
    return res.status(400).json({ error: "Unsupported language." });
  }
  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "Enter some code before running it." });
  }
  if (code.length > 50000) {
    return res.status(413).json({ error: "Code is too large (maximum 50 KB)." });
  }
  if (typeof stdin !== "string" || stdin.length > 10000) {
    return res.status(400).json({ error: "Input is invalid or too large (maximum 10 KB)." });
  }

  const config = LANGUAGES[language];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ name: config.filename, content: code }],
        stdin,
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: 128000000,
        run_memory_limit: 128000000
      })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(502).json({
        error: payload.message || "The code execution service is temporarily unavailable."
      });
    }

    res.json({
      language: config.language,
      version: config.version,
      compile: payload.compile ? {
        stdout: payload.compile.stdout || "",
        stderr: payload.compile.stderr || "",
        code: payload.compile.code ?? null,
        signal: payload.compile.signal || null
      } : null,
      run: payload.run ? {
        stdout: payload.run.stdout || "",
        stderr: payload.run.stderr || "",
        code: payload.run.code ?? null,
        signal: payload.run.signal || null
      } : null
    });
  } catch (error) {
    console.log("error is:", error);
    const timedOut = error.name === "AbortError";
    res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? "The execution service timed out. Try again."
        : "Could not reach the execution service. Check your connection and try again."
    });
  } finally {
    clearTimeout(timeout);
  }
});

router.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  maxAge: process.env.NODE_ENV === "production" ? "1h" : 0
}));

router.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected server error occurred." });
});

module.exports = router;